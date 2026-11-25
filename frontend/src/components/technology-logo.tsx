import type { ReactNode } from "react";

export function TechnologyLogo({ name }: { name: string }): ReactNode {
  switch (name) {
    case "React":
      return (
        <span className="technology-logo brand-react" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor">
            <g stroke="#61DAFB" strokeWidth="1.8">
              <ellipse cx="20" cy="20" rx="17" ry="6.5" />
              <ellipse cx="20" cy="20" rx="17" ry="6.5" transform="rotate(60 20 20)" />
              <ellipse cx="20" cy="20" rx="17" ry="6.5" transform="rotate(120 20 20)" />
            </g>
            <circle cx="20" cy="20" r="2.8" fill="#61DAFB" />
          </svg>
        </span>
      );

    case "TypeScript":
      return (
        <span className="technology-logo brand-typescript" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <rect width="36" height="36" rx="6" fill="#3178C6" />
            <path
              d="M19.5 13.5H10v3.2h3.3v11.8h3.8V16.7h3.4v-3.2zm4.1 8.8c.8.6 1.8 1 3 1 1.2 0 1.9-.5 1.9-1.3 0-.9-.7-1.3-2.3-1.9-2.2-.8-3.7-1.7-3.7-3.7 0-2.2 1.8-3.8 4.6-3.8 1.7 0 3 .5 3.9 1.2l-1.1 2.8c-.8-.5-1.7-.9-2.7-.9-1 0-1.6.4-1.6 1.1 0 .7.6 1.1 2.2 1.7 2.4.9 3.8 1.9 3.8 4 0 2.4-1.9 4-4.9 4-2 0-3.6-.6-4.5-1.5l1.4-2.7z"
              fill="#FFFFFF"
            />
          </svg>
        </span>
      );

    case "JavaScript":
      return (
        <span className="technology-logo brand-javascript" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <rect width="36" height="36" rx="6" fill="#F7DF1E" />
            <path
              d="M18.8 24.2c-.4 2.2-2 3.6-4.4 3.6-2.9 0-4.6-1.8-4.6-4.6v-7.2h3.2v7.1c0 1.3.6 2 1.7 2 1 0 1.5-.7 1.7-1.8l2.4.9zm10.7-3.2c0 3.7-2.3 6.8-6.6 6.8-2.6 0-4.6-1.1-5.7-2.6l2.3-1.8c.8 1.1 1.9 1.8 3.4 1.8 1.8 0 3.1-1 3.1-2.5 0-1.7-1.3-2.3-3.6-3.1-3-.9-4.8-2.1-4.8-5 0-3.4 2.6-5.8 6-5.8 2.2 0 4 1 5.1 2.3l-2.2 1.8c-.7-.9-1.7-1.4-2.9-1.4-1.6 0-2.6 1-2.6 2.1 0 1.4 1 1.9 3 2.6 3.4 1.1 5.5 2.2 5.5 4.8z"
              fill="#000000"
            />
          </svg>
        </span>
      );

    case "Python":
      return (
        <span className="technology-logo brand-python" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <path
              d="M17.4 3.5c-6.8 0-6.4 2.9-6.4 2.9l.01 3.1h6.6v.9H8.2s-4.2.4-4.2 6.4 3.6 6.2 3.6 6.2h2.2v-3.1s-.1-3.6 3.6-3.6h6.2s3.5-.1 3.5-3.5V6.4s.5-2.9-5.7-2.9zm-3.6 2.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"
              fill="#387EB8"
            />
            <path
              d="M18.6 32.5c6.8 0 6.4-2.9 6.4-2.9l-.01-3.1h-6.6v-.9h9.4s4.2-.4 4.2-6.4-3.6-6.2-3.6-6.2h-2.2v3.1s.1 3.6-3.6 3.6h-6.2s-3.5.1-3.5 3.5v6.4s-.5 2.9 5.7 2.9zm3.6-2.1a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z"
              fill="#FFE052"
            />
          </svg>
        </span>
      );

    case "HTML":
      return (
        <span className="technology-logo brand-html" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <path d="M4.5 3.5l2.5 28.5 11 3 11-3 2.5-28.5H4.5z" fill="#E44D26" />
            <path d="M18 6v26.5l8.8-2.4 2-24.1H18z" fill="#F16529" />
            <path d="M18 13.5h5.4l-.4 4.5H18v3.5h4.6l-.6 6.5-4 1.1v3.7l7.4-2 1-11.7H18v-5.6z" fill="#EBEBEB" />
            <path d="M18 13.5H9.6l.3 3.6h8.1v-3.6zm0 8H13.2l.3 3.6H18v-3.6zm0 4.6l-3.8-1-.3-3.2h-3.6l.5 6 7.2 2v-3.8z" fill="#FFFFFF" />
          </svg>
        </span>
      );

    case "CSS":
      return (
        <span className="technology-logo brand-css" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <path d="M4.5 3.5l2.5 28.5 11 3 11-3 2.5-28.5H4.5z" fill="#1572B6" />
            <path d="M18 6v26.5l8.8-2.4 2-24.1H18z" fill="#33A9DC" />
            <path d="M18 13.5h5.4l-.4 4.5H18v3.5h4.6l-.6 6.5-4 1.1v3.7l7.4-2 1-11.7H18v-5.6z" fill="#EBEBEB" />
            <path d="M18 13.5H9.6l.3 3.6h8.1v-3.6zm0 8H13.2l.3 3.6H18v-3.6zm0 4.6l-3.8-1-.3-3.2h-3.6l.5 6 7.2 2v-3.8z" fill="#FFFFFF" />
          </svg>
        </span>
      );

    case "Tailwind CSS":
      return (
        <span className="technology-logo brand-tailwind" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <path
              d="M18 9c-4.8 0-7.8 2.4-9 7.2 1.8-2.4 3.9-3.3 6.3-2.7 1.4.3 2.3 1.3 3.4 2.4C20.5 17.6 22.8 20 28 20c4.8 0 7.8-2.4 9-7.2-1.8 2.4-3.9 3.3-6.3 2.7-1.4-.3-2.3-1.3-3.4-2.4C25.5 11.4 23.2 9 18 9zm-10 10c-4.8 0-7.8 2.4-9 7.2 1.8-2.4 3.9-3.3 6.3-2.7 1.4.3 2.3 1.3 3.4 2.4C10.5 27.6 12.8 30 18 30c4.8 0 7.8-2.4 9-7.2-1.8 2.4-3.9 3.3-6.3 2.7-1.4-.3-2.3-1.3-3.4-2.4C15.5 21.4 13.2 19 8 19z"
              fill="#38BDF8"
            />
          </svg>
        </span>
      );

    case "Next.js":
      return (
        <span className="technology-logo brand-nextjs" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="17" fill="#000000" stroke="#333333" strokeWidth="1.5" />
            <path
              d="M23.8 25.4L13.5 12h-2.5v12h2.5v-7.8l9.1 11.8c.4-.2.8-.4 1.2-.6zM22.5 12h2.5v7.2l-2.5-3.3V12z"
              fill="#FFFFFF"
            />
          </svg>
        </span>
      );

    case "Vite":
      return (
        <span className="technology-logo brand-vite" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <defs>
              <linearGradient id="viteGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#41D1FF" />
                <stop offset="100%" stopColor="#BD34FE" />
              </linearGradient>
              <linearGradient id="viteGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFEA83" />
                <stop offset="100%" stopColor="#FFDD35" />
              </linearGradient>
            </defs>
            <path d="M31.2 5.8L18.7 32.8c-.3.7-1.3.7-1.6 0L4.8 5.8c-.4-.9.3-1.8 1.3-1.6l12 1.9L29.9 4.2c1-.2 1.7.7 1.3 1.6z" fill="url(#viteGrad1)" />
            <path d="M21.5 4.5l-9.8 1.6 2.4 9.8 4.2-.7-3.8 9.2 11.8-13.6-4.9.8.1-7.1z" fill="url(#viteGrad2)" />
          </svg>
        </span>
      );

    case "Node.js":
      return (
        <span className="technology-logo brand-nodejs" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <path d="M18 3.5l12.5 7.2v14.6L18 32.5 5.5 25.3V10.7L18 3.5z" fill="#539E43" />
            <path d="M18 6.5l9.9 5.7v11.6L18 29.5 8.1 23.8V12.2L18 6.5z" fill="#333333" />
            <path d="M18 11.5l5.2 3v6l-5.2 3-5.2-3v-6l5.2-3z" fill="#68A063" />
            <circle cx="18" cy="17.5" r="2.5" fill="#FFFFFF" />
          </svg>
        </span>
      );

    case "Express":
      return (
        <span className="technology-logo brand-express" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <rect width="36" height="36" rx="6" fill="#1C1F26" stroke="#374151" strokeWidth="1" />
            <text x="5" y="24" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="800" fill="#E2E8F0" letterSpacing="-0.5">ex</text>
            <circle cx="28" cy="21" r="2.5" fill="#3B82F6" />
          </svg>
        </span>
      );

    case "FastAPI":
      return (
        <span className="technology-logo brand-fastapi" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" fill="#05998B" />
            <path d="M19 6L9 20h7l-2 10 11-15h-8l3-9z" fill="#FFFFFF" />
          </svg>
        </span>
      );

    case "SQL":
      return (
        <span className="technology-logo brand-sql" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none" stroke="currentColor">
            <ellipse cx="18" cy="8" rx="12" ry="4.5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.8" />
            <path d="M6 8v7c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V8" stroke="#38BDF8" strokeWidth="1.8" />
            <path d="M6 15v7c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5v-7" stroke="#38BDF8" strokeWidth="1.8" />
            <path d="M6 22v6c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5v-6" stroke="#60A5FA" strokeWidth="1.8" />
          </svg>
        </span>
      );

    case "PostgreSQL":
      return (
        <span className="technology-logo brand-postgres" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <path
              d="M18.2 4C11.5 4 6 9.4 6 16.2c0 4.8 2.8 9 6.8 11.1l-.8 4.2 4.8-2.5c.5.1 1 .1 1.4.1 6.7 0 12.2-5.5 12.2-12.3C30.4 9.4 25 4 18.2 4zm5.5 12.8c-.3 1.8-1.5 3.3-3.2 4.1-.7.3-1.6.5-2.5.5-.6 0-1.2-.1-1.8-.3-.8-.3-1.5-.7-2-1.3-.4-.5-.7-1.1-.9-1.8-.2-.8-.2-1.7 0-2.5.3-.9.7-1.6 1.4-2.2.8-.7 1.8-1 2.8-1 .9 0 1.8.3 2.5.8.8.6 1.3 1.3 1.6 2.2.2.5.3 1 .3 1.5z"
              fill="#336791"
            />
            <path d="M20.5 14.5c.5.5.8 1.2.8 1.9 0 .8-.3 1.5-.8 2-.6.5-1.3.8-2.1.8-.8 0-1.5-.3-2.1-.8-.5-.5-.8-1.2-.8-2 0-.7.3-1.4.8-1.9.6-.5 1.3-.8 2.1-.8.8 0 1.5.3 2.1.8z" fill="#68A0D8" />
          </svg>
        </span>
      );

    case "Prisma":
      return (
        <span className="technology-logo brand-prisma" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <path d="M19.8 4.8L6.4 26.6c-.6 1 .1 2.3 1.3 2.3h22.8c1.1 0 1.8-1.2 1.3-2.2L22.3 4.8c-.5-.9-1.9-.9-2.5 0z" fill="#16A34A" />
            <path d="M21.1 4.8l9.5 21.9c.5 1-.2 2.2-1.3 2.2H18L21.1 4.8z" fill="#22C55E" />
            <path d="M19.8 4.8L6.4 26.6c-.6 1 .1 2.3 1.3 2.3H18L19.8 4.8z" fill="#15803D" />
          </svg>
        </span>
      );

    case "PostGIS":
      return (
        <span className="technology-logo brand-postgis" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="14" stroke="#10B981" strokeWidth="2" fill="#064E3B" fillOpacity="0.4" />
            <ellipse cx="18" cy="18" rx="6" ry="14" stroke="#10B981" strokeWidth="1.5" />
            <line x1="4" y1="18" x2="32" y2="18" stroke="#10B981" strokeWidth="1.5" />
            <line x1="8" y1="10" x2="28" y2="10" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="8" y1="26" x2="28" y2="26" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="18" cy="14" r="3" fill="#38BDF8" />
          </svg>
        </span>
      );

    case "Zod":
      return (
        <span className="technology-logo brand-zod" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <rect width="36" height="36" rx="8" fill="#3068B7" />
            <path
              d="M10 11h16l-9 11h9v3.5H9l9.2-11H10V11z"
              fill="#FFFFFF"
            />
          </svg>
        </span>
      );

    case "REST APIs":
      return (
        <span className="technology-logo brand-rest-api" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none" stroke="#60A5FA" strokeWidth="2">
            <rect x="5" y="8" width="8" height="6" rx="1.5" fill="#1E293B" />
            <rect x="23" y="8" width="8" height="6" rx="1.5" fill="#1E293B" />
            <rect x="14" y="22" width="8" height="6" rx="1.5" fill="#3B82F6" stroke="#93C5FD" />
            <path d="M9 14v4a2 2 0 002 2h7m9-6v4a2 2 0 01-2 2h-7m0 0v2" />
          </svg>
        </span>
      );

    case "WebSockets":
      return (
        <span className="technology-logo brand-websockets" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none" stroke="#A78BFA" strokeWidth="2">
            <circle cx="18" cy="18" r="14" stroke="#8B5CF6" strokeDasharray="3 3" />
            <path d="M12 15l-4 3 4 3m12-6l4 3-4 3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 11l4 14" stroke="#DDD6FE" strokeLinecap="round" />
          </svg>
        </span>
      );

    case "Authentication":
      return (
        <span className="technology-logo brand-auth" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none">
            <path d="M18 4l12 4.5v9c0 7.5-5.2 13.5-12 15-6.8-1.5-12-7.5-12-15v-9L18 4z" fill="#1E293B" stroke="#6366F1" strokeWidth="2" />
            <circle cx="18" cy="15" r="3" fill="#818CF8" />
            <path d="M18 18v5m-2 0h4" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      );

    case "Data analysis":
      return (
        <span className="technology-logo brand-data" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none">
            <rect x="6" y="20" width="5" height="11" rx="1" fill="#3B82F6" />
            <rect x="13" y="14" width="5" height="17" rx="1" fill="#60A5FA" />
            <rect x="20" y="9" width="5" height="22" rx="1" fill="#93C5FD" />
            <rect x="27" y="17" width="5" height="14" rx="1" fill="#3B82F6" />
            <path d="M6 16l8-6 7 5 9-9" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="30" cy="6" r="2.2" fill="#F59E0B" />
          </svg>
        </span>
      );

    case "Google OAuth":
      return (
        <span className="technology-logo brand-google" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <path d="M30.6 18.4c0-.9-.1-1.8-.3-2.6H18v5.1h7.1c-.3 1.7-1.2 3.1-2.7 4.1v3.4h4.4c2.6-2.4 3.8-6 3.8-10z" fill="#4285F4" />
            <path d="M18 31c3.6 0 6.6-1.2 8.8-3.2l-4.4-3.4c-1.2.8-2.7 1.3-4.4 1.3-3.4 0-6.3-2.3-7.3-5.4H6.2v3.5C8.4 28.2 12.9 31 18 31z" fill="#34A853" />
            <path d="M10.7 20.3c-.3-.8-.4-1.6-.4-2.3s.1-1.5.4-2.3V12.2H6.2C5.3 14 4.8 16 4.8 18s.5 4 1.4 5.8l4.5-3.5z" fill="#FBBC05" />
            <path d="M18 9.3c2 0 3.7.7 5.1 2l3.8-3.8C24.6 5.3 21.6 4 18 4 12.9 4 8.4 6.8 6.2 11.2l4.5 3.5c1-3.1 3.9-5.4 7.3-5.4z" fill="#EA4335" />
          </svg>
        </span>
      );

    case "Payment webhooks":
      return (
        <span className="technology-logo brand-webhooks" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none" stroke="#10B981" strokeWidth="2">
            <rect x="7" y="10" width="22" height="16" rx="3" fill="#13231D" />
            <path d="M7 15h22" strokeWidth="1.5" />
            <circle cx="12" cy="20" r="1.5" fill="#10B981" />
            <path d="M18 20h6" strokeLinecap="round" />
            <path d="M22 6v4m-8-4v4" strokeLinecap="round" />
          </svg>
        </span>
      );

    case "Razorpay Sandbox":
      return (
        <span className="technology-logo brand-razorpay" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <rect width="36" height="36" rx="7" fill="#0C2340" />
            <path d="M14.5 7.5L8 28.5h6l3.5-11 5.5 11h6.5l-8-15c2.5-.8 4.2-2.8 4.2-5.5 0-3.3-2.5-5.5-6.5-5.5h-4.7zm5.5 6h-2.5l1.6-4.5h2c1.2 0 2 .6 2 1.8 0 1.5-.9 2.7-3.1 2.7z" fill="#0284C7" />
          </svg>
        </span>
      );

    case "PayPal Sandbox":
      return (
        <span className="technology-logo brand-paypal" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <path d="M11 6h8c3.5 0 6 2 5.5 5.5-.6 4-3.5 6-7 6h-2.8l-1.8 11.5H8.5L11 6z" fill="#003087" />
            <path d="M15.5 12h7.5c3.2 0 5.5 1.8 5 5-.6 3.8-3.2 5.5-6.5 5.5h-2.5l-1.5 8.5H13l2.5-19z" fill="#0079C1" fillOpacity="0.9" />
          </svg>
        </span>
      );

    case "Groq":
      return (
        <span className="technology-logo brand-groq" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <rect width="36" height="36" rx="8" fill="#1A1817" stroke="#F55036" strokeWidth="1.2" />
            <path d="M18 9c-5 0-9 4-9 9s4 9 9 9c3.2 0 6-1.7 7.5-4.2l-3.2-1.9c-.9 1.5-2.5 2.5-4.3 2.5-2.8 0-5.1-2.3-5.1-5.1s2.3-5.1 5.1-5.1c2 0 3.8 1.2 4.6 2.9h-5.6v3.6H27V18C27 13 23 9 18 9z" fill="#F55036" />
          </svg>
        </span>
      );

    case "Gemini":
      return (
        <span className="technology-logo brand-gemini" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <defs>
              <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1BA0F2" />
                <stop offset="50%" stopColor="#8E75FF" />
                <stop offset="100%" stopColor="#D96570" />
              </linearGradient>
            </defs>
            <path
              d="M18 3c0 8.3 6.7 15 15 15-8.3 0-15 6.7-15 15 0-8.3-6.7-15-15-15 8.3 0 15-6.7 15-15z"
              fill="url(#geminiGrad)"
            />
          </svg>
        </span>
      );

    case "Sarvam AI":
      return (
        <span className="technology-logo brand-sarvam" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" fill="#181310" stroke="#F97316" strokeWidth="1.5" />
            <path d="M18 8l7 12h-6l3 8-11-13h6l-3-7z" fill="#F97316" />
          </svg>
        </span>
      );

    case "OpenRouter":
      return (
        <span className="technology-logo brand-openrouter" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none" stroke="#A855F7" strokeWidth="2">
            <circle cx="18" cy="18" r="6" fill="#6B21A8" fillOpacity="0.4" />
            <circle cx="8" cy="18" r="3" fill="#A855F7" />
            <circle cx="28" cy="18" r="3" fill="#A855F7" />
            <circle cx="18" cy="8" r="3" fill="#A855F7" />
            <circle cx="18" cy="28" r="3" fill="#A855F7" />
            <path d="M11 18h4m6 0h4M18 11v4m0 6v4" strokeLinecap="round" />
          </svg>
        </span>
      );

    case "Git":
      return (
        <span className="technology-logo brand-git" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <path
              d="M32.8 16.5L19.5 3.2c-.8-.8-2.2-.8-3 0l-3.2 3.2 4.1 4.1c.9-.3 2 .1 2.6.7.7.7.9 1.8.6 2.7l3.9 3.9c.9-.3 2 .1 2.6.7 1 1 1 2.6 0 3.6-1 1-2.6 1-3.6 0-.8-.8-.9-2-.4-2.9l-3.7-3.7v9.4c.3.2.6.5.7.8 1 1 1 2.6 0 3.6-1 1-2.6 1-3.6 0-1-1-1-2.6 0-3.6.3-.3.6-.6.9-.7V14.6c-.3-.2-.6-.4-.9-.7-.8-.8-.9-2-.4-2.9L9.4 6.8 3.2 13c-.8.8-.8 2.2 0 3l13.3 13.3c.8.8 2.2.8 3 0l13.3-13.3c.9-.8.9-2.1 0-2.9z"
              fill="#F05032"
            />
          </svg>
        </span>
      );

    case "GitHub":
      return (
        <span className="technology-logo brand-github" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              fill="#181717"
              d="M12 .9a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.14.69-3.8-1.33-3.8-1.33-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.97 2.1 3.13 1.5.1-.72.4-1.2.72-1.48-2.5-.28-5.14-1.25-5.14-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.65 5.28-5.17 5.56.4.35.76 1.04.76 2.1v3.1c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .9Z"
            />
          </svg>
        </span>
      );

    case "Vercel":
      return (
        <span className="technology-logo brand-vercel" aria-hidden="true">
          <svg viewBox="0 0 36 36">
            <path d="M18 6L32 30H4L18 6z" fill="#000000" />
          </svg>
        </span>
      );

    default:
      return (
        <span className="technology-logo technology-fallback" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none" stroke="currentColor">
            <circle cx="18" cy="18" r="14" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="18" y="22" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="700">
              {name.slice(0, 3).toUpperCase()}
            </text>
          </svg>
        </span>
      );
  }
}
