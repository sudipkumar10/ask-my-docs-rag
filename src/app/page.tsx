/* =================================================================
 * AskMyDocs — Landing Page (minimalist SaaS, single-file)
 * -----------------------------------------------------------------
 * Design language: Linear / Vercel / Resend / Cursor style.
 *   1. Centered hero, oversized type, product preview below
 *   2. Bento feature grid (varied cell sizes — not 6 equal cards)
 *   3. Quiet sections — thin dividers, generous whitespace
 *   4. Monochrome. One accent only where it matters.
 *
 * Base UI primitives: `render` prop, not `asChild`.
 * Accordion: `multiple={false}` for single-open.
 * ================================================================= */

"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Database,
  FileText,
  Menu,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModeToggle } from "@/components/mode-toggle"; // Import ModeToggle

/* =================================================================
 * Logo
 * ================================================================= */
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
        <BookOpen className="h-3.5 w-3.5" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        AskMyDocs
      </span>
    </Link>
  );
}

/* =================================================================
 * Navbar — thin, blurred
 * ================================================================= */
function Navbar() {
  const [open, setOpen] = React.useState(false);
  const links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle />
          <Button variant="ghost" size="sm" render={<Link href="/dashboard" />}>
            Dashboard
          </Button>
          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/auth/sign-in" />}
          >
            Sign in
          </Button>
          <Button size="sm" render={<Link href="/auth/sign-up" />}>
            Get started
          </Button>
        </div>

        {/* Mobile Right Side (Toggle + Hamburger) */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <button
            aria-label="Toggle menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="container flex flex-col gap-1 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <Button
              variant="outline"
              className="mt-2"
              render={<Link href="/dashboard" />}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Button>
            <Button
              variant="outline"
              className="mt-2"
              render={<Link href="/auth/sign-in" />}
              onClick={() => setOpen(false)}
            >
              Sign in
            </Button>
            <Button
              render={<Link href="/auth/sign-up" />}
              onClick={() => setOpen(false)}
            >
              Get started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

/* =================================================================
 * HERO — centered, huge type, product preview below
 * This is the single most important section. Everything else is
 * support for this moment.
 * ================================================================= */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle top gradient — barely visible, adds depth without a "blob" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(60%_50%_at_50%_0%,theme(colors.foreground/6%),transparent)]"
      />

      <div className="container pt-16 pb-12 md:pt-24 md:pb-16">
        {/* Centered copy — max-w-3xl keeps line lengths readable */}
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="#features"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-[12px] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <Sparkles className="h-3 w-3" />
            GPT-4o powered retrieval
            <ArrowRight className="h-3 w-3" />
          </Link>

          <h1 className="mt-6 text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-[4.5rem]">
            Ask your docs anything.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
            Turn every PDF, wiki, and Slack thread into a searchable knowledge
            base. Your team gets answers in seconds — with citations attached.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <Button
              size="lg"
              className="h-10 px-5 text-[13.5px]"
              render={<Link href="/auth/sign-up" />}
            >
              Start free trial
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-10 px-5 text-[13.5px]"
              render={<Link href="/contact" />}
            >
              Book a demo
            </Button>
          </div>

          <p className="mt-5 text-[12px] text-muted-foreground">
            14-day trial · No credit card · SOC 2 Type II
          </p>
        </div>

        {/* Product preview — this is what sells. Make it BIG. */}
        <ProductPreview />
      </div>
    </section>
  );
}

/* =================================================================
 * PRODUCT PREVIEW — the app mockup below the hero
 * Rendered as a full-width card with a subtle glow behind it.
 * ================================================================= */
