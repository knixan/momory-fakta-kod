"use client";

import Link from "next/link";
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
  FaBrain,
  FaHashtag,
  FaLock,
  FaMobileScreen,
  FaLaptopCode,
} from "react-icons/fa6";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-800 to-blue-900 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-6 py-12">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white mb-3 flex items-center justify-center gap-3">
            <FaBrain />
            Memory för kod
          </h1>
          <p className="text-gray-200 text-lg">
            Välj ett spel att träna med. Fler spel läggs till senare.
          </p>
        </header>

        {/* TypeScript Spel */}
        <section aria-labelledby="ts-heading" className="mb-8">
          <h2
            id="ts-heading"
            className="text-2xl font-bold text-yellow-300 mb-4 flex items-center justify-center gap-2"
          >
            <SiTypescript />
            TypeScript Spel
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

            {/* TYPESCRIPT - GENERICS */}
            <Link
              href="/ts/generics"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-indigo-300 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  TypeScript - Generics
                </h3>
                <span className="text-indigo-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Generiska funktioner, klasser och constraints.
              </p>
              <div className="mt-4 inline-block bg-indigo-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            {/* TYPESCRIPT - UTILITY TYPES */}
            <Link
              href="/ts/utility-types"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-teal-300 transition-colors focus:outline-none focus:ring-4 focus:ring-teal-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  TypeScript - Utility Types
                </h3>
                <span className="text-teal-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Partial, Pick, Omit, Record och fler.
              </p>
              <div className="mt-4 inline-block bg-teal-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            {/* TYPESCRIPT - TYPE NARROWING */}
            <Link
              href="/ts/type-narrowing"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-rose-300 transition-colors focus:outline-none focus:ring-4 focus:ring-rose-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  TypeScript - Type Narrowing
                </h3>
                <span className="text-rose-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                typeof, instanceof, in och egna type guards.
              </p>
              <div className="mt-4 inline-block bg-rose-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            {/* TYPESCRIPT - AVANCERADE TYPER */}
            <Link
              href="/ts/avancerade-typer"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-amber-300 transition-colors focus:outline-none focus:ring-4 focus:ring-amber-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  TypeScript - Avancerade typer
                </h3>
                <span className="text-amber-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                keyof, conditional types, mapped types och satisfies.
              </p>
              <div className="mt-4 inline-block bg-amber-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>
          </div>
        </section>

        {/* Prisma Spel */}
        <section aria-labelledby="prisma-heading">
          <h2
            id="prisma-heading"
            className="text-2xl font-bold text-cyan-300 mb-4 flex items-center justify-center gap-2"
          >
            <SiPrisma />
            Prisma 7 Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* PRISMA - SCHEMA */}
            <Link
              href="/Prisma/schema"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-cyan-300 transition-colors focus:outline-none focus:ring-4 focus:ring-cyan-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Prisma 7 - Schema
                </h3>
                <span className="text-cyan-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Lär dig Prisma 7 schema: ny generator, driver adapters och prisma.config.ts.
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
                  Prisma 7 - Relationer
                </h3>
                <span className="text-pink-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Förstå olika typer av relationer i Prisma 7.
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
                  Prisma 7 - Queries
                </h3>
                <span className="text-emerald-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Öva på CRUD-operationer med Prisma 7 Client.
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
            className="text-2xl font-bold text-sky-300 mb-4 flex items-center justify-center gap-2"
          >
            <SiNextdotjs />
            Next.js Spel
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
            className="text-2xl font-bold text-cyan-300 mb-4 flex items-center justify-center gap-2"
          >
            <SiReact />
            React Spel
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

        {/* C# Spel */}
        <section aria-labelledby="csharp-heading" className="mt-8">
          <h2
            id="csharp-heading"
            className="text-2xl font-bold text-violet-300 mb-4 flex items-center justify-center gap-2"
          >
            <FaHashtag />
            C# Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/csharp/datatyper"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-violet-300 transition-colors focus:outline-none focus:ring-4 focus:ring-violet-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  C# - Datatyper
                </h3>
                <span className="text-violet-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Träna på int, string, bool, double och fler C#-typer.
              </p>
              <div className="mt-4 inline-block bg-violet-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/csharp/oop"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-green-300 transition-colors focus:outline-none focus:ring-4 focus:ring-green-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  C# - OOP
                </h3>
                <span className="text-green-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                class, interface, abstract, override och mer.
              </p>
              <div className="mt-4 inline-block bg-green-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/csharp/syntax-grund"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-blue-300 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  C# - Grundsyntax
                </h3>
                <span className="text-blue-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Matcha syntaxkoncept med kodexempel i C#.
              </p>
              <div className="mt-4 inline-block bg-blue-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/csharp/linq"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-orange-300 transition-colors focus:outline-none focus:ring-4 focus:ring-orange-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  C# - LINQ
                </h3>
                <span className="text-orange-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Where, Select, GroupBy och fler LINQ-metoder.
              </p>
              <div className="mt-4 inline-block bg-orange-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/csharp/felhantering"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-red-300 transition-colors focus:outline-none focus:ring-4 focus:ring-red-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  C# - Felhantering
                </h3>
                <span className="text-red-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                try, catch, finally, throw och vanliga undantag.
              </p>
              <div className="mt-4 inline-block bg-red-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/csharp/async"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-sky-300 transition-colors focus:outline-none focus:ring-4 focus:ring-sky-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  C# - Async/Await
                </h3>
                <span className="text-sky-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                async, await, Task, CancellationToken och mer.
              </p>
              <div className="mt-4 inline-block bg-sky-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/csharp/collections"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-emerald-300 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  C# - Collections
                </h3>
                <span className="text-emerald-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                List, Dictionary, HashSet, Queue, Stack och mer.
              </p>
              <div className="mt-4 inline-block bg-emerald-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>
          </div>
        </section>

        {/* Better Auth Spel */}
        <section aria-labelledby="better-auth-heading" className="mt-8">
          <h2
            id="better-auth-heading"
            className="text-2xl font-bold text-indigo-300 mb-4 flex items-center justify-center gap-2"
          >
            <FaLock />
            Better Auth Spel
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

        {/* Firebase Spel */}
        <section aria-labelledby="firebase-heading" className="mt-8">
          <h2
            id="firebase-heading"
            className="text-2xl font-bold text-orange-300 mb-4 flex items-center justify-center gap-2"
          >
            <SiFirebase />
            Firebase Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/firebase/auth"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-orange-300 transition-colors focus:outline-none focus:ring-4 focus:ring-orange-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Firebase - Authentication
                </h3>
                <span className="text-orange-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Logga in, lyssna på auth-status och logga ut.
              </p>
              <div className="mt-4 inline-block bg-orange-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/firebase/firestore"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-amber-300 transition-colors focus:outline-none focus:ring-4 focus:ring-amber-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Firebase - Firestore
                </h3>
                <span className="text-amber-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Collections, queries och realtidslyssnare.
              </p>
              <div className="mt-4 inline-block bg-amber-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/firebase/hosting-storage"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-red-300 transition-colors focus:outline-none focus:ring-4 focus:ring-red-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Firebase - Storage &amp; Hosting
                </h3>
                <span className="text-red-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Ladda upp filer och publicera din app.
              </p>
              <div className="mt-4 inline-block bg-red-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>
          </div>
        </section>

        {/* Drizzle Spel */}
        <section aria-labelledby="drizzle-heading" className="mt-8">
          <h2
            id="drizzle-heading"
            className="text-2xl font-bold text-emerald-300 mb-4 flex items-center justify-center gap-2"
          >
            <SiDrizzle />
            Drizzle Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/drizzle/schema"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-emerald-300 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Drizzle - Schema
                </h3>
                <span className="text-emerald-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                pgTable, kolumner, foreign keys och relations.
              </p>
              <div className="mt-4 inline-block bg-emerald-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/drizzle/queries"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-lime-300 transition-colors focus:outline-none focus:ring-4 focus:ring-lime-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Drizzle - Queries
                </h3>
                <span className="text-lime-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Select, insert, update, delete och relational API.
              </p>
              <div className="mt-4 inline-block bg-lime-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/drizzle/migrations"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-teal-300 transition-colors focus:outline-none focus:ring-4 focus:ring-teal-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Drizzle - Migrations
                </h3>
                <span className="text-teal-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                generate, migrate, push och Drizzle Studio.
              </p>
              <div className="mt-4 inline-block bg-teal-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>
          </div>
        </section>

        {/* React Vite Spel */}
        <section aria-labelledby="react-vite-heading" className="mt-8">
          <h2
            id="react-vite-heading"
            className="text-2xl font-bold text-violet-300 mb-4 flex items-center justify-center gap-2"
          >
            <SiVite />
            React + Vite Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/react-vite/setup"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-violet-300 transition-colors focus:outline-none focus:ring-4 focus:ring-violet-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Vite - Setup
                </h3>
                <span className="text-violet-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Dev-server, HMR och vite.config.ts.
              </p>
              <div className="mt-4 inline-block bg-violet-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/react-vite/routing"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-purple-300 transition-colors focus:outline-none focus:ring-4 focus:ring-purple-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Vite - React Router
                </h3>
                <span className="text-purple-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Klientroutning med react-router-dom.
              </p>
              <div className="mt-4 inline-block bg-purple-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/react-vite/build"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-amber-300 transition-colors focus:outline-none focus:ring-4 focus:ring-amber-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Vite - Build &amp; Env
                </h3>
                <span className="text-amber-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Produktionsbygge, code splitting och env-variabler.
              </p>
              <div className="mt-4 inline-block bg-amber-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>
          </div>
        </section>

        {/* React Native Spel */}
        <section aria-labelledby="react-native-heading" className="mt-8">
          <h2
            id="react-native-heading"
            className="text-2xl font-bold text-sky-300 mb-4 flex items-center justify-center gap-2"
          >
            <FaMobileScreen />
            React Native Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/react-native/components"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-sky-300 transition-colors focus:outline-none focus:ring-4 focus:ring-sky-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  React Native - Komponenter
                </h3>
                <span className="text-sky-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                View, Text, FlatList och Pressable.
              </p>
              <div className="mt-4 inline-block bg-sky-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/react-native/navigation"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-blue-300 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  React Native - Navigation
                </h3>
                <span className="text-blue-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Stack, tabs och navigation mellan skärmar.
              </p>
              <div className="mt-4 inline-block bg-blue-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/react-native/styling"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-teal-300 transition-colors focus:outline-none focus:ring-4 focus:ring-teal-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  React Native - Styling
                </h3>
                <span className="text-teal-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                StyleSheet, Flexbox och Platform-API:er.
              </p>
              <div className="mt-4 inline-block bg-teal-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>
          </div>
        </section>

        {/* Node.js Spel */}
        <section aria-labelledby="node-heading" className="mt-8">
          <h2
            id="node-heading"
            className="text-2xl font-bold text-green-300 mb-4 flex items-center justify-center gap-2"
          >
            <SiNodedotjs />
            Node.js Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/node/modules"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-green-300 transition-colors focus:outline-none focus:ring-4 focus:ring-green-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Node.js - Moduler
                </h3>
                <span className="text-green-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                CommonJS vs ES Modules, require och import.
              </p>
              <div className="mt-4 inline-block bg-green-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/node/async"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-lime-300 transition-colors focus:outline-none focus:ring-4 focus:ring-lime-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Node.js - Event Loop &amp; Async
                </h3>
                <span className="text-lime-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Event loop, promises och async/await.
              </p>
              <div className="mt-4 inline-block bg-lime-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/node/fs-http"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-emerald-300 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Node.js - fs &amp; http
                </h3>
                <span className="text-emerald-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Läsa/skriva filer och bygga en enkel server.
              </p>
              <div className="mt-4 inline-block bg-emerald-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>
          </div>
        </section>

        {/* Zod Spel */}
        <section aria-labelledby="zod-heading" className="mt-8">
          <h2
            id="zod-heading"
            className="text-2xl font-bold text-blue-300 mb-4 flex items-center justify-center gap-2"
          >
            <SiZod />
            Zod Spel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/zod/basics"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-blue-300 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Zod - Schema Basics
                </h3>
                <span className="text-blue-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Primitiver, objekt, arrayer och enum.
              </p>
              <div className="mt-4 inline-block bg-blue-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/zod/validation"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-sky-300 transition-colors focus:outline-none focus:ring-4 focus:ring-sky-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Zod - Validation
                </h3>
                <span className="text-sky-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                parse, safeParse, refine och egna felmeddelanden.
              </p>
              <div className="mt-4 inline-block bg-sky-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
                Spela
              </div>
            </Link>

            <Link
              href="/zod/types"
              className="group bg-black/40 border border-white/20 rounded-xl p-5 hover:bg-black/50 hover:border-indigo-300 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-400/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Zod - Types &amp; Transform
                </h3>
                <span className="text-indigo-300 text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                z.infer, optional, transform och union.
              </p>
              <div className="mt-4 inline-block bg-indigo-400 text-gray-900 font-semibold px-4 py-2 rounded-md">
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
          <div className="text-sm inline-flex items-center gap-2">
            <FaLaptopCode />
            Kod och design av{" "}
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
