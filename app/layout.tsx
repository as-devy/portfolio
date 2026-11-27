import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Syne } from "next/font/google";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { SiteLoader } from "@/components/layout/SiteLoader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
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
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  const navItems = getVisibleNavigation(getSectionFlags());

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-foreground">
        <SiteLoader />
        <ScrollProgress />
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
        <div className="site-reveal">{children}</div>
        <div className="site-reveal-fade">
          <FloatingNav items={navItems} />
        </div>
      </body>
    </html>
  );
}
