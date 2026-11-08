// All site content lives here, so updating the portfolio means editing this file only.

export const profile = {
  name: "Lewan Hassan",
  role: "Full-Stack Developer",
  stack: "ASP.NET Core · Next.js · PostgreSQL",
  location: "Qaladze, Sulaymaniyah — Kurdistan Region, Iraq",
  email: "lewanhassan641@gmail.com",
  phone: "+964 751 768 7632",
  phoneHref: "tel:+9647517687632",
  whatsapp: "https://wa.me/9647517687632",
  github: "https://github.com/lewan641",
  linkedin: "https://www.linkedin.com/in/lewan-hassan-298087396",
  cv: "/Lewan_Hassan_CV.pdf",
  intro:
    "I build complete products on my own — database, API, interface, tests and deployment — and I run them in the real world. My retail system KOGA handles daily sales, stock and accounting for a business with 2 branches and 10+ staff.",
};

export const stats = [
  { value: "2", label: "store branches running on KOGA" },
  { value: "10+", label: "people using it every day" },
  { value: "1,100+", label: "commits on KOGA" },
  { value: "105", label: "automated test suites" },
];

export type Shot = { src: string; alt: string; mobile?: boolean };

export const koga = {
  name: "KOGA",
  tagline: "Retail ERP & point-of-sale system",
  period: "Jan 2026 — Present",
  context: "Built for and used daily at Abdulla Barza Store, Qaladze",
  summary:
    "A complete system for running a wholesale & retail business: sales, stock across branches, purchasing, suppliers, field sales reps, cash and reports — in a fully right-to-left Sorani Kurdish interface. I designed it, built every part of it, and use it in my own store.",
  problem:
    "Ready-made systems didn't fit how stores here actually work: a Kurdish right-to-left interface, goods sold by carton, pack or piece, field sales reps taking orders on the road, and an internet connection that can't be trusted. So I built one that does.",
  highlights: [
    {
      title: "Offline-first point of sale",
      text: "Sales are saved in the browser (IndexedDB) and replayed through a sync queue with idempotency keys, so a lost connection never loses or duplicates a sale. Works with barcode scanners, label and receipt printers.",
    },
    {
      title: "Real retail rules",
      text: "Multi-branch stock and transfers, carton › pack › piece units, weighted products, price tiers, purchase orders, supplier invoices & claims, expiry tracking, stock counts and daily cash close.",
    },
    {
      title: "Field-sales module",
      text: "A mobile app for sales reps: customer visits, route and order maps, returns, customer statements, debt reminders, commission & pay calculation, and Telegram alerts for new orders.",
    },
    {
      title: "Every change is accounted for",
      text: "EF Core interceptors write a full audit log and an append-only stock ledger; a background worker processes stock updates. Fine-grained permissions per role and per user.",
    },
    {
      title: "Business insight",
      text: "Revenue vs. profit, margins, customer segments, best sellers, daily reports and automatic reorder suggestions — with Excel and PDF export.",
    },
    {
      title: "Tested and shipped like a team product",
      text: "53 API integration suites against a real PostgreSQL database and 52 Playwright browser suites run on every pull request. Merges deploy automatically to Cloudflare Pages and Render.",
    },
  ],
  numbers: [
    { value: "47", label: "API controllers" },
    { value: "~110k", label: "lines of C# & TypeScript" },
    { value: "290+", label: "database migrations" },
    { value: "340+", label: "merged pull requests" },
  ],
  tech: ["C#", "ASP.NET Core 8", "EF Core", "PostgreSQL", "JWT", "Next.js 16", "React 19", "TypeScript", "Zustand", "Dexie (IndexedDB)", "TailwindCSS", "DaisyUI", "Leaflet", "Playwright", "GitHub Actions", "Docker", "Render", "Cloudflare Pages"],
  desktop: [
    { src: "/shots/koga-dashboard.webp", alt: "KOGA owner dashboard — daily revenue, profit, debts and stock value per branch" },
    { src: "/shots/koga-analytics.webp", alt: "Analytics — revenue, gross profit, best seller and low-stock warnings" },
    { src: "/shots/koga-pos.webp", alt: "Point of sale — product grid with barcode search and cart" },
    { src: "/shots/koga-daily-report.webp", alt: "Daily movement report — cash in the drawer, net and gross profit" },
    { src: "/shots/koga-sales.webp", alt: "Sales history — filters, payment status and customer details" },
    { src: "/shots/koga-reorder.webp", alt: "Purchase list — reorder suggestions by supplier based on sales speed" },
  ] as Shot[],
  mobile: [
    { src: "/shots/koga-m-dashboard.webp", alt: "Sales rep dashboard — cash on hand, today's sales and commission plan", mobile: true },
    { src: "/shots/koga-m-sales.webp", alt: "Sales rep ordering screen", mobile: true },
    { src: "/shots/koga-m-analysis.webp", alt: "Sales rep weekly analysis compared to the previous week", mobile: true },
  ] as Shot[],
  note: "Screenshots use demo data — the real store's data is private.",
};

