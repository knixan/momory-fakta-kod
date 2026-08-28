"use client";

import { useState, useEffect } from "react";

interface Card {
  id: number;
  content: string;
  type: "term" | "description";
  matchId: number;
  textColor: string;
  isFlipped: boolean;
  isMatched: boolean;
  isSelected?: boolean;
}

const colors = [
  "text-teal-300",
  "text-cyan-300",
  "text-emerald-300",
  "text-lime-300",
  "text-sky-300",
  "text-yellow-300",
];

const data = [
  {
    id: 1,
    content: "drizzle-kit generate",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Skapar en SQL-migrationsfil från schemat",
    type: "description" as const,
    matchId: 1,
    textColor: colors[3],
  },

  {
    id: 3,
    content: "drizzle-kit migrate",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Kör väntande migrationer mot databasen",
    type: "description" as const,
    matchId: 2,
    textColor: colors[4],
  },

  {
    id: 5,
    content: "drizzle-kit studio",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Öppnar ett visuellt GUI för databasen i webbläsaren",
    type: "description" as const,
    matchId: 3,
    textColor: colors[5],
  },
];

export default function DrizzleMigrationsGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => init(), []);

  const init = () => {
    setCards(
      data
        .map((d) => ({ ...d, isFlipped: true, isMatched: false }))
        .sort(() => Math.random() - 0.5)
    );
    setFlipped([]);
    setMatches(0);
    setMoves(0);
    setCompleted(false);
  };

  const sel = (id: number) => {
    if (flipped.length === 2) return;
    if (flipped.includes(id)) return;
    if (cards.find((c) => c.id === id)?.isMatched) return;
    const n = [...flipped, id];
    setFlipped(n);
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isSelected: true } : c))
    );
    if (n.length === 2) {
      setMoves((m) => m + 1);
      check(n);
    }
  };

  const check = (ids: number[]) => {
    const [a, b] = ids;
    const ca = cards.find((c) => c.id === a);
    const cb = cards.find((c) => c.id === b);
    if (ca && cb && ca.matchId === cb.matchId) {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            ids.includes(c.id)
              ? { ...c, isMatched: true, isSelected: false }
              : { ...c, isSelected: false }
          )
        );
        setFlipped([]);
      }, 700);
      const nm = matches + 1;
      setMatches(nm);
      if (nm === data.length / 2) setTimeout(() => setCompleted(true), 800);
    } else {
      setTimeout(() => {
        setCards((prev) => prev.map((c) => ({ ...c, isSelected: false })));
        setFlipped([]);
      }, 900);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-black/50 rounded-lg p-6 mb-6 text-white">
        <div className="text-xl font-bold text-teal-300">
          🛠️ Matcha Drizzle Migrations
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: CLI-kommando och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-300">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{moves}</div>
              <div className="text-sm">Drag</div>
            </div>
          </div>
          <button onClick={init} className="bg-red-600 px-3 py-1 rounded">
            🔄 Nytt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div
            key={c.id}
            onClick={() => sel(c.id)}
            className={`relative h-28 rounded-lg ${
              c.isMatched
                ? "scale-0 opacity-0"
                : "cursor-pointer hover:scale-105"
            } transition-all`}
          >
            <div
              className={`absolute inset-0 bg-gray-800 rounded-lg flex flex-col items-center justify-center border-2 p-2 ${
                c.isSelected ? "ring-4 ring-teal-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🛠️" : "📝"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {completed && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 text-center max-w-md mx-4">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-lg font-bold mb-2">Bra jobbat!</h3>
            <p className="text-sm text-gray-700 mb-3">
              Du klarade Drizzle Migrations-spelet på {moves} drag.
            </p>
            <div className="text-left bg-teal-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: generate skapar SQL-filen, migrate kör den - de är
              separata steg så du hinner granska SQL:en först.
            </div>
            <button
              onClick={init}
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-teal-900 to-cyan-900 rounded-lg p-6 text-white border-2 border-teal-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">
            Snabbfakta om Drizzle Migrations
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📄</span>
              <span className="font-semibold text-teal-300">Generate</span>
            </div>
            <p>Diffar schema mot senaste migration</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">▶️</span>
              <span className="font-semibold text-cyan-300">Migrate</span>
            </div>
            <p>Kör SQL-filerna i ordning mot DB</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚡</span>
              <span className="font-semibold text-emerald-300">Push</span>
            </div>
            <p>Synkar schema direkt utan migrationsfiler (dev)</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🖥️</span>
              <span className="font-semibold text-lime-300">Studio</span>
            </div>
            <p>Webb-GUI för att bläddra i data</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚙️</span>
              <span className="font-semibold text-sky-300">
                drizzle.config.ts
              </span>
            </div>
            <p>Konfig för schema-path, dialect och DB-URL</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📁</span>
              <span className="font-semibold text-yellow-300">
                meta/_journal
              </span>
            </div>
            <p>Håller koll på vilka migrationer som körts</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black/20 rounded border-l-4 border-teal-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-teal-300">Tips:</span>
          </div>
          <p className="text-sm">
            Använd push i lokal utveckling för snabb iteration, men generate +
            migrate i produktion för spårbara, granskningsbara ändringar.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-teal-400">
            Drizzle Migrations i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-teal-400 mb-3">
                ⚙️ drizzle.config.ts
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Talar om var schemat och migrationerna finns.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                📄 Generera migration
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Skapar en ny .sql-fil baserat på schemaändringar.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`npx drizzle-kit generate

# ./drizzle/0001_add_posts_table.sql`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-emerald-500">
              <h3 className="text-lg font-bold text-emerald-400 mb-3">
                ▶️ Kör migrationer
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Via CLI eller programmatiskt.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`npx drizzle-kit migrate

// eller i kod (t.ex. vid deploy)
import { migrate } from "drizzle-orm/node-postgres/migrator"
await migrate(db, { migrationsFolder: "./drizzle" })`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-lime-500">
              <h3 className="text-lg font-bold text-lime-400 mb-3">
                ⚡ Push (snabb dev-loop)
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Synkar schemat direkt utan att skapa filer.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`npx drizzle-kit push

# Bra för prototyping, undvik i produktion`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-sky-500">
              <h3 className="text-lg font-bold text-sky-400 mb-3">
                🖥️ Drizzle Studio
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Utforska och redigera data visuellt.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`npx drizzle-kit studio
# Öppnar https://local.drizzle.studio`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                📊 Generate vs Push
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  • <strong className="text-teal-300">generate:</strong>{" "}
                  Spårbar historik, granskningsbar SQL
                </p>
                <p>
                  • <strong className="text-teal-300">push:</strong> Snabb,
                  ingen historik - bra för lokal dev
                </p>
                <p>
                  • <strong className="text-teal-300">Produktion:</strong>{" "}
                  Använd alltid generate + migrate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
