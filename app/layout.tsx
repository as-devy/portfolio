import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { DevToolsGuard } from "@/components/layout/DevToolsGuard";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { getVisibleNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { getSectionFlags } from "@/lib/section-flags";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Full Stack Developer",
    "UI/UX Designer",
    "Next.js",
    "TypeScript",
    "Web Security",
    "Cybersecurity",
    "Blue Team",
    "MFA Security Testing",
    "Wazuh SIEM",
    "RabbitMQ",
    "Event-driven Architecture",
    "Portfolio",
    siteConfig.name,
  ],
  authors: [{ name: siteConfig.fullName }],
  alternates: {
    canonical: "/",
  },
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: siteConfig.heroImage.src,
        alt: siteConfig.heroImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.heroImage.src],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

const devToolsEnabled = !["false", "0", "no", "off"].includes(
  (process.env.DEV_TOOLS ?? "true").trim().toLowerCase(),
);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const navItems = getVisibleNavigation(getSectionFlags());

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-foreground">
        <DevToolsGuard enabled={devToolsEnabled} />
        <div className="site-bg" aria-hidden>
          <span className="site-orb site-orb-a" />
          <span className="site-orb site-orb-b" />
          <span className="site-orb site-orb-c" />
          <span className="site-orb site-orb-d" />
        </div>
        <div className="site-grid" aria-hidden />
        <div className="site-noise" aria-hidden />
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-black"
        >
          Skip to content
        </a>
        {children}
        <FloatingNav items={navItems} />
      </body>
    </html>
  );
}
