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
  "text-blue-300",
  "text-sky-300",
  "text-indigo-300",
  "text-cyan-300",
  "text-violet-300",
  "text-purple-300",
  "text-teal-300",
  "text-pink-300",
];

const data = [
  {
    id: 1,
    content: "z.string()",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Definierar ett schema som kräver en sträng",
    type: "description" as const,
    matchId: 1,
    textColor: colors[4],
  },

  {
    id: 3,
    content: "z.object({...})",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Definierar schema för ett objekt med namngivna fält",
    type: "description" as const,
    matchId: 2,
    textColor: colors[5],
  },

  {
    id: 5,
    content: "z.array(z.string())",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Definierar schema för en array av strängar",
    type: "description" as const,
    matchId: 3,
    textColor: colors[6],
  },

  {
    id: 7,
    content: "z.enum([...])",
    type: "term" as const,
    matchId: 4,
    textColor: colors[3],
  },
  {
    id: 8,
    content: "Begränsar värdet till en uppsättning tillåtna strängar",
    type: "description" as const,
    matchId: 4,
    textColor: colors[7],
  },
];

export default function ZodBasicsGame() {
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
      <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 text-white">
        <div className="text-xl font-bold text-blue-300">
          🔷 Matcha Zod Schema Basics
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: syntax och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-300">{moves}</div>
              <div className="text-sm">Drag</div>
            </div>
          </div>
          <button onClick={init} className="bg-red-600 px-3 py-1 rounded">
            🔄 Nytt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                c.isSelected ? "ring-4 ring-blue-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🔷" : "📝"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {completed && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 text-center max-w-md mx-4">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-lg font-bold mb-2">Bra jobbat!</h3>
            <p className="text-sm text-gray-700 mb-3">
              Du klarade Zod Basics-spelet på {moves} drag.
            </p>
            <div className="text-left bg-blue-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Zod-scheman är byggstenar - du kan komponera ihop
              objekt, arrayer och unioner för att beskriva vilken datastruktur
              som helst.
            </div>
            <button
              onClick={init}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg p-6 text-white border-2 border-blue-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om Zod Schema</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔤</span>
              <span className="font-semibold text-blue-300">
                Primitiver
              </span>
            </div>
            <p>string, number, boolean, date</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧱</span>
              <span className="font-semibold text-sky-300">Object</span>
            </div>
            <p>Beskriver formen på ett objekt</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📚</span>
              <span className="font-semibold text-indigo-300">Array</span>
            </div>
            <p>z.array() för listor av ett schema</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎯</span>
              <span className="font-semibold text-cyan-300">Enum</span>
            </div>
            <p>Begränsad uppsättning tillåtna värden</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧩</span>
              <span className="font-semibold text-violet-300">
                Composable
              </span>
            </div>
            <p>Scheman kan nästlas i varandra</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌱</span>
              <span className="font-semibold text-purple-300">
                Runtime
              </span>
            </div>
            <p>Validering sker vid körning, inte bara compile-time</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-blue-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-blue-300">Tips:</span>
          </div>
          <p className="text-sm">
            TypeScript-typer försvinner vid körning - Zod ger dig samma
            säkerhet i runtime, t.ex. när data kommer från ett API eller en
            formulär-submit.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-blue-400">
            Zod Schema Basics i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-400 mb-3">
                🔤 Primitiva scheman
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Grundbyggstenarna för validering.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { z } from "zod"

const nameSchema = z.string()
const ageSchema = z.number()
const activeSchema = z.boolean()
const bornSchema = z.date()`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-sky-500">
              <h3 className="text-lg font-bold text-sky-400 mb-3">
                🧱 Objektscheman
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Beskriv formen på ett helt objekt.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-indigo-500">
              <h3 className="text-lg font-bold text-indigo-400 mb-3">
                📚 Arrayer
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Validerar varje element mot samma schema.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const tagsSchema = z.array(z.string())
const usersSchema = z.array(userSchema)`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                🎯 Enum &amp; literals
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Begränsa till specifika värden.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const roleSchema = z.enum(["admin", "user", "guest"])
const oneSchema = z.literal("draft")`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-violet-500">
              <h3 className="text-lg font-bold text-violet-400 mb-3">
                🧩 Nästlade scheman
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Bygg komplexa strukturer av mindre delar.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const addressSchema = z.object({
  city: z.string(),
  zip: z.string(),
})

const userSchema = z.object({
  name: z.string(),
  address: addressSchema,
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                🌱 Varför runtime-validering?
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  • <strong className="text-blue-300">API-svar:</strong>{" "}
                  Extern data kan avvika från förväntad typ
                </p>
                <p>
                  • <strong className="text-blue-300">Formulär:</strong>{" "}
                  Användarinmatning måste alltid valideras
                </p>
                <p>
                  • <strong className="text-blue-300">Env vars:</strong>{" "}
                  Säkerställ att miljövariabler finns och har rätt format
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
