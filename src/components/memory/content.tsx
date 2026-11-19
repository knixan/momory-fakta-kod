import Link from "next/link";
import type { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa6";

/*
  Gemensamma byggstenar för spelsidorna: sidlayout, sektioner, faktarutor,
  tips och kodblock. Allt bygger på de neutrala färgtokens i globals.css
  (surface, line, fg, fg-muted, accent) så att sidorna blir lugna och
  enhetliga.
*/

export function GamePage({
  category,
  title,
  subtitle,
  children,
}: {
  category: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans text-fg">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <FaArrowLeft aria-hidden className="h-3 w-3" />
          Alla spel
        </Link>
        <header className="mb-8 mt-6">
          <p className="text-sm font-medium text-accent">{category}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {title}
          </h1>
          {subtitle && <p className="mt-2 text-fg-muted">{subtitle}</p>}
        </header>
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <h2 className="mb-5 text-xl font-semibold text-fg">{title}</h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-fg-muted">
      {children}
    </h3>
  );
}

export function FactGrid({
  columns = 3,
  children,
}: {
  columns?: 2 | 3 | 4;
  children: ReactNode;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];
  return <div className={`grid gap-3 ${cols}`}>{children}</div>;
}

export function Fact({
  title,
  code = false,
  children,
}: {
  title: string;
  /** Visa rubriken som kod (t.ex. en symbol eller typ). */
  code?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg bg-surface-raised p-4">
      <p
        className={`font-semibold text-fg ${code ? "font-mono text-sm" : "text-sm"}`}
      >
        {title}
      </p>
      <div className="mt-1 text-sm leading-relaxed text-fg-muted">
        {children}
      </div>
    </div>
  );
}

export function Note({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-l-2 border-accent/60 pl-4">
      <p className="text-sm font-semibold text-fg">{label}</p>
      <div className="mt-1 text-sm leading-relaxed text-fg-muted">
        {children}
      </div>
    </div>
  );
}

export function TopicGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-x-8 gap-y-8 lg:grid-cols-2">{children}</div>;
}

export function Topic({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article>
      <h3 className="mb-2 text-base font-semibold text-fg">{title}</h3>
      <div className="space-y-3 text-sm leading-relaxed text-fg-muted">
        {children}
      </div>
    </article>
  );
}

export function List({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 marker:text-fg-muted/60">
      {children}
    </ul>
  );
}

/** Framhävd term i löptext. */
export function Term({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-fg">{children}</strong>;
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-line bg-code p-3 font-mono text-xs leading-relaxed text-fg">
      <code>{children}</code>
    </pre>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-code px-1.5 py-0.5 font-mono text-[0.85em] text-fg">
      {children}
    </code>
  );
}
