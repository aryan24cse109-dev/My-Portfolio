"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, site } from "@/data/site";
import { MotionToggle } from "@/components/motion";

export function SiteHeader({ hasResume }: { hasResume: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <div className="nav-wrap">
      <Link className="brand-link" href="/" aria-label="Aryan Agarwal, home"><Image src="/brand/aryan-monogram.png" alt="" width={42} height={42} priority /><span>Aryan Agarwal<span className="brand-dot">.</span></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => {
          const active = pathname === item.href || (item.href === "/projects" && pathname.startsWith("/projects/"));
          return <Link key={item.href} href={item.href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>{item.label}</Link>;
        })}
        {hasResume && <a className="nav-resume" href={site.resumePath} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14} /></a>}
        <MotionToggle />
      </nav>
      <button id="menu-toggle" className="menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
    </div>
    <nav id="mobile-navigation" className={`mobile-nav ${open ? "open" : ""}`} aria-label="Mobile navigation" aria-hidden={!open}>
      <div className="mobile-motion-row"><MotionToggle /></div>
      {navigation.map((item, index) => { const active = pathname === item.href || (item.href === "/projects" && pathname.startsWith("/projects/")); return <Link key={item.href} href={item.href} tabIndex={open ? 0 : -1} aria-current={active ? "page" : undefined} style={{ transitionDelay: open ? `${index * 35}ms` : "0ms" }}>{item.label}</Link>; })}
      {hasResume && <><a href={site.resumePath} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>View resume <ArrowUpRight size={16} /></a><a href={site.resumePath} download={site.resumeFileName} tabIndex={open ? 0 : -1}>Download CV <ArrowUpRight size={16} /></a></>}
      <div className="mobile-social"><a href={site.github} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>GitHub ↗</a><a href={site.linkedin} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>LinkedIn ↗</a></div>
    </nav>
  </header>;
}
