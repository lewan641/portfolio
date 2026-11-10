import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-plex", weight: ["400", "500", "600"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-plex-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-ruddy-one-25.vercel.app"),
  title: "Lewan Hassan — Full-Stack Developer",
  description:
    "Full-stack developer (ASP.NET Core, Next.js, PostgreSQL) from Kurdistan. Creator of KOGA, a retail ERP & POS system used daily by a 2-branch business.",
  openGraph: {
    title: "Lewan Hassan — Full-Stack Developer",
    description: "ASP.NET Core · Next.js · PostgreSQL. Creator of KOGA, a retail ERP & POS system in daily production use.",
    images: ["/shots/koga-dashboard.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#daf1de" },
    { media: "(prefers-color-scheme: dark)", color: "#051f20" },
  ],
};

// Runs before the first paint: if the visitor chose a theme earlier, apply it now
// so the page never flashes the other one. No choice = follow the system (CSS does that).
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <noscript><style>{"[data-loader]{display:none}"}</style></noscript>
        {children}
      </body>
    </html>
  );
}
