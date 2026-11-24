export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  cover: string;
  coverRatio: number;
  alt: string;
  stack: string[];
  role?: string[];
  repository?: string;
  live?: string;
  demo?: string;
  apiDocs?: string;
  overview: string;
  problem: string;
  solution: string;
  workflow: string[];
  features: string[];
  challenges: string[];
  notes: string[];
  gallery: { src: string; alt: string; caption: string }[];
  riskFactors?: { name: string; weight: string }[];
};

export const projects: Project[] = [
  {
    slug: "deallens", title: "DealLens", category: "Full-stack product", summary: "Compare agreement revisions, surface meaningful changes, and prepare a clearer next step.",
    cover: "/images/projects/deallens/cover.png", coverRatio: 1900 / 907, alt: "DealLens application dashboard showing deal and document analysis", stack: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "Groq", "Zod"],
    role: ["Team Lead", "System Design", "Backend", "Database Management"], repository: "https://github.com/aryan24cse109-dev/DealLens", live: "https://deal-lens-ten.vercel.app", demo: "https://youtu.be/XoIwsZcT97A",
    overview: "DealLens is a document comparison and change-analysis application for business agreements. It brings deterministic comparison, rule-based classification, AI-assisted interpretation, and communication drafts into one review workflow.",
    problem: "When a revised agreement arrives as a complete document, locating small changes across long PDFs can take time and make it easy to overlook wording that deserves a closer read.",
    solution: "The application extracts text from original and revised PDFs, finds added, removed, and modified content deterministically, then asks an AI service to interpret the changes already identified.",
    workflow: ["Upload original and revised PDFs", "Extract text and compare document content", "Classify changes with rules and severity", "Request bounded AI interpretation of detected changes", "Validate structured output and change ID coverage", "Review findings and export or draft communication"],
    features: ["Google OAuth and owner-scoped resources", "PDF upload and text extraction", "Deterministic document comparison", "Rule-based categories and severity", "Validated AI impact assessment", "Editable client clarification drafts", "PDF, text, and JSON reports"],
    challenges: ["Separating deterministic change detection from AI interpretation", "Rejecting incomplete or mismatched structured responses", "Saving only a complete assessment set"],
    notes: ["AI interprets detected changes; it does not independently verify an entire contract.", "AI output is not legal advice or a guarantee of factual accuracy. Important decisions require qualified human review."],
    gallery: [
      { src: "/images/projects/deallens/comparison - analysis.png", alt: "DealLens document comparison and analysis view", caption: "Review detected changes and their analysis." },
      { src: "/images/projects/deallens/communication.png", alt: "DealLens professional communication draft", caption: "Prepare an editable clarification draft." },
    ],
  },
  {
    slug: "wealthra-ai", title: "Wealthra AI", category: "Business platform", summary: "Invoicing, client communication, and receivables workflows for a business workspace.",
    cover: "/images/projects/wealthra/dashboard.png", coverRatio: 1902 / 858, alt: "Wealthra business workspace dashboard with invoice and receivables panels", stack: ["React", "Express 5", "PostgreSQL", "Prisma", "WebSockets", "PDFKit", "Razorpay Sandbox"],
    role: ["Team Lead", "System Design", "Backend", "Database Management"], repository: "https://github.com/aryan24cse109-dev/Wealthra-ai", live: "https://wealthra-ai.vercel.app", demo: "https://youtu.be/mG45OiztM1I",
    overview: "Wealthra AI is a business finance and invoice-management platform for managing clients, invoices, collections, and communication from a shared workspace.",
    problem: "Small teams often handle client context, invoices, payment follow-up, and messages across separate tools and workflows.",
    solution: "Wealthra brings business and client roles, invoice lifecycle management, messaging, receivables analytics, and an AI assistant into a single application.",
    workflow: ["Create a business workspace and connect clients", "Create and manage invoices through their lifecycle", "Generate invoice PDFs and QR-based payment workflows", "Process verified payment webhooks idempotently", "Coordinate through client messaging and dashboards"],
    features: ["Business and client roles", "Invoice lifecycle and PDF generation", "QR-based payment workflow", "Signed payment webhook verification and idempotency", "Client-business messaging with WebSockets", "Collections and receivables analytics", "Hindi/Hinglish text and voice workflows"],
    challenges: ["Validating webhook signatures and preventing duplicate processing", "Maintaining exact monetary arithmetic", "Coordinating real-time messaging with role and ownership checks"],
    notes: ["Payment integrations are sandbox workflows; the portfolio does not claim real-money processing or bank connectivity.", "Dashboard values in screenshots are illustrative product UI, not verified financial results."],
    gallery: [
      { src: "/images/projects/wealthra/invoice.png", alt: "Wealthra invoice details view", caption: "Invoice lifecycle and document view." },
      { src: "/images/projects/wealthra/payment.png", alt: "Wealthra payment workflow screen", caption: "Sandbox payment flow presentation." },
      { src: "/images/projects/wealthra/client-message.png", alt: "Wealthra client and business messaging interface", caption: "Client-business communication." },
      { src: "/images/projects/wealthra/analytics.png", alt: "Wealthra receivables analytics screen", caption: "Receivables and collections analytics." },
      { src: "/images/projects/wealthra/ai-assistant.png", alt: "Wealthra AI assistant interface", caption: "Multilingual assistant workflow." },
    ],
  },
  {
    slug: "intelliland-ai", title: "IntelliLandAI", category: "Document workflow prototype", summary: "Turn scanned land records into structured fields for human review and GIS parcel linking.",
    cover: "/images/projects/intelliland/Dashboard.png", coverRatio: 1917 / 920, alt: "IntelliLandAI workspace dashboard", stack: ["React", "FastAPI", "Python", "PaddleOCR", "PostgreSQL", "PostGIS", "Leaflet"],
    role: ["Team Lead", "System Design", "Backend", "Database Management"], repository: "https://github.com/aryan24cse109-dev/intellilandAI", live: "https://intelliland-auvb9qa8u-bhumatrix.vercel.app/login", demo: "https://youtu.be/6ntKG6ohBbA",
    overview: "IntelliLandAI is a land-record processing prototype that combines OCR, structured extraction, discrepancy review, GIS parcel linking, and an audit trail.",
    problem: "Scanned records can be difficult to search and compare, and document fields need context before they can be connected to a mapped parcel.",
    solution: "The workflow extracts candidate fields from scanned documents, checks them against reference/demo data, routes discrepancies for human verification, and presents parcel context on a map.",
    workflow: ["Upload and preprocess a scanned record", "Deskew and perform OCR, including Hindi documents", "Use LLM-assisted structured extraction", "Normalize and compare fields with reference/demo data", "Route discrepancies to a human reviewer", "Link records to GIS parcel information and record audit history"],
    features: ["Scanned document processing", "Hindi OCR workflow", "Structured extraction and normalization", "Discrepancy review", "GIS parcel map", "Audit history"],
    challenges: ["Handling scan quality and OCR uncertainty", "Separating extracted suggestions from human-verified values", "Connecting document fields with GIS context"],
    notes: ["Prototype uses synthetic/demo data and is not connected to official government databases.", "It does not determine legal ownership or replace authorized verification; human review is required."],
    gallery: [
      { src: "/images/projects/intelliland/Document-Processing.png", alt: "IntelliLandAI document processing screen", caption: "Document processing workflow." },
      { src: "/images/projects/intelliland/Validation.png", alt: "IntelliLandAI validation review interface", caption: "Review extracted fields and discrepancies." },
      { src: "/images/projects/intelliland/GIS.png", alt: "IntelliLandAI GIS parcel view with synthetic demo parcel", caption: "Map view with synthetic/demo parcel information." },
      { src: "/images/projects/intelliland/audit-history.png", alt: "IntelliLandAI audit history screen", caption: "Audit history for workflow activity." },
    ],
  },
  {
    slug: "return-rate-reducer", title: "Return-Rate-Reducer", category: "Risk scoring application", summary: "Explore return-risk factors through a deterministic weighted scoring workflow.",
    cover: "", coverRatio: 2, alt: "", stack: ["Python", "FastAPI", "Streamlit", "HTML", "CSS"],
    repository: "https://github.com/aryan24cse109-dev/Return-Rate-Reducer", live: "https://aryan2323-return-rate-reducer.hf.space/dashboard", apiDocs: "https://aryan2323-return-rate-reducer.hf.space/docs",
    overview: "Return-Rate-Reducer is an application for reviewing product-return risk factors. Its live API uses a deterministic six-dimensional weighted ReturnRiskMatrix.",
    problem: "A single score can hide the different operational signals that contribute to a possible return.",
    solution: "The weighted matrix combines six dimensions and exposes factor-level context to help users understand the score drivers.",
    workflow: ["Provide order and customer signals", "Apply weighted factors: return history 25%, delivery 20%, quality 20%, payment 15%, pricing 10%, sentiment 10%", "Return a deterministic score and factor breakdown", "Review the dashboard with synthetic/demo data"],
    features: ["FastAPI endpoints and documentation", "Six-factor weighted risk matrix", "Factor-level scoring breakdown", "Streamlit dashboard for exploration"],
    challenges: ["Making each factor's contribution inspectable", "Keeping the live API behavior distinct from a separate model implementation"],
    notes: ["Dashboard data is synthetic/demo data.", "The score is not a calibrated probability; confidence is a heuristic based on data availability.", "A separate XGBoost/Gradient Boosting implementation is not used by the live API."],
    gallery: [],
    riskFactors: [
      { name: "Customer return history", weight: "25%" },
      { name: "Delivery experience", weight: "20%" },
      { name: "Product quality", weight: "20%" },
      { name: "Payment method", weight: "15%" },
      { name: "Pricing sensitivity", weight: "10%" },
      { name: "Review sentiment", weight: "10%" },
    ],
  },
  {
    slug: "open-source", title: "Open-source Contributions", category: "Collaborative engineering", summary: "Selected work on AlgoMate across application fixes, AI workflows, and developer tooling.",
    cover: "/images/projects/open-source/code-contributions.png", coverRatio: 1913 / 907, alt: "AlgoMate pull request page with a GitHub overview popover visible", stack: ["JavaScript", "React", "GitHub Actions", "AI integrations"],
    repository: "https://github.com/PankajSingh18/AlgoMate",
    overview: "Contributions to AlgoMate, an upstream open-source project. The work spans user-facing fixes, chatbot changes, search features, and repository automation.",
    problem: "Shared software projects need changes that fit existing behavior and can be reviewed and merged by maintainers.",
    solution: "Contribute focused fixes and features through pull requests, with each change reviewed in the upstream repository.",
    workflow: ["Identify an issue or improvement", "Develop a scoped change", "Submit a pull request to the upstream project", "Address review and integration needs"],
    features: ["Chatbot integration and streaming work", "Dashboard authentication redirect fix", "Search history and bookmarks", "Sandboxed JavaScript execution and rate limiting", "GitHub Actions assignment automation", "Algorithm navigation and count corrections"],
    challenges: ["Working within an existing project and review process", "Balancing user experience with safe code execution and rate limits"],
    notes: ["These are contributions to AlgoMate, not ownership or maintainership of the project.", "Linked pull-request titles and status labels are retrieved from the upstream GitHub API when available; an unavailable status is left unclaimed."],
    gallery: [
      { src: "/images/projects/open-source/pr-details.png", alt: "AlgoMate pull request detail page with GitHub's overview prompt overlay", caption: "Pull request detail view; a GitHub overview prompt is visible over the page." },
      { src: "/images/projects/open-source/merged-pr.png", alt: "AlgoMate commit history showing commits dated June 2, 2026", caption: "AlgoMate repository commit history, not a pull request overview." },
    ],
  },
];

export const contributions = [
  { number: 690, title: "Groq AI chatbot integration", category: "AI integration" },
  { number: 662, title: "Dashboard authentication redirect", category: "Authentication" },
  { number: 658, title: "Gemini chatbot production fix", category: "Reliability" },
  { number: 636, title: "AI chatbot rewrite and streaming", category: "AI integration" },
  { number: 601, title: "Sandboxed JavaScript execution and rate limiting", category: "Security" },
  { number: 592, title: "GitHub Actions auto-assignment bot", category: "Automation" },
  { number: 590, title: "Search history and bookmarks", category: "Product feature" },
  { number: 550, title: "Recently viewed algorithms", category: "Product feature" },
  { number: 528, title: "Merge Sort navigation fix", category: "Bug fix" },
  { number: 492, title: "Array algorithm count correction", category: "Bug fix" },
].map((item) => ({ ...item, url: `https://github.com/PankajSingh18/AlgoMate/pull/${item.number}` }));
