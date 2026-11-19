import Link from "next/link";
import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiPrisma,
  SiNextdotjs,
  SiReact,
  SiFirebase,
  SiDrizzle,
  SiVite,
  SiNodedotjs,
  SiZod,
} from "react-icons/si";
import {
  FaArrowRight,
  FaHashtag,
  FaLock,
  FaMobileScreen,
} from "react-icons/fa6";

interface Game {
  href: string;
  title: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  icon: IconType;
  games: Game[];
}

const categories: Category[] = [
  {
    id: "typescript",
    name: "TypeScript",
    icon: SiTypescript,
    games: [
      {
        href: "/ts/syntax-grund",
        title: "Grundläggande syntax",
        description: "Matcha rätt syntax.",
      },
      {
        href: "/ts/datatyper",
        title: "Datatyper",
        description: "Träna på de olika datatyperna i TypeScript.",
      },
      {
        href: "/ts/tecken",
        title: "Tecken",
        description: "Öva vad de olika tecknen betyder i TypeScript.",
      },
      {
        href: "/ts/huvuddelar",
        title: "Huvuddelar",
        description: "Utforska de viktigaste delarna av TypeScript.",
      },
      {
        href: "/ts/generics",
        title: "Generics",
        description: "Generiska funktioner, klasser och constraints.",
      },
      {
        href: "/ts/utility-types",
        title: "Utility Types",
        description: "Partial, Pick, Omit, Record och fler.",
      },
      {
        href: "/ts/type-narrowing",
        title: "Type Narrowing",
        description: "typeof, instanceof, in och egna type guards.",
      },
      {
        href: "/ts/avancerade-typer",
        title: "Avancerade typer",
        description: "keyof, conditional types, mapped types och satisfies.",
      },
    ],
  },
  {
    id: "prisma",
    name: "Prisma 7",
    icon: SiPrisma,
    games: [
      {
        href: "/Prisma/schema",
        title: "Schema",
        description:
          "Ny generator, driver adapters och prisma.config.ts.",
      },
      {
        href: "/Prisma/relationer",
        title: "Relationer",
        description: "Förstå olika typer av relationer i Prisma 7.",
      },
      {
        href: "/Prisma/queries",
        title: "Queries",
        description: "Öva på CRUD-operationer med Prisma 7 Client.",
      },
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: SiNextdotjs,
    games: [
      {
        href: "/nextjs/routing",
        title: "Routing",
        description: "Filsystem, layouts och dynamiska segment.",
      },
      {
        href: "/nextjs/datafetch",
        title: "Data Fetching",
        description: "Hämta data med rätt strategi (SSR/SSG/Client).",
      },
      {
        href: "/nextjs/lifecycle",
        title: "Lifecycle",
        description: "Server vs Client components och hooks.",
      },
    ],
  },
  {
    id: "react",
    name: "React",
    icon: SiReact,
    games: [
      {
        href: "/react/hooks",
        title: "Hooks",
        description: "useState, useEffect, useContext och mer.",
      },
      {
        href: "/react/components",
        title: "Components",
        description: "Komponenter, Props och Children.",
      },
      {
        href: "/react/jsx",
        title: "JSX",
        description: "JSX syntax och specialtecken.",
      },
      {
        href: "/react/state",
        title: "State Management",
        description: "Lokal, lyftad och global state.",
      },
    ],
  },
  {
    id: "csharp",
    name: "C#",
    icon: FaHashtag,
    games: [
      {
        href: "/csharp/datatyper",
        title: "Datatyper",
        description: "Träna på int, string, bool, double och fler C#-typer.",
      },
      {
        href: "/csharp/oop",
        title: "OOP",
        description: "class, interface, abstract, override och mer.",
      },
      {
        href: "/csharp/syntax-grund",
        title: "Grundsyntax",
        description: "Matcha syntaxkoncept med kodexempel i C#.",
      },
      {
        href: "/csharp/linq",
        title: "LINQ",
        description: "Where, Select, GroupBy och fler LINQ-metoder.",
      },
      {
        href: "/csharp/felhantering",
        title: "Felhantering",
        description: "try, catch, finally, throw och vanliga undantag.",
      },
      {
        href: "/csharp/async",
        title: "Async/Await",
        description: "async, await, Task, CancellationToken och mer.",
      },
      {
        href: "/csharp/collections",
        title: "Collections",
        description: "List, Dictionary, HashSet, Queue, Stack och mer.",
      },
    ],
  },
  {
    id: "better-auth",
    name: "Better Auth",
    icon: FaLock,
    games: [
      {
        href: "/better-auth/grundkoncept",
        title: "Grundkoncept",
        description: "Lär dig grundläggande koncept i Better Auth.",
      },
      {
        href: "/better-auth/autentisering",
        title: "Autentisering",
        description: "Olika autentiseringsmetoder och funktioner.",
      },
      {
        href: "/better-auth/sessions",
        title: "Sessions",
        description: "Sessionshantering och säkerhetsfunktioner.",
      },
      {
        href: "/better-auth/plugins",
        title: "Plugins",
        description: "Utöka med plugins: 2FA, passkey, magic link m.m.",
      },
    ],
  },
  {
    id: "firebase",
    name: "Firebase",
    icon: SiFirebase,
    games: [
      {
        href: "/firebase/auth",
        title: "Authentication",
        description: "Logga in, lyssna på auth-status och logga ut.",
      },
      {
        href: "/firebase/firestore",
        title: "Firestore",
        description: "Collections, queries och realtidslyssnare.",
      },
      {
        href: "/firebase/hosting-storage",
        title: "Storage & Hosting",
        description: "Ladda upp filer och publicera din app.",
      },
    ],
  },
  {
    id: "drizzle",
    name: "Drizzle",
    icon: SiDrizzle,
    games: [
      {
        href: "/drizzle/schema",
        title: "Schema",
        description: "pgTable, kolumner, foreign keys och relations.",
      },
      {
        href: "/drizzle/queries",
        title: "Queries",
        description: "Select, insert, update, delete och relational API.",
      },
      {
        href: "/drizzle/migrations",
        title: "Migrations",
        description: "generate, migrate, push och Drizzle Studio.",
      },
    ],
  },
  {
    id: "react-vite",
    name: "React + Vite",
    icon: SiVite,
    games: [
      {
        href: "/react-vite/setup",
        title: "Setup",
        description: "Dev-server, HMR och vite.config.ts.",
      },
      {
        href: "/react-vite/routing",
        title: "React Router",
        description: "Klientroutning med react-router-dom.",
      },
      {
        href: "/react-vite/build",
        title: "Build & Env",
        description: "Produktionsbygge, code splitting och env-variabler.",
      },
    ],
  },
  {
    id: "react-native",
    name: "React Native",
    icon: FaMobileScreen,
    games: [
      {
        href: "/react-native/components",
        title: "Komponenter",
        description: "View, Text, FlatList och Pressable.",
      },
      {
        href: "/react-native/navigation",
        title: "Navigation",
        description: "Stack, tabs och navigation mellan skärmar.",
      },
      {
        href: "/react-native/styling",
        title: "Styling",
        description: "StyleSheet, Flexbox och Platform-API:er.",
      },
    ],
  },
  {
    id: "node",
    name: "Node.js",
    icon: SiNodedotjs,
    games: [
      {
        href: "/node/modules",
        title: "Moduler",
        description: "CommonJS vs ES Modules, require och import.",
      },
      {
        href: "/node/async",
        title: "Event Loop & Async",
        description: "Event loop, promises och async/await.",
      },
      {
        href: "/node/fs-http",
        title: "fs & http",
        description: "Läsa/skriva filer och bygga en enkel server.",
      },
    ],
  },
  {
    id: "zod",
    name: "Zod",
    icon: SiZod,
    games: [
      {
        href: "/zod/basics",
        title: "Schema Basics",
        description: "Primitiver, objekt, arrayer och enum.",
      },
      {
        href: "/zod/validation",
        title: "Validation",
        description: "parse, safeParse, refine och egna felmeddelanden.",
      },
      {
        href: "/zod/types",
        title: "Types & Transform",
        description: "z.infer, optional, transform och union.",
      },
    ],
  },
];

const totalGames = categories.reduce((sum, c) => sum + c.games.length, 0);

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-fg">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Memory för kod
          </h1>
          <p className="mt-3 text-lg text-fg-muted">
            Memoryspel med faktarutor och kodexempel för att repetera
            programmering inför prov eller läxförhör.{" "}
            {categories.length} ämnen, {totalGames} spel.
          </p>
        </header>

        <nav aria-label="Ämnen" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-fg-muted/50 hover:text-fg"
                >
                  <category.icon aria-hidden className="h-3.5 w-3.5" />
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-12">
          {categories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              aria-labelledby={`${category.id}-heading`}
              className="scroll-mt-6"
            >
              <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h2
                  id={`${category.id}-heading`}
                  className="flex items-center gap-2.5 text-xl font-semibold text-fg"
                >
                  <category.icon
                    aria-hidden
                    className="h-5 w-5 text-fg-muted"
                  />
                  {category.name}
                </h2>
                <span className="text-sm text-fg-muted">
                  {category.games.length} spel
                </span>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {category.games.map((game) => (
                  <li key={game.href}>
                    <Link
                      href={game.href}
                      className="group flex h-full flex-col rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/60 hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-medium text-fg">
                          {game.title}
                        </span>
                        <FaArrowRight
                          aria-hidden
                          className="h-3 w-3 shrink-0 text-fg-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </span>
                      <span className="mt-1 text-sm leading-relaxed text-fg-muted">
                        {game.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section
          aria-labelledby="info-heading"
          className="mt-16 rounded-xl border border-line bg-surface p-5 sm:p-6"
        >
          <h2 id="info-heading" className="font-semibold text-fg">
            Hur fungerar spelen?
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-fg-muted marker:text-fg-muted/60">
            <li>Klicka på två kort för att hitta matchande par.</li>
            <li>Träna fakta samtidigt som du spelar.</li>
            <li>Perfekt för repetition inför prov eller läxförhör.</li>
          </ul>
        </section>

        <footer className="mt-10 border-t border-line pt-6 text-sm text-fg-muted">
          Kod och design av{" "}
          <a
            href="https://kodochdesign.se"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
          >
            Joefine Eriksson
          </a>
        </footer>
      </div>
    </div>
  );
}
