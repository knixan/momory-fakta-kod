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
  "text-sky-300",
  "text-lime-300",
  "text-green-300",
  "text-blue-300",
  "text-indigo-300",
];

const data = [
  {
    id: 1,
    content: "Partial<T>",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Gör alla egenskaper i T valfria (optional)",
    type: "description" as const,
    matchId: 1,
    textColor: colors[4],
  },

  {
    id: 3,
    content: "Pick<T, K>",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Skapar en ny typ med bara de valda egenskaperna K från T",
    type: "description" as const,
    matchId: 2,
    textColor: colors[5],
  },

  {
    id: 5,
    content: "Omit<T, K>",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Skapar en ny typ utan de angivna egenskaperna K",
    type: "description" as const,
    matchId: 3,
    textColor: colors[6],
  },

  {
    id: 7,
    content: "Record<K, T>",
    type: "term" as const,
    matchId: 4,
    textColor: colors[3],
  },
  {
    id: 8,
    content: "Bygger ett objekt med nycklar av typ K och värden av typ T",
    type: "description" as const,
    matchId: 4,
    textColor: colors[7],
  },
];

export default function TsUtilityTypesGame() {
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
        <div className="text-xl font-bold text-teal-300">
          🧰 Matcha TypeScript Utility Types
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: utility type och beskrivning.
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
                c.isSelected ? "ring-4 ring-teal-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🧰" : "📝"}
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
              Du klarade Utility Types-spelet på {moves} drag.
            </p>
            <div className="text-left bg-teal-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Utility types låter dig återanvända en typ istället för
              att skriva om samma fält i flera interfaces.
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
          <h3 className="text-xl font-bold">Snabbfakta om Utility Types</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧩</span>
              <span className="font-semibold text-teal-300">Partial</span>
            </div>
            <p>Alla fält blir valfria - bra för PATCH/uppdateringar</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✅</span>
              <span className="font-semibold text-cyan-300">Required</span>
            </div>
            <p>Motsatsen till Partial - alla fält blir obligatoriska</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎯</span>
              <span className="font-semibold text-emerald-300">Pick</span>
            </div>
            <p>Plocka ut ett fåtal fält från en större typ</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✂️</span>
              <span className="font-semibold text-sky-300">Omit</span>
            </div>
            <p>Ta bort ett fåtal fält från en större typ</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📋</span>
              <span className="font-semibold text-lime-300">Record</span>
            </div>
            <p>Bygg upp objekt-typer med kända nycklar</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔒</span>
              <span className="font-semibold text-green-300">
                Readonly
              </span>
            </div>
            <p>Gör fälten skrivskyddade efter skapande</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-teal-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-teal-300">Tips:</span>
          </div>
          <p className="text-sm">
            Kombinera gärna utility types: `Partial&lt;Pick&lt;User,
            &quot;name&quot; | &quot;email&quot;&gt;&gt;` ger en typ med bara
            namn och e-post, båda valfria.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-teal-400">
            TypeScript Utility Types i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-teal-400 mb-3">
                🧩 Partial &amp; Required
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Gör allt valfritt respektive obligatoriskt.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`interface User {
  name: string
  email: string
}

type UserUpdate = Partial<User>
// { name?: string; email?: string }

function updateUser(id: string, data: UserUpdate) { ... }`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                🎯 Pick - plocka ut fält
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Bra för att bygga smala DTO:er från en stor typ.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`interface User {
  id: string
  name: string
  email: string
  passwordHash: string
}

type PublicUser = Pick<User, "id" | "name" | "email">`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-emerald-500">
              <h3 className="text-lg font-bold text-emerald-400 mb-3">
                ✂️ Omit - exkludera fält
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Motsatsen till Pick - ta bort känsliga fält.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`type PublicUser = Omit<User, "passwordHash">
// { id: string; name: string; email: string }`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-sky-500">
              <h3 className="text-lg font-bold text-sky-400 mb-3">
                📋 Record - bygga objekt-typer
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Praktiskt för lookup-tabeller och caches.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`type Role = "admin" | "user" | "guest"

const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-400 mb-3">
                🔒 Readonly
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Förhindrar oavsiktlig mutation efter skapande.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const config: Readonly<{ apiUrl: string }> = {
  apiUrl: "https://api.example.com",
}

config.apiUrl = "annan-url" // Fel vid kompilering`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-400 mb-3">
                🔁 ReturnType &amp; Parameters
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Härled typer direkt från befintliga funktioner.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`function createUser() {
  return { id: "1", name: "Elin" }
}

type User = ReturnType<typeof createUser>
type CreateUserArgs = Parameters<typeof createUser>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
