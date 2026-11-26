"use client";

import { useEffect, useRef } from "react";

// Port Said, Egypt
const HOME = { lat: 31.2653, lon: 32.3019 };

export function FooterGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let disposed = false;
    let started = false;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      if (started) return;
      started = true;
      const THREE = await import("three");
      if (disposed || !wrap) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const canvas = renderer.domElement;
      canvas.className = "block h-full w-full cursor-grab touch-pan-y";
      canvas.setAttribute("role", "img");
      canvas.setAttribute(
        "aria-label",
        "Rotating 3D Earth centered on Port Said, Egypt",
      );
      wrap.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 0, 7.6);

      const loader = new THREE.TextureLoader();
      const load = (url: string) => {
        const t = loader.load(url, () => {
          wrap.dataset.ready = "true";
          renderOnce();
        });
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        return t;
      };
      const dayMap = load("/textures/earth-day.jpg");
      const nightMap = load("/textures/earth-night.jpg");

      const sunDir = new THREE.Vector3(-1.2, 0.35, 1).normalize();

      const earthMat = new THREE.ShaderMaterial({
        uniforms: {
          dayMap: { value: dayMap },
          nightMap: { value: nightMap },
          sunDir: { value: sunDir },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          varying vec3 vNormalW;
          varying vec3 vView;
          void main() {
            vUv = uv;
            vNormalW = normalize(mat3(modelMatrix) * normal);
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vView = normalize(cameraPosition - wp.xyz);
            gl_Position = projectionMatrix * viewMatrix * wp;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform sampler2D dayMap;
          uniform sampler2D nightMap;
          uniform vec3 sunDir;
          varying vec2 vUv;
          varying vec3 vNormalW;
          varying vec3 vView;
          void main() {
            vec3 n = normalize(vNormalW);
            float d = dot(n, sunDir);
            float k = smoothstep(-0.12, 0.28, d);
            vec3 day = texture2D(dayMap, vUv).rgb;
            vec3 night = texture2D(nightMap, vUv).rgb * 1.35;
            vec3 dayLit = day * (0.35 + 0.85 * max(d, 0.0));
            vec3 nightSide = day * 0.06 + night;
            vec3 col = mix(nightSide, dayLit, k);
            // cool rim
            float f = pow(1.0 - max(dot(n, normalize(vView)), 0.0), 3.0);
            col += vec3(0.13, 0.55, 0.85) * f * (0.25 + 0.75 * k);
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      });

      const globe = new THREE.Group();
      scene.add(globe);
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 64, 48),
        earthMat,
      );
      globe.add(sphere);

      // atmosphere shell
      const atmo = new THREE.Mesh(
        new THREE.SphereGeometry(1.5 * 1.14, 48, 36),
        new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.BackSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexShader: /* glsl */ `
            varying vec3 vN;
            void main() {
              vN = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: /* glsl */ `
            varying vec3 vN;
            void main() {
              float i = pow(0.62 - dot(vN, vec3(0.0, 0.0, 1.0)), 2.6);
              gl_FragColor = vec4(0.13, 0.78, 0.93, 1.0) * clamp(i, 0.0, 1.0) * 1.1;
            }
          `,
        }),
      );
      scene.add(atmo);

      // home marker + pulse ring, attached to the globe
      const phi = (90 - HOME.lat) * (Math.PI / 180);
      const theta = (HOME.lon + 180) * (Math.PI / 180);
      const R = 1.5;
      const pos = new THREE.Vector3(
        -R * Math.sin(phi) * Math.cos(theta),
        R * Math.cos(phi),
        R * Math.sin(phi) * Math.sin(theta),
      );
      const normal = pos.clone().normalize();
      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 16, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
      );
      pin.position.copy(normal).multiplyScalar(R * 1.004);
      globe.add(pin);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.9, 1, 48), ringMat);
      ring.position.copy(normal).multiplyScalar(R * 1.006);
      ring.lookAt(normal.clone().multiplyScalar(10));
      globe.add(ring);

      // orient so Port Said faces the camera on load
      const faceHome = new THREE.Quaternion().setFromUnitVectors(
        normal,
        new THREE.Vector3(0, 0, 1),
      );
      const tilt = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        0.28,
      );
      const baseQ = tilt.clone().multiply(faceHome);
      let spin = 0;
      let velocity = 0.0022;
      let tiltY = 0;

      const spinAxis = new THREE.Vector3(0, 1, 0);
      const applyRotation = () => {
        const q = new THREE.Quaternion().setFromAxisAngle(spinAxis, spin);
        const t = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(1, 0, 0),
          tiltY,
        );
        globe.quaternion.copy(t).multiply(q).multiply(baseQ);
      };

      const resize = () => {
        const w = Math.max(1, wrap.clientWidth);
        const h = Math.max(1, wrap.clientHeight);
        const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderOnce();
      };

      const renderOnce = () => {
        applyRotation();
        const p = ((performance.now() / 1800) % 1);
        ring.scale.setScalar(0.03 + p * 0.16);
        ringMat.opacity = 0.8 * (1 - p);
        renderer.render(scene, camera);
      };

      let raf = 0;
      let visible = false;
      let last = 0;
      let dragging = false;
      let lx = 0;
      let ly = 0;

      const frame = (now: number) => {
        raf = 0;
        if (!visible) return;
        const dt = last ? Math.min(now - last, 50) : 16;
        last = now;
        if (!dragging) {
          velocity += (0.0022 - velocity) * 0.04;
          tiltY += (0 - tiltY) * 0.03;
          spin += velocity * (dt / 16.67);
        }
        renderOnce();
        raf = requestAnimationFrame(frame);
      };
      const start = () => {
        if (!raf && visible && !reduced.matches) {
          last = 0;
          raf = requestAnimationFrame(frame);
        }
      };

      const io = new IntersectionObserver(
        ([e]) => {
          visible = e.isIntersecting && !document.hidden;
          if (visible) start();
        },
        { rootMargin: "60px" },
      );
      io.observe(wrap);

      const onVis = () => {
        if (document.hidden) {
          visible = false;
        } else {
          const r = wrap.getBoundingClientRect();
          visible = r.bottom > 0 && r.top < window.innerHeight;
          start();
        }
      };
      document.addEventListener("visibilitychange", onVis);

      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      const down = (e: PointerEvent) => {
        dragging = true;
        lx = e.clientX;
        ly = e.clientY;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = "grabbing";
      };
      const move = (e: PointerEvent) => {
        if (!dragging) return;
        const dx = e.clientX - lx;
        const dy = e.clientY - ly;
        lx = e.clientX;
        ly = e.clientY;
        velocity = dx * 0.005;
        spin += dx * 0.005;
        tiltY = Math.max(-0.7, Math.min(0.7, tiltY + dy * 0.004));
        if (reduced.matches) renderOnce();
      };
      const up = () => {
        dragging = false;
        canvas.style.cursor = "grab";
      };
      canvas.addEventListener("pointerdown", down);
      canvas.addEventListener("pointermove", move);
      canvas.addEventListener("pointerup", up);
      canvas.addEventListener("pointercancel", up);

      resize();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        canvas.removeEventListener("pointerdown", down);
        canvas.removeEventListener("pointermove", move);
        canvas.removeEventListener("pointerup", up);
        canvas.removeEventListener("pointercancel", up);
        dayMap.dispose();
        nightMap.dispose();
        sphere.geometry.dispose();
        atmo.geometry.dispose();
        earthMat.dispose();
        (atmo.material as import("three").Material).dispose();
        pin.geometry.dispose();
        ring.geometry.dispose();
        ringMat.dispose();
        renderer.dispose();
        canvas.remove();
      };
    };

    // Load three.js and the textures only when the footer is about to be seen.
    const lazy = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          lazy.disconnect();
          void boot();
        }
      },
      { rootMargin: "400px" },
    );
    lazy.observe(wrap);

    return () => {
      disposed = true;
      lazy.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div className="footer-globe relative mx-auto flex flex-col items-center">
      <div
        ref={wrapRef}
        className="footer-globe-stage relative aspect-square w-[min(94vw,480px)]"
      />
      <p className="-mt-4 inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.18em] text-subtle uppercase">
        <span aria-hidden className="h-px w-6 bg-accent/50" />
        Port Said, Egypt · 31.26°N 32.30°E
        <span aria-hidden className="h-px w-6 bg-accent/50" />
      </p>
    </div>
  );
}
