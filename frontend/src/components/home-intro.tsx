"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useEffectiveMotion } from "@/components/motion";

const sequence: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.12 } },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

export function HomeIntro() {
  const reduce = useEffectiveMotion();
  return <section className="intro-screen" aria-labelledby="intro-title">
    <div className="intro-grid-lines" aria-hidden="true" />
    <div className="intro-layout">
      <motion.div className="intro-copy" variants={sequence} initial={reduce ? false : "hidden"} animate="visible">
        <motion.span className="eyebrow" variants={reveal}><i /> ARYAN AGARWAL · SOFTWARE / 01</motion.span>
        <motion.h1 id="intro-title" variants={reveal}>Thoughtful systems.<br /><span>Useful software.</span></motion.h1>
        <motion.p className="intro-deck" variants={reveal}>A portfolio of full-stack products, backend engineering, and the decisions behind the work — documented as engineering case studies.</motion.p>
        <motion.div className="intro-actions" variants={reveal}>
          <Link className="action-link primary" href="/projects">Explore the work <ArrowRight size={17} aria-hidden="true" /></Link>
          <Link className="action-link secondary" href="/about">About me <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </motion.div>
        <motion.div className="intro-meta" variants={reveal}>
          <span><b>FOCUS</b> Full-stack / Backend</span>
          <span><b>BASED</b> Kota, India</span>
          <span><b>STATUS</b> Open to work</span>
        </motion.div>
      </motion.div>
      <motion.aside className="intro-plate" variants={reveal} aria-label="Portrait">
        <span className="intro-plate-index" aria-hidden="true">PORTFOLIO — 2026</span>
        <div className="intro-plate-frame">
          <Image src="/images/profile/aryan-hero.png" alt="Portrait of Aryan Agarwal" fill priority sizes="(max-width: 760px) 90vw, 460px" />
        </div>
        <div className="intro-plate-caption"><span>ARYAN AGARWAL</span><span>FULL-STACK DEV</span></div>
      </motion.aside>
    </div>
  </section>;
}