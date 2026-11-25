"use client";

import { useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { skills } from "@/data/site";
import { TechnologyLogo } from "@/components/technology-logo";
import { useEffectiveMotion } from "@/components/motion";

const tones = ["blue", "violet", "ice", "steel"] as const;
const patterns = [
  "orbit-float-1",
  "orbit-float-2",
  "orbit-float-3",
  "orbit-float-4",
  "orbit-float-5",
  "orbit-float-6",
] as const;

const descriptions: Record<string, string> = {
  JavaScript: "Application logic across React, Node.js, and browser interfaces.",
  TypeScript: "Typed application code, component contracts, and robust full-stack architecture.",
  Python: "Backend workflows, document processing, FastAPI services, and data tasks.",
  SQL: "Relational data schema, complex queries, and persistence workflows.",
  React: "Interactive product interfaces, state management, and accessible component design.",
  Vite: "High-performance frontend toolchain with rapid HMR.",
  "Next.js": "Production React framework with App Router, SSR, and optimized server routes.",
  HTML: "Semantic document markup, accessibility standards, and SEO foundation.",
  CSS: "Responsive layouts, custom properties, animations, and modern CSS architecture.",
  "Tailwind CSS": "Utility-first design system for scalable, responsive user interfaces.",
  "Node.js": "Asynchronous event-driven runtime powering backend services and CLI tools.",
  Express: "Lightweight HTTP server middleware, routing, and REST endpoint architecture.",
  FastAPI: "High-performance Python API framework with automatic OpenAPI documentation.",
  "REST APIs": "RESTful resource design, idempotency, status codes, and JSON contracts.",
  WebSockets: "Real-time bidirectional communication channels for live data and chat.",
  Authentication: "Secure token management, session handling, OAuth, and RBAC security.",
  PostgreSQL: "Enterprise-grade relational database powering primary business data models.",
  Prisma: "Type-safe ORM for database migrations, relational modeling, and query execution.",
  PostGIS: "Geospatial database extension for parcel geometries and spatial queries.",
  Zod: "Runtime schema validation with static TypeScript type inference.",
  "Data analysis": "Extracting operational insights, risk distributions, and performance metrics.",
  "Google OAuth": "Secure federated authentication with Google Identity Services.",
  "Payment webhooks": "Cryptographically verified, idempotent webhook ingestion pipelines.",
  "Razorpay Sandbox": "Test-mode merchant workflows, payment orders, and checkout interfaces.",
  "PayPal Sandbox": "Developer sandbox for international payment flows and testing.",
  Groq: "Ultra-low-latency LPU inference for high-speed AI text processing.",
  Gemini: "Google's multimodal intelligence API powering assistive and structured workflows.",
  "Sarvam AI": "Specialized Indian language intelligence and voice processing integrations.",
  OpenRouter: "Unified API gateway accessing diverse foundation models with fallback routing.",
  Git: "Distributed version control, branching strategies, and collaborative code reviews.",
  GitHub: "Code hosting, CI/CD Actions automation, pull requests, and open-source collaboration.",
  Vercel: "Serverless edge deployment platform with preview environments and asset optimization.",
};

export function SkillsOrbit() {
  const [selected, setSelected] = useState<string | null>(null);
  const reduce = useEffectiveMotion();
  const technologies = skills.flatMap((group) =>
    group.items.map((name) => ({ name, category: group.title }))
  );

  return (
    <div className="skills-showcase">
      <div className="skills-orbit-field" role="group" aria-label="Technology showcase">
        {technologies.map((technology, index) => {
          const size = index % 7 === 0 ? "large" : index % 3 === 0 ? "medium" : "small";
          const pattern = patterns[index % patterns.length];
          // Varied durations between 4.8s and 7.6s for fluid, organic floating
          const duration = 4.8 + ((index * 3) % 5) * 0.7;
          // Negative delays so every orb starts at a distinct point in its cycle immediately
          const delay = -(((index * 1.7) % 6) + 0.3);
          // Orbs enter from alternating left/right edges, then gather into the grid
          const fromLeft = index % 2 === 0;

          const style = {
            "--orb-duration": `${duration.toFixed(2)}s`,
            "--orb-delay": `${delay.toFixed(2)}s`,
          } as CSSProperties;

          return (
            <motion.div
              className="technology-orb-cell"
              key={technology.name}
              initial={reduce ? false : { opacity: 0, x: fromLeft ? -140 : 140 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: reduce ? 0 : 0.72,
                delay: reduce ? 0 : Math.min(index * 0.05, 1.4),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className={`technology-orb-track ${pattern}`} style={style}>
                <button
                  className={`technology-orb tone-${tones[index % tones.length]} size-${size} ${
                    selected === technology.name ? "is-selected" : ""
                  }`}
                  type="button"
                  aria-label={`${technology.name}, ${technology.category}`}
                  aria-pressed={selected === technology.name}
                  onClick={() =>
                    setSelected((current) => (current === technology.name ? null : technology.name))
                  }
                >
                  <TechnologyLogo name={technology.name} />
                  <span className="technology-name">{technology.name}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="skills-orbit-caption" aria-live="polite">
        <span className="eyebrow">
          <i /> {selected ? `${selected.toUpperCase()} · DETAILS` : "SELECT A TECHNOLOGY"}
        </span>
        <p>
          {selected
            ? descriptions[selected] ??
              `${selected} appears in the project stacks and implementation workflows documented across this portfolio.`
            : "A project-grounded view of the technologies used across interfaces, APIs, data workflows, and integrations. Select any orb to view context."}
        </p>
      </div>

      <div className="skills-orbit-accessible">
        <span className="eyebrow">
          <i /> TECHNOLOGIES IN THIS SHOWCASE
        </span>
        <ul>
          {skills.map((group) => (
            <li key={group.title}>
              <strong>{group.title}:</strong> {group.items.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}