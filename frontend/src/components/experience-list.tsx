"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { experience, experienceCategories } from "@/data/experience";
import { Reveal } from "@/components/motion";
import { staggerDelay } from "@/lib/motion";

export function ExperienceList() {
  const [category, setCategory] = useState<(typeof experienceCategories)[number]>("All");
  const items = useMemo(() => category === "All" || category === "Technical Experience" ? experience : experience.filter((item) => item.category === category), [category]);
  return <>
    <div className="experience-filters" role="group" aria-label="Filter experience by category">{experienceCategories.map((value) => <button key={value} type="button" className={category === value ? "active" : ""} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</div>
    <div className="experience-grid">{items.map((item, index) => <Reveal key={item.id} delay={staggerDelay(index, 0.085)}><article className="experience-card">
      <div className="experience-visual" aria-hidden="true"><span>{item.visual}</span><small>0{index + 1} / {item.category}</small></div>
      <div className="experience-card-content"><div className="experience-card-meta"><span>{item.category}</span><time>{item.date}</time></div>
        <h2>{item.title}</h2><p className="experience-project">Project <strong>{item.project}</strong>{item.teamSize && <span> · {item.teamSize}</span>}</p>
        {item.role && <p className="experience-role">{item.role}</p>}<p className="experience-description">{item.description}</p>
        {item.result && <p className="experience-result">{item.result}</p>}
        {item.projectHref && <Link className="inline-link" href={item.projectHref}>Explore {item.project} <ArrowUpRight size={15} /></Link>}
      </div>
    </article></Reveal>)}</div>
  </>;
}
