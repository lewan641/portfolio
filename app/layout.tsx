import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik", weight: ["500", "600", "700"] });

export const metadata: Metadata = {
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${rubik.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
