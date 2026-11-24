import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found", description: "The requested page could not be found." };

export default function NotFound() {
  return <section className="not-found"><span className="eyebrow"><i />Page not found</span><h1>404</h1><p>This page may have moved, or the address may be mistyped.</p><div className="hero-actions" style={{ justifyContent: "center" }}><Link className="action-link secondary" href="/" aria-label="Return home"><ArrowLeft size={16} /> Return home</Link><Link className="action-link primary" href="/projects">Explore projects <ArrowRight size={16} /></Link></div></section>;
}
