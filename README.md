# lewan.dev — Portfolio

Personal portfolio of **Lewan Hassan**, full-stack developer (ASP.NET Core · Next.js · PostgreSQL).

Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4, exported as a static site.

## Edit content
All text, projects, skills and screenshots are in [`lib/data.ts`](lib/data.ts).
Screenshots live in `public/shots/`, the CV in `public/Lewan_Hassan_CV.pdf`.

## Run locally
```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Build & deploy
```bash
pnpm build      # writes the static site to out/
```
On Vercel: import this repository — no settings needed.
On Cloudflare Pages / Netlify: build command `pnpm build`, output directory `out`.
