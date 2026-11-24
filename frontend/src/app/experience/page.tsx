import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { ExperienceList } from "@/components/experience-list";
import { Reveal } from "@/components/motion";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Experience & Achievements", description: "Technical training, project leadership, and hackathon experience from Aryan Agarwal.", alternates: { canonical: "/experience" }, openGraph: { images: site.url ? ["/images/og/default-og.png"] : [] } };

export default function ExperiencePage() {
  return <><section className="page-intro"><Container><Reveal><span className="eyebrow"><i /> EXPERIENCE · PROJECT LEADERSHIP · COMPETITION</span><h1>Experience &<br />Achievements.</h1><p>Experiences built through technical training, project development, team leadership, and competitive hackathons. Project work is described as project work, not employment history.</p></Reveal></Container></section><section className="page-body"><Container><ExperienceList /></Container></section></>;
}
