import type { Metadata } from "next";
import { HomeIntro } from "@/components/home-intro";
import { site } from "@/data/site";

export default function HomePage() {
  return <HomeIntro />;
}

export const metadata: Metadata = { alternates: { canonical: "/" }, openGraph: { images: site.url ? ["/images/og/default-og.png"] : [] } };
