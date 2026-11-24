import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Container, ResumeActions } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Contact", description: "Connect with Aryan Agarwal about software, engineering opportunities, and collaboration.", alternates: { canonical: "/contact" }, openGraph: { images: site.url ? ["/images/og/default-og.png"] : [] } };

export default function ContactPage() {
  const contactEmail = process.env.CONTACT_EMAIL;
  const links = [
    { name: "LinkedIn", detail: "Professional profile", href: site.linkedin, icon: Linkedin },
    { name: "GitHub", detail: "Code and contributions", href: site.github, icon: Github },
  ];

  return <>
    <section className="page-intro"><Container><Reveal><span className="eyebrow"><i /> CONTACT</span><h1>Let’s talk about<br />what you’re building.</h1><p>I’m open to conversations about software engineering, internships, and thoughtful collaborations.</p></Reveal></Container></section>
    <section className="page-body"><Container className="contact-layout">
      <Reveal delay={0.06}><aside className="contact-profile-card">
        <div className="contact-profile-photo"><Image src="/images/profile/aryan-secondary.png" alt="Aryan Agarwal" width={1122} height={1402} sizes="(max-width: 760px) 120px, 160px" /></div>
        <div className="contact-identity"><span className="eyebrow"><i /> PROFILE</span><h2>Aryan Agarwal</h2><p>Full-Stack Developer</p></div>
        <div className="contact-links">
          {links.map(({ name, detail, href, icon: Icon }, index) => <Reveal key={name} className="contact-link-reveal" delay={0.08 + index * 0.08}><a href={href} target="_blank" rel="noreferrer"><span className="contact-link-label"><Icon size={17} /><span><strong>{name}</strong><small>{detail}</small></span></span><ArrowUpRight size={15} /></a></Reveal>)}
          {contactEmail ? <Reveal className="contact-link-reveal" delay={0.24}><a href={`mailto:${contactEmail}`}><span className="contact-link-label"><Mail size={17} /><span><strong>Email</strong><small>{contactEmail}</small></span></span><ArrowUpRight size={15} /></a></Reveal> : <Reveal className="contact-link-reveal" delay={0.24}><div className="contact-email-unavailable"><Mail size={17} /><span><strong>Email</strong><small>Not configured yet</small></span></div></Reveal>}
        </div>
        <div className="contact-resume"><ResumeActions /></div>
      </aside></Reveal>
      <Reveal delay={0.14}><ContactForm /></Reveal>
    </Container></section>
  </>;
}
