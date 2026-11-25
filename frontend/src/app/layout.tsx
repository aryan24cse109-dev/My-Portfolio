import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: { default: "Aryan Agarwal — Full-Stack Developer", template: "%s | Aryan Agarwal" },
  description: site.description,
  applicationName: "Aryan Agarwal Portfolio",
  openGraph: { type: "website", locale: "en_IN", siteName: "Aryan Agarwal", title: "Aryan Agarwal — Full-Stack Developer", description: site.description, images: site.url ? [{ url: "/images/og/default-og.png", width: 1734, height: 907, alt: "Aryan Agarwal developer portfolio" }] : [] },
  twitter: { card: "summary_large_image", title: "Aryan Agarwal — Full-Stack Developer", description: site.description, images: site.url ? ["/images/og/default-og.png"] : [] },
  icons: { icon: [{ url: "/icons/favicon.svg", type: "image/svg+xml" }, { url: "/icons/favicon.ico" }, { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" }], apple: "/icons/apple-touch-icon.png" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#10131B", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: site.name, jobTitle: site.role, ...(site.url ? { url: site.url } : {}), sameAs: [site.github, site.linkedin, site.youtube], alumniOf: { "@type": "CollegeOrUniversity", name: "Rajasthan Technical University, Kota" } };
  const websiteLd = { "@context": "https://schema.org", "@type": "WebSite", name: "Aryan Agarwal Portfolio", ...(site.url ? { url: site.url } : {}), description: site.description };
  const fontVariables = { "--font-inter": '"Inter"', "--font-space": '"Space Grotesk"' } as CSSProperties;
  return <html lang="en" suppressHydrationWarning><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    {/* Runtime font loading keeps production compilation independent of the external font service. */}
    {/* eslint-disable-next-line @next/next/no-page-custom-font */}
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head><body id="top" style={fontVariables} suppressHydrationWarning><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, websiteLd]).replace(/</g, "\\u003c") }} /><SiteShell><main id="main">{children}</main></SiteShell></body></html>;
}
