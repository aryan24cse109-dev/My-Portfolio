import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-main"><div><Link className="footer-brand" href="/">Aryan Agarwal<span>.</span></Link><p>Full-Stack Developer · Backend Engineering · Software Development</p></div><div className="footer-links"><Link href="/projects">Selected work</Link><Link href="/github">Open source</Link><Link href="/contact">Contact</Link></div><div className="footer-social"><a href={site.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Aryan Agarwal</span><a href="#top">Back to top ↑</a><span>Designed & built with care.</span></div></footer>;
}
