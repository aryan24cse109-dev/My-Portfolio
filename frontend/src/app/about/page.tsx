import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { AboutExperience } from "@/components/about-experience";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Aryan Agarwal, a Computer Science and Engineering student focused on full-stack development and backend engineering.",
  alternates: { canonical: "/about" },
  openGraph: { images: site.url ? ["/images/og/default-og.png"] : [] },
};

export default function AboutPage() {
  return <section className="page-body about-page"><Container><AboutExperience /><noscript><p className="about-noscript">Aryan is a Computer Science and Engineering student at Rajasthan Technical University, Kota, graduating in 2028. He builds full-stack applications and backend workflows, including data models, APIs, authentication, and integrations.</p></noscript></Container></section>;
}
