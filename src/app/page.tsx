"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-800 to-blue-900 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-6 py-12">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white mb-3">
            🧠 Memory för kod
          </h1>
          <p className="text-gray-200 text-lg">
            Välj ett spel att träna med. Fler spel läggs till senare.
          </p>
        </header>

        {/* TypeScript Spel */}
        <section aria-labelledby="ts-heading" className="mb-8">
          <h2
            id="ts-heading"
            className="text-2xl font-bold text-yellow-300 mb-4 text-center"
          >
            📘 TypeScript Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* TYPESCRIPT - SYNTAX GRUND */}
            <Link
              href="/ts/syntax-grund"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-yellow-300 transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Typescript - Grundläggade Syntax
                </h3>
                <span className="text-yellow-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">Matcha rätt syntax.</p>
              <div className="mt-4 inline-block bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            {/* TYPESCRIPT - DATABASER*/}
            <Link
              href="/ts/datatyper"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-emerald-300 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Typescript - Datatyper
                </h3>
                <span className="text-emerald-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Träna på de olika datatyperna i Typescript.
              </p>
              <div className="mt-4 inline-block bg-emerald-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            {/* TYPESCRIPT - TECKEN */}
            <Link
              href="/ts/tecken"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-cyan-300 transition-colors focus:outline-none focus:ring-4 focus:ring-cyan-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Typescript Tecken
                </h3>
                <span className="text-cyan-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Öva vad de olika tecknen betyder i Typescript.
              </p>
              <div className="mt-4 inline-block bg-cyan-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            {/* TYPESCRIPT - HUVUDDELAR */}
            <Link
              href="/ts/huvuddelar"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-purple-300 transition-colors focus:outline-none focus:ring-4 focus:ring-purple-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Huvuddelar i TypeScript
                </h3>
                <span className="text-purple-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Utforska de viktigaste delarna av TypeScript.
              </p>
              <div className="mt-4 inline-block bg-purple-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>
          </div>
        </section>

        {/* Prisma Spel */}
        <section aria-labelledby="prisma-heading">
          <h2
            id="prisma-heading"
            className="text-2xl font-bold text-cyan-300 mb-4 text-center"
          >
            🗄️ Prisma Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* PRISMA - SCHEMA */}
            <Link
              href="/Prisma/schema"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-cyan-300 transition-colors focus:outline-none focus:ring-4 focus:ring-cyan-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Prisma - Schema
                </h3>
                <span className="text-cyan-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Lär dig grunderna i Prisma schema-syntax.
              </p>
              <div className="mt-4 inline-block bg-cyan-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            {/* PRISMA - RELATIONER */}
            <Link
              href="/Prisma/relationer"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-pink-300 transition-colors focus:outline-none focus:ring-4 focus:ring-pink-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Prisma - Relationer
                </h3>
                <span className="text-pink-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Förstå olika typer av relationer i Prisma.
              </p>
              <div className="mt-4 inline-block bg-pink-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            {/* PRISMA - QUERIES */}
            <Link
              href="/Prisma/queries"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-emerald-300 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Prisma - Queries
                </h3>
                <span className="text-emerald-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Öva på CRUD-operationer med Prisma Client.
              </p>
              <div className="mt-4 inline-block bg-emerald-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>
          </div>
        </section>

        {/* Next.js Spel */}
        <section aria-labelledby="nextjs-heading" className="mt-8">
          <h2
            id="nextjs-heading"
            className="text-2xl font-bold text-sky-300 mb-4 text-center"
          >
            ⚛️ Next.js Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/nextjs/routing"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-blue-300 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Next.js - Routing
                </h3>
                <span className="text-blue-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Filsystem, layouts och dynamiska segment.
              </p>
              <div className="mt-4 inline-block bg-blue-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/nextjs/datafetch"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-emerald-300 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Next.js - Data Fetching
                </h3>
                <span className="text-emerald-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Hämta data med rätt strategi (SSR/SSG/Client).
              </p>
              <div className="mt-4 inline-block bg-emerald-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/nextjs/lifecycle"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-yellow-300 transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Next.js - Lifecycle
                </h3>
                <span className="text-yellow-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Server vs Client components och hooks.
              </p>
              <div className="mt-4 inline-block bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>
          </div>
        </section>

        {/* React Spel */}
        <section aria-labelledby="react-heading" className="mt-8">
          <h2
            id="react-heading"
            className="text-2xl font-bold text-cyan-300 mb-4 text-center"
          >
            ⚛️ React Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/react/hooks"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-blue-300 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">React - Hooks</h3>
                <span className="text-blue-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                useState, useEffect, useContext och mer.
              </p>
              <div className="mt-4 inline-block bg-blue-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/react/components"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-cyan-300 transition-colors focus:outline-none focus:ring-4 focus:ring-cyan-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  React - Components
                </h3>
                <span className="text-cyan-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Komponenter, Props och Children.
              </p>
              <div className="mt-4 inline-block bg-cyan-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/react/jsx"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-green-300 transition-colors focus:outline-none focus:ring-4 focus:ring-green-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">React - JSX</h3>
                <span className="text-green-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                JSX syntax och specialtecken.
              </p>
              <div className="mt-4 inline-block bg-green-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/react/state"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-purple-300 transition-colors focus:outline-none focus:ring-4 focus:ring-purple-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  React - State Management
                </h3>
                <span className="text-purple-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Lokal, lyftad och global state.
              </p>
              <div className="mt-4 inline-block bg-purple-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>
          </div>
        </section>

        {/* Better Auth Spel */}
        <section aria-labelledby="better-auth-heading" className="mt-8">
          <h2
            id="better-auth-heading"
            className="text-2xl font-bold text-indigo-300 mb-4 text-center"
          >
            🔐 Better Auth Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/better-auth/grundkoncept"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-indigo-300 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Better Auth - Grundkoncept
                </h3>
                <span className="text-indigo-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Lär dig grundläggande koncept i Better Auth.
              </p>
              <div className="mt-4 inline-block bg-indigo-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/better-auth/autentisering"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-blue-300 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Better Auth - Autentisering
                </h3>
                <span className="text-blue-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Olika autentiseringsmetoder och funktioner.
              </p>
              <div className="mt-4 inline-block bg-blue-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/better-auth/sessions"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-green-300 transition-colors focus:outline-none focus:ring-4 focus:ring-green-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Better Auth - Sessions
                </h3>
                <span className="text-green-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Sessionshantering och säkerhetsfunktioner.
              </p>
              <div className="mt-4 inline-block bg-green-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/better-auth/plugins"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-purple-300 transition-colors focus:outline-none focus:ring-4 focus:ring-purple-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Better Auth - Plugins
                </h3>
                <span className="text-purple-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Utöka med plugins: 2FA, passkey, magic link m.m.
              </p>
              <div className="mt-4 inline-block bg-purple-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>
          </div>
        </section>

        {/* Information */}
        <div
          id="info"
          className="mt-10 text-left text-sm text-gray-200 bg-black bg-opacity-30 p-4 rounded"
        >
          <h2 className="font-semibold text-yellow-300 mb-2">
            Hur fungerar spelen?
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Klicka på två kort för att hitta matchande par.</li>
            <li>Träna fakta samtidigt som du spelar.</li>
            <li>Perfekt för repetition inför prov eller läxförhör.</li>
          </ul>
        </div>

        <footer className="mt-10 text-center text-gray-300">
          <div className="text-sm">
            💻 Kod och design av{" "}
            <a
              href="https://kodochdesign.se"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300 hover:underline"
            >
              Joefine Eriksson
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
