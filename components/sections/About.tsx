import { IdentityOverlay } from "@/components/about/IdentityOverlay";
import { SkillTracks } from "@/components/about/SkillTracks";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVisibleSkills } from "@/lib/content-data";

export function About() {
  const skills = getVisibleSkills();

  return (
    <section id="about" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="atmosphere-orb atmosphere-orb-cyan absolute left-[-10%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-cyan-500/[0.07] blur-3xl" />
        <div className="atmosphere-orb atmosphere-orb-blue absolute bottom-[5%] right-[-8%] h-[24rem] w-[24rem] rounded-full bg-blue-500/[0.07] blur-3xl" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          }}
        />
      </div>

      <div className="about-shell relative z-10">
        <SectionHeading
          eyebrow="01 — Identity"
          title="Not a bio. A working map."
          description="A visual read of how I think across product, interface, and the systems underneath — including the security instincts I'm actively building."
        />

        <IdentityOverlay />
      </div>

      {skills.length > 0 ? (
        <div className="relative z-10 mt-16 md:mt-24">
          <SkillTracks skills={skills} />
        </div>
      ) : null}
    </section>
  );
}
