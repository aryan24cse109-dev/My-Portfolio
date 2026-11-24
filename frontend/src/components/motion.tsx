"use client";

import { motion, useScroll } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export function useEffectiveMotion(): boolean {
  const [reduce, setReduce] = useState<boolean>(false);

  const checkPreference = useCallback(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("portfolio-motion-preference");
    const userReduced = stored === "reduced";
    // Respect the operating-system accessibility preference as well. An explicit
    // "reduced" choice or an active OS preference both reduce motion; a plain
    // "Motion On" setting never overrides an active OS accessibility preference.
    const systemReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const effectiveReduced = userReduced || systemReduced;
    setReduce(effectiveReduced);
    document.documentElement.setAttribute("data-motion", effectiveReduced ? "reduced" : "full");
  }, []);

  useEffect(() => {
    checkPreference();
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => checkPreference();
    window.addEventListener("portfolio-motion-change", onChange);
    motionQuery.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("portfolio-motion-change", onChange);
      motionQuery.removeEventListener("change", onChange);
    };
  }, [checkPreference]);

  return reduce;
}

export function MotionToggle() {
  const reduce = useEffectiveMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function toggle() {
    const next = reduce ? "full" : "reduced";
    localStorage.setItem("portfolio-motion-preference", next);
    window.dispatchEvent(new Event("portfolio-motion-change"));
  }

  if (!mounted) {
    return (
      <button className="motion-toggle" type="button" aria-label="Toggle motion animation">
        <Sparkles size={13} aria-hidden="true" />
        <span>Motion: On</span>
      </button>
    );
  }

  return (
    <button
      className={`motion-toggle ${reduce ? "is-reduced" : "is-active"}`}
      type="button"
      onClick={toggle}
      aria-label={reduce ? "Enable motion animations" : "Enable reduced motion"}
      title={reduce ? "Click to enable smooth motion animations" : "Click to enable reduced motion mode"}
    >
      <Sparkles size={13} aria-hidden="true" />
      <span>{reduce ? "Motion: Reduced" : "Motion: On"}</span>
    </button>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "left" | "right";
}) {
  const reduce = useEffectiveMotion();
  const offset = 22;
  const x = from === "left" ? -offset : from === "right" ? offset : 0;

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: from === "up" ? offset : 0, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: reduce ? 0.01 : 0.58,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function RouteTransition({ children }: { children: ReactNode }) {
  const reduce = useEffectiveMotion();

  return (
    <motion.div
      className="route-transition"
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useEffectiveMotion();

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: reduce ? 0 : scrollYProgress }}
      aria-hidden="true"
    />
  );
}
