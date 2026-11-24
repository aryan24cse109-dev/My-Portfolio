import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index = 0, featured = false }: { project: Project; index?: number; featured?: boolean }) {
  return <article className={`project-card ${featured ? "project-featured" : ""} project-${project.slug}`}>
    <Link href={`/projects/${project.slug}`} className="project-image-link" aria-label={`Explore ${project.title}`}>
      {project.cover ? <div className="project-image" style={{ aspectRatio: project.coverRatio }}><Image src={project.cover} alt={project.alt} fill priority={index === 0} sizes={featured ? "(max-width: 760px) 100vw, 60vw" : "(max-width: 760px) 100vw, 42vw"} /><span className="image-index">0{index + 1} / 05</span><span className="image-open"><ArrowUpRight size={19} /></span></div> : <div className="risk-visual"><span>RETURN RISK MATRIX</span><div className="risk-bars"><i style={{ width: "82%" }} /><i style={{ width: "66%" }} /><i style={{ width: "54%" }} /><i style={{ width: "43%" }} /><i style={{ width: "31%" }} /><i style={{ width: "24%" }} /></div><small>6 weighted dimensions · deterministic scoring</small><b>25 <em>/</em> 20 <em>/</em> 20 <em>/</em> 15 <em>/</em> 10 <em>/</em> 10</b><span className="image-index">0{index + 1} / 05</span></div>}
    </Link>
    <div className="project-meta"><span>{project.category}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
    <div className="project-title-row"><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><Link href={`/projects/${project.slug}`} className="project-arrow" aria-label={`View ${project.title} case study`}><ArrowUpRight size={19} /></Link></div>
    <p className="project-summary">{project.summary}</p>
    <div className="tag-row">{project.stack.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}</div>
  </article>;
}
