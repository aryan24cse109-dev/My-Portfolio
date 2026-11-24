import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { staggerDelay } from "@/lib/motion";
import { Container } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Projects", description: "Full-stack applications, backend workflows, and open-source contributions by Aryan Agarwal.", alternates: { canonical: "/projects" }, openGraph: { images: site.url ? ["/images/og/projects-og.png"] : [] } };

export default function ProjectsPage() {
  return <><section className="page-intro"><Container><Reveal><span className="eyebrow"><i /> SELECTED WORK · 05</span><h1>Projects with a<br />reason to exist.</h1><p>Each project started with a practical problem. Explore the product, implementation choices, workflow, and limitations behind the work.</p></Reveal></Container></section><section className="page-body"><Container><div className="projects-grid">{projects.map((project, index) => <Reveal key={project.slug} delay={staggerDelay(index, 0.12)}><ProjectCard project={project} index={index} /></Reveal>)}</div></Container></section></>;
}
