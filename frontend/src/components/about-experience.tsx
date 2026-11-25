
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useState, type PointerEvent } from "react";
import { useEffectiveMotion } from "@/components/motion";

type Position = "left" | "center" | "right";

const positions: { value: Position; label: string }[] = [
  { value: "left", label: "Introduction" },
  { value: "center", label: "Actions" },
  { value: "right", label: "About" },
];

export function AboutExperience() {
  const [position, setPosition] = useState<Position>("center");
  const [compact, setCompact] = useState(false);
  const reduce = useEffectiveMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => setCompact(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const relative = (event.clientX - bounds.left) / bounds.width;

    setPosition((current) => {
      if (current === "left") return relative >= 0.40 ? "center" : "left";
      if (current === "right") return relative <= 0.60 ? "center" : "right";
      return relative < 0.30 ? "left" : relative > 0.70 ? "right" : "center";
    });
  }, []);

  const shift = compact ? 0 : 150;

  const panelTransition = {
    duration: reduce ? 0 : 0.48,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const introVariants: Variants = {
    left: {
      opacity: 1,
      x: 0,
      pointerEvents: "auto" as const,
      transition: panelTransition,
    },
    center: {
      opacity: 0,
      x: -14,
      pointerEvents: "none" as const,
      transition: panelTransition,
    },
    right: {
      opacity: 0,
      x: -14,
      pointerEvents: "none" as const,
      transition: panelTransition,
    },
  };

  const storyVariants: Variants = {
    left: {
      opacity: 0,
      x: 14,
      pointerEvents: "none" as const,
      transition: panelTransition,
    },
    center: {
      opacity: 0,
      x: 14,
      pointerEvents: "none" as const,
      transition: panelTransition,
    },
    right: {
      opacity: 1,
      x: 0,
      pointerEvents: "auto" as const,
      transition: panelTransition,
    },
  };

  const portraitVariants: Variants = {
    left: {
      x: shift,
      transition: {
        duration: reduce ? 0 : 0.58,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    center: {
      x: 0,
      transition: {
        duration: reduce ? 0 : 0.58,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    right: {
      x: -shift,
      transition: {
        duration: reduce ? 0 : 0.58,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const actionVariants: Variants = {
    left: {
      opacity: 0,
      y: 8,
      pointerEvents: "none" as const,
      transition: {
        duration: reduce ? 0 : 0.36,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    center: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto" as const,
      transition: {
        duration: reduce ? 0 : 0.44,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    right: {
      opacity: 0,
      y: 8,
      pointerEvents: "none" as const,
      transition: {
        duration: reduce ? 0 : 0.36,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      className={`about-experience about-state-${position}`}
      aria-label="Interactive portrait introduction"
      onPointerMove={onPointerMove}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setPosition("center");
      }}
    >
      <div className="about-experience-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {/* Introduction - Left */}
      <motion.div
        className="about-experience-copy about-intro-copy"
        variants={introVariants}
        animate={position}
        aria-hidden={position !== "left"}
        inert={position !== "left"}
      >
        <span className="eyebrow">
          <i /> INTRODUCTION
        </span>

        <h2>
          I build products.
          <br />
          <span>Beyond the interface.</span>
        </h2>

        <p>
          I&apos;m Aryan, a full-stack developer focused on building practical web
          applications and reliable backend systems. I turn ideas into working
          products through thoughtful architecture, clean APIs, and
          problem-solving.
        </p>

        <Link className="inline-link" href="/projects">
          Explore the work <ArrowUpRight size={15} />
        </Link>
      </motion.div>

      {/* Portrait - Center */}
      <motion.div
        className="about-experience-portrait"
        variants={portraitVariants}
        animate={position}
      >
        <div className="about-portrait-frame">
          <Image
            src="/images/profile/aryan-workspace.png"
            alt="Aryan Agarwal at his development workspace"
            fill
            priority
            sizes="(max-width: 760px) 78vw, 34vw"
          />
        </div>

        <span className="about-portrait-caption">
          ARYAN AGARWAL <i /> SOFTWARE DEVELOPER
        </span>
      </motion.div>

      {/* About - Right */}
      <motion.div
        className="about-experience-copy about-story-copy"
        variants={storyVariants}
        animate={position}
        aria-hidden={position !== "right"}
        inert={position !== "right"}
      >
        <span className="eyebrow">
          <i /> ABOUT
        </span>

        <h2>Engineering ideas into meaningful software.</h2>

        <p>
          I enjoy working across the stack, from crafting intuitive interfaces
          to engineering the systems behind them. My interests include backend
          architecture, database design, API development, and integrations. I
          focus on writing maintainable code, solving real-world problems, and
          building software that works beyond the demo.
        </p>
      </motion.div>

      {/* Center Actions */}
      <motion.div
        className="about-center-actions"
        variants={actionVariants}
        animate={position}
        aria-hidden={position !== "center"}
        inert={position !== "center"}
      >
        <Link className="action-link primary" href="/projects">
          Explore Projects <ArrowRight size={16} />
        </Link>

        <Link className="action-link secondary" href="/contact">
          Get in Touch <ArrowRight size={16} />
        </Link>
      </motion.div>

      {/* State Controls */}
      <div
        className="about-state-controls"
        role="group"
        aria-label="Choose portrait introduction state"
      >
        {positions.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={position === value}
            onClick={() => setPosition(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
