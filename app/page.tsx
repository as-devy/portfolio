import { SiteFooter } from "@/components/layout/SiteFooter";
import { About } from "@/components/sections/About";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { getVisibleCertificates } from "@/lib/content-data";
import { getSectionFlags } from "@/lib/section-flags";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function Home() {
  const sections = getSectionFlags();
  const certificates = sections.certificates ? getVisibleCertificates() : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${siteConfig.url}/#person`,
                name: siteConfig.fullName,
                url: siteConfig.url,
                jobTitle: siteConfig.role,
                email: `mailto:${siteConfig.email}`,
                image: `${siteConfig.url}${siteConfig.heroImage.src}`,
                knowsAbout: [
                  "Full-stack web development",
                  "UI/UX design",
                  "Web security",
                  "Blue Team detection and incident response",
                  "Event-driven architecture",
                  "RabbitMQ",
                ],
                sameAs: ["https://github.com/as-devy"],
              },
              {
                "@type": "WebSite",
                "@id": `${siteConfig.url}/#website`,
                url: siteConfig.url,
                name: siteConfig.title,
                description: siteConfig.description,
                publisher: { "@id": `${siteConfig.url}/#person` },
                inLanguage: "en-US",
              },
              {
                "@type": "ProfilePage",
                "@id": `${siteConfig.url}/#profile`,
                url: siteConfig.url,
                name: siteConfig.title,
                about: { "@id": `${siteConfig.url}/#person` },
                mainEntity: { "@id": `${siteConfig.url}/#person` },
                isPartOf: { "@id": `${siteConfig.url}/#website` },
              },
              {
                "@type": "ItemList",
                name: "Selected projects by Omar Elbedwehy",
                itemListElement: projects.map((project, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "CreativeWork",
                    name: project.name,
                    description: project.description,
                    ...(project.liveUrl || project.briefUrl
                      ? { url: project.liveUrl || `${siteConfig.url}${project.briefUrl}` }
                      : {}),
                    image: project.image
                      ? `${siteConfig.url}${project.image}`
                      : undefined,
                    author: { "@id": `${siteConfig.url}/#person` },
                    dateCreated: project.year,
                    genre: project.category,
                    keywords: project.technologies.join(", "),
                  },
                })),
              },
            ],
          }),
        }}
      />
      <main className="relative flex-1">
        {sections.home ? <Hero /> : null}
        {sections.about ? <About /> : null}
        {sections.education ? <Education /> : null}
        {sections.projects ? <Projects /> : null}
        {sections.certificates && certificates.length > 0 ? (
          <Certificates certificates={certificates} />
        ) : null}
        {sections.contact ? <Contact /> : null}
      </main>
      <SiteFooter />
    </>
  );
}
