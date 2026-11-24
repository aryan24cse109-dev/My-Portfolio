import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ActionLink, Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { projects } from "@/data/projects";
import { ContributionList } from "@/components/contribution-list";
import { site } from "@/data/site";

function DetailSection({ children }: { children: ReactNode }) {
  return <Reveal><section>{children}</section></Reveal>;
}

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary, alternates: { canonical: `/projects/${project.slug}` }, openGraph: { images: site.url ? ["/images/og/projects-og.png"] : [] } };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const related = projects.filter((item) => item.slug !== slug).slice(0, 2);
  return <>
    <section className="project-detail-top"><Container><Link href="/projects" className="text-link"><ArrowLeft size={14} /> All projects</Link><Reveal><div style={{ marginTop: 32 }}><span className="eyebrow"><i /> {project.category}</span><h1>{project.title}</h1><p>{project.overview}</p><div className="project-links">{project.repository && <a className="action-link secondary" href={project.repository} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={15} /></a>}{project.live && <a className="action-link primary" href={project.live} target="_blank" rel="noreferrer">Open live project <ArrowUpRight size={15} /></a>}{project.demo && <a className="action-link secondary" href={project.demo} target="_blank" rel="noreferrer">Watch walkthrough <ArrowUpRight size={15} /></a>}{project.apiDocs && <a className="action-link secondary" href={project.apiDocs} target="_blank" rel="noreferrer">API docs <ArrowUpRight size={15} /></a>}</div></div></Reveal></Container></section>
    <Container><Reveal>{project.cover ? <div className="project-cover"><Image src={project.cover} alt={project.alt} fill priority sizes="100vw" /></div> : <div className="risk-visual project-cover-visual"><span>RETURN RISK MATRIX</span><div className="risk-bars"><i style={{ width: "82%" }} /><i style={{ width: "66%" }} /><i style={{ width: "54%" }} /><i style={{ width: "43%" }} /><i style={{ width: "31%" }} /><i style={{ width: "24%" }} /></div><small>6 weighted dimensions · deterministic scoring</small><b>25 <em>/</em> 20 <em>/</em> 20 <em>/</em> 15 <em>/</em> 10 <em>/</em> 10</b></div>}</Reveal></Container>
    <Container className="project-detail-content"><div className="detail-main">
      <DetailSection><span className="eyebrow"><i /> THE PROBLEM</span><h2>Why it exists</h2><p>{project.problem}</p></DetailSection>
      <DetailSection><span className="eyebrow"><i /> THE APPROACH</span><h2>How it works</h2><p>{project.solution}</p><ol>{project.workflow.map((step) => <li key={step}>{step}</li>)}</ol>{project.riskFactors && <div className="factor-table" aria-label="ReturnRiskMatrix factor weights">{project.riskFactors.map((factor) => <div key={factor.name}><span>{factor.name}</span><strong>{factor.weight}</strong></div>)}</div>}</DetailSection>
      <DetailSection><span className="eyebrow"><i /> PRODUCT DETAILS</span><h2>What’s included</h2><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></DetailSection>
      {project.slug === "open-source" && <DetailSection><span className="eyebrow"><i /> SELECTED PULL REQUESTS</span><h2>Contributions to AlgoMate</h2><ContributionList /></DetailSection>}
      <DetailSection><span className="eyebrow"><i /> ENGINEERING NOTES</span><h2>Things to get right</h2><ul>{project.challenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul></DetailSection>
      <DetailSection><span className="eyebrow"><i /> PROJECT LIMITS</span><h2>Context matters</h2>{project.notes.map((note) => <div className="note-callout" key={note}>{note}</div>)}</DetailSection>
      {project.gallery.length > 0 && <DetailSection><span className="eyebrow"><i /> PRODUCT SCREENS</span><h2>Inside the application</h2><div className="detail-gallery">{project.gallery.map((image) => <figure key={image.src}><Image src={image.src} alt={image.alt} width={1917} height={920} sizes="(max-width: 760px) 100vw, 760px" /><figcaption>{image.caption}</figcaption></figure>)}</div></DetailSection>}
      <DetailSection><span className="eyebrow"><i /> KEEP EXPLORING</span><h2>More selected work</h2><div className="related-row">{related.map((item) => <Link key={item.slug} href={`/projects/${item.slug}`}>{item.title} <ArrowRight size={13} /></Link>)}</div></DetailSection>
      <Reveal><div className="detail-pager"><Link className="text-link" href={`/projects/${projects[(index + projects.length - 1) % projects.length].slug}`}><ArrowLeft size={14} /> Previous</Link><Link className="text-link" href={`/projects/${projects[(index + 1) % projects.length].slug}`}>Next project <ArrowRight size={14} /></Link></div></Reveal>
    </div><Reveal><aside className="detail-sidebar"><div className="sidebar-block"><h3>Role</h3><p>{project.role?.join(" · ") ?? "Contributor"}</p></div><div className="sidebar-block"><h3>Technologies</h3><div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div><div className="sidebar-block"><h3>Links</h3>{project.repository && <p><a href={project.repository} target="_blank" rel="noreferrer">Repository ↗</a></p>}{project.live && <p><a href={project.live} target="_blank" rel="noreferrer">Live project ↗</a></p>}</div></aside></Reveal></Container>
    <section className="section section-border"><Container><Reveal><div className="contact-banner"><span className="eyebrow"><i /> NEXT</span><h2>Explore the rest of the work.</h2><p>Browse the project index for more product and engineering case studies.</p><ActionLink href="/projects">All projects</ActionLink></div></Reveal></Container></section>
  </>;
}