function ProductPreview() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl md:mt-20">
      {/* Soft glow behind the preview */}
      <div
        aria-hidden
        className="absolute -inset-x-10 -inset-y-8 -z-10 bg-[radial-gradient(50%_60%_at_50%_50%,theme(colors.foreground/8%),transparent)] blur-2xl"
      />

      <div className="overflow-hidden rounded-xl border border-border/70 bg-background shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_60px_-20px_rgba(0,0,0,0.15)]">
        {/* App chrome */}
        <div className="flex items-center gap-2 border-b border-border/60 bg-muted/30 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>
          <div className="ml-2 flex h-5 flex-1 items-center rounded-md border border-border/60 bg-background px-2 text-[10px] text-muted-foreground/70">
            app.askmydocs.com/workspace/acme
          </div>
        </div>

        {/* Fake app body: sidebar + chat */}
        <div className="grid grid-cols-12 min-h-[380px] md:min-h-[440px]">
          {/* Sidebar (hidden on mobile) */}
          <aside className="col-span-3 hidden border-r border-border/60 bg-muted/20 p-4 md:block">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Sources
            </p>
            <ul className="space-y-1.5 text-[12px]">
              {[
                "Google Drive",
                "Notion",
                "Confluence",
                "Slack",
                "Enterprise_MSA.pdf",
                "Billing_Policy.md",
              ].map((s, i) => (
                <li
                  key={s}
                  className={
                    "flex items-center gap-2 rounded-md px-2 py-1.5 " +
                    (i === 0
                      ? "bg-background text-foreground"
                      : "text-muted-foreground")
                  }
                >
                  <FileText className="h-3 w-3 shrink-0" />
                  <span className="truncate">{s}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Chat area */}
          <div className="col-span-12 flex flex-col p-5 md:col-span-9 md:p-8">
            <div className="flex-1 space-y-5">
              {/* User question */}
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-3.5 py-2 text-[13px] text-background md:max-w-[70%]">
                  {`What's our refund policy for annual Enterprise plans?`}
                </div>
              </div>

              {/* AI answer */}
              <div className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
                  <Sparkles className="h-3 w-3" />
                </span>
                <div className="max-w-[92%] space-y-3 text-[13px] md:max-w-[80%]">
                  <p className="leading-relaxed">
                    Annual Enterprise plans are refundable within{" "}
                    <span className="font-medium text-foreground">30 days</span>{" "}
                    of purchase. After that, unused seats can be credited to
                    your next renewal.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: "Enterprise_MSA.pdf", page: "p.4" },
                      { name: "Billing_Policy.md", page: null },
                    ].map((c) => (
                      <span
                        key={c.name}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-[11px] text-muted-foreground"
                      >
                        <FileText className="h-2.5 w-2.5" />
                        {c.name}
                        {c.page && (
                          <span className="text-muted-foreground/60">
                            · {c.page}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Composer */}
            <div className="mt-6 flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[13px] text-muted-foreground">
                Ask a follow-up…
              </span>
              <kbd className="ml-auto rounded border border-border/60 bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =================================================================
 * LOGO STRIP — right under hero, quiet
 * ================================================================= */
function LogoStrip() {
  const companies = ["Northwind", "Acme", "Lumen", "Vercel", "Ramp", "Arc"];
  return (
    <section className="border-y border-border/60">
      <div className="container flex flex-col items-center gap-6 py-10 md:flex-row md:justify-between md:gap-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
          Trusted by 2,000+ teams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-end">
          {companies.map((c) => (
            <span
              key={c}
              className="text-[15px] font-medium tracking-tight text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
 * BENTO FEATURES — varied cell sizes.
 * Instead of 6 equal cards, we mix a big hero cell with smaller ones.
 * ================================================================= */
function BentoFeatures() {
  return (
    <section id="features" className="scroll-mt-20">
      <div className="container py-24 md:py-32">
        {/* Section header — centered, restrained */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
            Features
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            A retrieval engine built for real teams
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Everything you need to ship a production RAG experience — nothing
            you have to babysit.
          </p>
        </div>

        {/* Bento grid — 6 cols, mixed spans */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6">
          {/* Cell 1 — BIG: answers with citations */}
          <div className="md:col-span-4 md:row-span-2 flex flex-col justify-between gap-8 rounded-2xl border border-border/60 bg-muted/30 p-7 md:p-9">
            <div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-background text-foreground ring-1 ring-border/60">
                <MessageSquare className="h-4 w-4" />
              </span>
              <h3 className="mt-5 text-lg font-medium tracking-tight">
                Answers, not links
              </h3>
              <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted-foreground">
                Every answer is synthesised from your documents and returned
                with inline citations — so your team can verify the source in
                one click.
              </p>
            </div>

            {/* Inline mini-visual: a citation chip row */}
            <div className="flex flex-wrap gap-2">
              {[
                "Enterprise_MSA.pdf",
                "Billing_Policy.md",
                "Onboarding.docx",
              ].map((n) => (
                <span
                  key={n}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] text-muted-foreground"
                >
                  <FileText className="h-3 w-3" />
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Cell 2 — Speed */}
          <div className="md:col-span-2 flex flex-col justify-between gap-6 rounded-2xl border border-border/60 p-7">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60 text-foreground ring-1 ring-border/60">
              <Zap className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-medium tracking-tight">
                Sub-second retrieval
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                Hybrid search returns passages in milliseconds — even across
                millions of chunks.
              </p>
            </div>
          </div>

          {/* Cell 3 — Security */}
          <div className="md:col-span-2 flex flex-col justify-between gap-6 rounded-2xl border border-border/60 p-7">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60 text-foreground ring-1 ring-border/60">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-medium tracking-tight">
                Enterprise-grade security
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                SOC 2 Type II, SSO, role-based access, and per-workspace
                isolation.
              </p>
            </div>
          </div>

          {/* Cell 4 — wide: connectors */}
          <div className="md:col-span-3 flex flex-col justify-between gap-6 rounded-2xl border border-border/60 p-7">
            <div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60 text-foreground ring-1 ring-border/60">
                <Database className="h-4 w-4" />
              </span>
              <h3 className="mt-5 text-base font-medium tracking-tight">
                Connect any source
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                Drive, Notion, Confluence, Slack, SharePoint, S3, and plain PDFs
                — sync once, stay current.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Drive", "Notion", "Slack", "Confluence", "S3"].map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-border/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Cell 5 — wide: Slack / API */}
          <div className="md:col-span-3 flex flex-col justify-between gap-6 rounded-2xl border border-border/60 p-7">
            <div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60 text-foreground ring-1 ring-border/60">
                <Search className="h-4 w-4" />
              </span>
              <h3 className="mt-5 text-base font-medium tracking-tight">
                Works where you work
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                Drop-in Slack and Teams apps, a REST API, and an embeddable
                widget for any product.
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 font-mono text-[11px] text-muted-foreground">
              $ curl -X POST api.askmydocs.com/v1/ask
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================================================================
 * PRICING — clean 3 column, minimal
 * ================================================================= */
type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "For individuals trying RAG on their own docs.",
    features: [
      "Up to 200 documents",
      "1 workspace seat",
      "Slack integration",
      "Community support",
    ],
    cta: "Get started",
    href: "/auth/sign-up",
  },
  {
    name: "Growth",
    price: "$49",
    period: "/mo",
    description: "For teams that need shared knowledge and SSO.",
    features: [
      "Unlimited documents",
      "Up to 25 seats",
      "Slack, Teams & API",
      "SSO / SAML",
      "Priority support",
    ],
    cta: "Start free trial",
    href: "/auth/sign-up",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For orgs with compliance and scale needs.",
    features: [
      "Unlimited seats & workspaces",
      "Dedicated VPC deployment",
      "SOC 2 report & DPA",
      "Custom SLA & onboarding",
    ],
    cta: "Talk to sales",
    href: "/contact",
  },
];

function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-border/60 bg-muted/20"
    >
      <div className="container py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
            Pricing
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Simple pricing that scales
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Start free. Upgrade when you need seats, SSO, or a VPC.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={
                "relative flex flex-col rounded-2xl border p-7 transition-colors " +
                (p.highlighted
                  ? "border-foreground/25 bg-background shadow-[0_1px_2px_rgba(0,0,0,0.03),0_12px_40px_-12px_rgba(0,0,0,0.12)]"
                  : "border-border/60 bg-background/60")
              }
            >
              {p.highlighted && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full border border-border/60 bg-background px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Popular
                </span>
              )}

              <h3 className="text-[13px] font-medium text-muted-foreground">
                {p.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-[2.25rem] font-semibold tracking-[-0.02em]">
                  {p.price}
                </span>
                {p.period && (
                  <span className="text-[13px] text-muted-foreground">
                    {p.period}
                  </span>
                )}
              </div>
              <p className="mt-2 text-[13px] text-muted-foreground">
                {p.description}
              </p>

              <ul className="mt-7 mb-7 space-y-2.5 text-[13.5px]">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button
                  className="h-9 w-full text-[13px]"
                  variant={p.highlighted ? "default" : "outline"}
                  render={<Link href={p.href} />}
                >
                  {p.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
 * FAQ
 * ================================================================= */
const FAQ_ITEMS = [
  {
    q: "Which document sources can I connect?",
    a: "Google Drive, Notion, Confluence, SharePoint, Slack, GitHub, S3, and direct PDF/DOCX upload. The REST API lets you push anything custom.",
  },
  {
    q: "Does AskMyDocs train on my data?",
    a: "Never. Your documents stay in your isolated workspace index and are only used to answer queries inside that workspace. SOC 2 Type II certified, signed DPA available.",
  },
  {
    q: "How accurate are the answers?",
    a: "We use hybrid retrieval (dense vectors + BM25) with reranking. Every answer includes the exact source passages. In internal evals this beats pure vector search by 23% on factual accuracy.",
  },
  {
    q: "Can I self-host or run it in my VPC?",
    a: "Yes. Enterprise plans support deployment into your AWS or GCP VPC with bring-your-own model keys (OpenAI, Anthropic, or self-hosted Llama).",
  },
  {
    q: "Is there a free trial?",
    a: "14 days on the Growth plan, no credit card required. The Starter plan is free forever for up to 200 documents.",
  },
];

function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border/60">
      <div className="container py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[280px_1fr] md:gap-16">
          {/* Left: sticky heading */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
              FAQ
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              Frequently asked
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
              {`Can't find what you need?`}{" "}
              <a
                href="mailto:hello@askmydocs.com"
                className="text-foreground underline-offset-4 hover:underline"
              >
                Talk to us
              </a>
              .
            </p>
          </div>

          {/* Right: accordion */}
          <Accordion multiple={false} className="w-full">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border/60"
              >
                <AccordionTrigger className="py-4 text-left text-[15px] font-normal hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-[14px] leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* =================================================================
 * FINAL CTA — text only, no dark block. Quiet.
 * ================================================================= */
function FinalCta() {
  return (
    <section className="border-t border-border/60">
      <div className="container py-24 text-center md:py-32">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
          Stop searching. Start asking.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Spin up your first workspace in minutes. Free for 14 days.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
          <Button
            size="lg"
            className="h-10 px-5 text-[13.5px]"
            render={<Link href="/auth/sign-up" />}
          >
            Start free trial
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-10 px-5 text-[13.5px]"
            render={<Link href="/contact" />}
          >
            Book a demo
          </Button>
        </div>
      </div>
    </section>
  );
}

/* =================================================================
 * FOOTER
 * ================================================================= */
const FOOTER_LINKS: { title: string; links: string[] }[] = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog"],
  },
  {
    title: "Developers",
    links: ["Docs", "API", "Status"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security"],
  },
];

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              The RAG platform for teams that live in docs.
            </p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-medium uppercase tracking-wider text-muted-foreground/70">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-[12px] text-muted-foreground">
            © {new Date().getFullYear()} AskMyDocs, Inc.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3" /> SOC 2 Type II
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3" /> GDPR
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =================================================================
 * PAGE
 * ================================================================= */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <Hero />
      <LogoStrip />
      <BentoFeatures />
      <Pricing />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
