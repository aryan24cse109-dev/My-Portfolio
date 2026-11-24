"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useEffectiveMotion } from "@/components/motion";

const sequence: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.13 } },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

export function HomeIntro() {
  const reduce = useEffectiveMotion();
  return <section className="intro-screen" aria-labelledby="intro-title">
    <div className="intro-ambient" aria-hidden="true"><span /><span /><span /></div>
    <div className="intro-grid-lines" aria-hidden="true" />
    <motion.div className="intro-content" variants={sequence} initial={reduce ? false : "hidden"} animate="visible">
      <motion.div className="intro-mark" variants={reveal} aria-hidden="true"><Image src="/brand/aryan-monogram.png" width={34} height={34} alt="" /></motion.div>
      <motion.p className="intro-eyebrow" variants={reveal}>ARYAN AGARWAL <span>·</span> SOFTWARE / 01</motion.p>
      <motion.h1 id="intro-title" variants={reveal}>Thoughtful systems.<br /><span>Useful software.</span></motion.h1>
      <motion.p className="intro-description" variants={reveal}>A portfolio of full-stack products, backend engineering, and the decisions behind the work.</motion.p>
      <motion.div variants={reveal}><Link className="intro-start" href="/about">LET’S START <ArrowRight size={17} aria-hidden="true" /></Link></motion.div>
      <motion.div className="intro-foot" variants={reveal}><span>FULL-STACK DEVELOPMENT</span><span>BACKEND ENGINEERING</span><span>KOTA, INDIA</span></motion.div>
    </motion.div>
  </section>;
}