export type Project = {
  name: string;
  tagline: string;
  kind: string;
  period: string;
  text: string;
  points: string[];
  tech: string[];
  shots?: Shot[];
  link?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    name: "Xanchy",
    tagline: "Online ticket booking platform",
    kind: "University research project · Salahaddin University",
    period: "Nov 2025 — Apr 2026",
    text: "A ticketing platform for concerts, events and sports in Kurdistan, with separate experiences for customers, organizers and admins.",
    points: [
      "Interactive SVG seat map with zoom & pan and timed seat holds with a live countdown",
      "Background service releases expired holds, so a seat can never be sold twice",
      "Organizer finance dashboard with Excel export, promo codes, ticket tiers and venues",
      "JWT auth, Web Push notifications and scheduled event reminders",
    ],
    tech: ["ASP.NET Core 8", "EF Core", "PostgreSQL", "Next.js 16", "React 19", "TailwindCSS", "GSAP", "Docker", "Vercel", "Render"],
  },
  {
    name: "Fast Pizza Qaladze",
    tagline: "QR table ordering for a restaurant",
    kind: "Freelance · client project",
    period: "2025 — 2026",
    text: "Started as a digital menu website for the restaurant, then grew into a full ordering system: customers scan the QR code on their table, browse the menu and order — no app, no account. Orders appear instantly on the kitchen screen with the table number.",
    points: [
      "Live kitchen screen with Supabase Realtime",
      "Row-Level Security so the public key can only do what customers are allowed to do",
      "Admin panel for prices, tables and printable QR codes; installable as a PWA",
      "Delivered in under a week",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Supabase", "PostgreSQL", "RLS", "PWA"],
    shots: [
      { src: "/shots/pizza-home.webp", alt: "Fast Pizza menu — landing screen", mobile: true },
      { src: "/shots/pizza-menu.webp", alt: "Fast Pizza menu — prices by size", mobile: true },
      { src: "/shots/pizza-kitchen.webp", alt: "Kitchen screen sign-in", mobile: true },
    ],
  },
  {
    name: "Ashty Market",
    tagline: "Supplier & transaction tracker",
    kind: "Freelance · client project",
    period: "Jan — Feb 2026",
    text: "A mobile-first app for a local market to record supplier purchases and payments and see what is owed to whom.",
    points: [
      "ASP.NET Core API with Identity + JWT and PostgreSQL",
      "Next.js PWA with photo upload and automatic HEIC → JPEG conversion for iPhone pictures",
    ],
    tech: ["ASP.NET Core", "Identity", "PostgreSQL", "Next.js", "PWA"],
  },
  {
    name: "Exchange Rate Board",
    tagline: "Price board for a currency exchange office",
    kind: "Freelance · client project",
    period: "2025",
    text: "The office updates currency, gold and silver prices from a phone and exports a ready-to-post image for social media in one tap.",
    points: ["Mobile-friendly editing", "One-tap image export"],
    tech: ["React", "HTML", "CSS"],
    link: { href: "https://creative-fenglisu-045c0d.netlify.app/", label: "Open live site" },
  },
];

export const skills = [
  { group: "Backend", items: ["C#", "ASP.NET Core 8", "Entity Framework Core", "REST API design", "JWT & role-based auth", "Background services", "Idempotent APIs"] },
  { group: "Frontend", items: ["TypeScript", "React 19", "Next.js 16", "Zustand", "TailwindCSS", "DaisyUI", "PWA & offline-first", "RTL interfaces"] },
  { group: "Data", items: ["PostgreSQL", "Supabase", "SQL Server", "MySQL", "SQLite", "IndexedDB", "Schema design & migrations"] },
  { group: "Quality & DevOps", items: ["Playwright", "API integration tests", "GitHub Actions CI/CD", "Docker", "Git", "Render", "Vercel", "Cloudflare Pages", "Netlify"] },
];

export const timeline = [
  { when: "2026 — Present", title: "Founder & Full-Stack Developer — KOGA", where: "Abdulla Barza Store, Qaladze" },
  { when: "2025 — Present", title: "Freelance Web Developer", where: "Local businesses in Qaladze" },
  { when: "2025 — 2026", title: "Research project — Xanchy", where: "Salahaddin University – Erbil" },
  { when: "2026", title: "B.Sc. Computer Science & IT", where: "Salahaddin University – Erbil" },
];

export const languages = [
  { name: "Kurdish", level: "Native" },
  { name: "English", level: "Professional working" },
  { name: "Arabic", level: "Basic" },
];
