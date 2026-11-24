import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`container ${className}`}>{children}</div>; }
export function SectionHeading({ eyebrow, title, children, light = false }: { eyebrow: string; title: string; children?: ReactNode; light?: boolean }) { return <div className={`section-heading ${light ? "section-heading-light" : ""}`}><span className="eyebrow"><i />{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>; }
export function ActionLink({ href, children, kind = "primary", ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode; kind?: "primary" | "secondary" | "text" }) {
  const className = `action-link ${kind} ${props.className ?? ""}`;
  if (href.startsWith("/")) return <Link href={href} className={className} {...props}>{children}<ArrowRight size={17} aria-hidden="true" /></Link>;
  return <a href={href} className={className} {...props}>{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
}

export function ResumeActions({ compact = false }: { compact?: boolean }) {
  const fileExists = existsSync(join(process.cwd(), "public", site.resumePath.replace(/^\//, "")));
  if (!fileExists) return null;
  return <div className={`resume-actions ${compact ? "compact" : ""}`}><a className="resume-view" href={site.resumePath} target="_blank" rel="noreferrer">View resume <ArrowUpRight size={15} /></a><a className="resume-download" href={site.resumePath} download={site.resumeFileName}>Download CV <ArrowRight size={15} /></a></div>;
}
