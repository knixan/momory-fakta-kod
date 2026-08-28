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
  "text-amber-300",
  "text-orange-300",
  "text-yellow-300",
  "text-red-300",
  "text-pink-300",
  "text-rose-300",
  "text-violet-300",
  "text-purple-300",
];

const data = [
  {
    id: 1,
    content: "keyof T",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Skapar en union av alla egenskapsnamn i T",
    type: "description" as const,
    matchId: 1,
    textColor: colors[4],
  },

  {
    id: 3,
    content: "T extends U ? X : Y",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Conditional type - väljer typ X eller Y baserat på ett villkor",
    type: "description" as const,
    matchId: 2,
    textColor: colors[5],
  },

  {
    id: 5,
    content: "{ [K in keyof T]: T[K] }",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Mapped type - transformerar varje egenskap i T till en ny typ",
    type: "description" as const,
    matchId: 3,
    textColor: colors[6],
  },

  {
    id: 7,
    content: "as const / satisfies",
    type: "term" as const,
    matchId: 4,
    textColor: colors[3],
  },
  {
    id: 8,
    content: "Bevarar literal-typer respektive validerar utan att bredda typen",
    type: "description" as const,
    matchId: 4,
    textColor: colors[7],
  },
];

export default function TsAvanceradeTyperGame() {
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
        <div className="text-xl font-bold text-amber-300">
          🧙 Matcha Avancerade TypeScript-typer
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: syntax och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-300">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-300">
                {moves}
              </div>
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
                c.isSelected ? "ring-4 ring-amber-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🧙" : "📝"}
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
              Du klarade Avancerade typer-spelet på {moves} drag.
            </p>
            <div className="text-left bg-amber-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: `satisfies` validerar ett värde mot en typ utan att
              bredda variabelns egen, mer specifika typ - till skillnad från
              en vanlig typannotering.
            </div>
            <button
              onClick={init}
              className="bg-amber-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-amber-900 to-orange-900 rounded-lg p-6 text-white border-2 border-amber-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">
            Snabbfakta om avancerade typer
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔑</span>
              <span className="font-semibold text-amber-300">keyof</span>
            </div>
            <p>Union av alla nyckelnamn i ett objekt</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔀</span>
              <span className="font-semibold text-orange-300">
                Conditional Types
              </span>
            </div>
            <p>Typer som förgrenar sig som ett if-uttryck</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🗺️</span>
              <span className="font-semibold text-yellow-300">
                Mapped Types
              </span>
            </div>
            <p>Transformerar varje egenskap i en typ</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧵</span>
              <span className="font-semibold text-red-300">
                Template Literal Types
              </span>
            </div>
            <p>Bygg strängtyper, t.ex. `on${"{Event}"}`</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔎</span>
              <span className="font-semibold text-pink-300">infer</span>
            </div>
            <p>Extraherar en typ inuti en conditional type</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✅</span>
              <span className="font-semibold text-violet-300">
                satisfies
              </span>
            </div>
            <p>Validerar värdet utan att bredda dess typ</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-amber-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-amber-300">Tips:</span>
          </div>
          <p className="text-sm">
            Dessa typer används sällan i vardagskod men syns ofta i
            bibliotekens typdefinitioner - bra att känna igen även om du
            sällan skriver dem själv.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-amber-400">
            Avancerade typer i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="text-lg font-bold text-amber-400 mb-3">
                🔑 keyof
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Bra tillsammans med generics för typsäker property-access.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`interface User { id: string; name: string }

type UserKeys = keyof User // "id" | "name"

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-orange-400 mb-3">
                🔀 Conditional types
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Typen som väljs beror på ett annat typvillkor.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`type IsString<T> = T extends string ? true : false

type A = IsString<"hej">   // true
type B = IsString<42>      // false`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                🗺️ Mapped types
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Så här är utility types som Partial/Readonly byggda.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`type MyPartial<T> = {
  [K in keyof T]?: T[K]
}

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-red-400 mb-3">
                🧵 Template literal types
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Bygg strängtyper på ett typsäkert sätt.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`type Event = "click" | "hover"
type Handler = \`on\${Capitalize<Event>}\`
// "onClick" | "onHover"`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-pink-400 mb-3">
                🔎 infer - extrahera en typ
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Används inuti en conditional type för att "fånga" en del.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

type A = UnwrapPromise<Promise<string>> // string
type B = UnwrapPromise<number>           // number`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-violet-500">
              <h3 className="text-lg font-bold text-violet-400 mb-3">
                ✅ as const &amp; satisfies
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Två sätt att behålla exakta typer utan att förlora
                  autokomplettering.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const routes = ["/", "/about"] as const
// typ: readonly ["/", "/about"]

const config = {
  color: "red",
} satisfies Record<string, string>
// config.color är fortfarande "red", inte bara string`}
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
