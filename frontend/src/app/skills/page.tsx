import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { SkillsGroups } from "@/components/skills-groups";
import { SkillsOrbit } from "@/components/skills-orbit";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Skills", description: "Technologies Aryan Agarwal has used across full-stack, backend, and software projects.", alternates: { canonical: "/skills" }, openGraph: { images: site.url ? ["/images/og/default-og.png"] : [] } };

export default function SkillsPage() {
  return <><section className="page-intro"><Container><Reveal><span className="eyebrow"><i /> CAPABILITIES</span><h1>Tools for building<br />useful software.</h1><p>A project-grounded view of the languages, frameworks, data stores, and integrations used across product interfaces, backend workflows, and application development.</p></Reveal></Container></section><section className="page-body skills-orbit-page"><Container><Reveal><SkillsOrbit /></Reveal><p className="contact-note" style={{ marginTop: 30 }}>Technologies appear here when supported by the project information and existing skill records. The selection is not a proficiency rating.</p><div className="skills-showcase-block"><Reveal><span className="eyebrow"><i /> SUPPORTING DETAIL</span><h2>Technologies by category.</h2><p className="project-summary">The same stack, organised by discipline for quick reference.</p></Reveal><Reveal><SkillsGroups /></Reveal></div></Container></section></>;
}