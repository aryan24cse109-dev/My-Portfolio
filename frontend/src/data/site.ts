export const site = {
  name: "Aryan Agarwal",
  role: "Full-Stack Developer",
  description:
    "Full-Stack Developer focused on backend engineering, software development, and practical products.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3000" : ""),
  github: "https://github.com/aryan24cse109-dev",
  linkedin: "https://www.linkedin.com/in/aryan-agarwal-7829b4297/",
  youtube: "https://www.youtube.com/@AryanAgarwal-t6e",
  resumePath: "/resume/Aryan-Agarwal-CV.pdf",
  resumeFileName: "Aryan-Agarwal-CV.pdf",
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "GitHub Activity", href: "/github" },
  { label: "Contact", href: "/contact" },
] as const;

export const skills = [
  { title: "Languages", items: ["JavaScript", "TypeScript", "Python", "SQL"] },
  { title: "Frontend", items: ["React", "Vite", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Express", "FastAPI", "REST APIs", "WebSockets", "Authentication"] },
  { title: "Data", items: ["PostgreSQL", "Prisma", "PostGIS", "Zod", "Data analysis"] },
  { title: "Integrations", items: ["Google OAuth", "Payment webhooks", "Razorpay Sandbox", "PayPal Sandbox", "Groq", "Gemini", "Sarvam AI", "OpenRouter"] },
  { title: "Tools", items: ["Git", "GitHub", "Vercel"] },
] as const;
