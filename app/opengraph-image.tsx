import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

// Image metadata
export const alt = siteConfig.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";


export default async function Image() {
  // All key content sits inside the centre 630x630 square so that square
  // thumbnails (center-cropped link cards) still show the name and brand.
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070d",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(232,237,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,237,247,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "65px",
            left: "300px",
            width: "600px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.22) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "560px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "140px",
              fontWeight: 800,
              letterSpacing: "0.06em",
              color: "#22d3ee",
              lineHeight: 1,
            }}
          >
            OMAR
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "50px",
              fontWeight: 800,
              color: "#e8edf7",
              marginTop: "22px",
              letterSpacing: "-0.01em",
            }}
          >
            Omar Elbedwehy
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "#22d3ee",
              marginTop: "16px",
              fontWeight: 600,
            }}
          >
            Full-Stack Developer
          </div>
          <div style={{ display: "flex", fontSize: "26px", color: "#8b95a8", marginTop: "8px" }}>
            UI/UX Designer · Security
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
