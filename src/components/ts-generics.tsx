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
  "text-indigo-300",
  "text-violet-300",
  "text-purple-300",
  "text-blue-300",
  "text-sky-300",
  "text-cyan-300",
  "text-fuchsia-300",
  "text-pink-300",
];

const data = [
  {
    id: 1,
    content: "function identity<T>(value: T): T",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Generisk funktion som bevarar typen på argumentet den får in",
    type: "description" as const,
    matchId: 1,
    textColor: colors[4],
  },

  {
    id: 3,
    content: "<T extends { length: number }>",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Generic constraint - begränsar T till typer som har length",
    type: "description" as const,
    matchId: 2,
    textColor: colors[5],
  },

  {
    id: 5,
    content: "class Box<T> { value: T }",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Generisk klass som fungerar med valfri typ",
    type: "description" as const,
    matchId: 3,
    textColor: colors[6],
  },

  {
    id: 7,
    content: "<T = string>",
    type: "term" as const,
    matchId: 4,
    textColor: colors[3],
  },
  {
    id: 8,
    content: "Default type parameter - används om ingen typ anges explicit",
    type: "description" as const,
    matchId: 4,
    textColor: colors[7],
  },
];

export default function TsGenericsGame() {
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
        <div className="text-xl font-bold text-indigo-300">
          🧬 Matcha TypeScript Generics
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: syntax och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-300">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-300">
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
                c.isSelected ? "ring-4 ring-indigo-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🧬" : "📝"}
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
              Du klarade Generics-spelet på {moves} drag.
            </p>
            <div className="text-left bg-indigo-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Generics låter dig skriva återanvändbar kod utan att
              tappa typsäkerhet - tänk på T som en variabel, fast för typer.
            </div>
            <button
              onClick={init}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-indigo-900 to-violet-900 rounded-lg p-6 text-white border-2 border-indigo-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om Generics</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔤</span>
              <span className="font-semibold text-indigo-300">
                Type Parameter
              </span>
            </div>
            <p>T, K, V - konventionsnamn för generiska typer</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🚧</span>
              <span className="font-semibold text-violet-300">
                Constraint
              </span>
            </div>
            <p>extends begränsar vilka typer T får vara</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎁</span>
              <span className="font-semibold text-purple-300">
                Default Type
              </span>
            </div>
            <p>&lt;T = string&gt; ger ett standardvärde</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧩</span>
              <span className="font-semibold text-blue-300">
                Generic Interface
              </span>
            </div>
            <p>interface Box&lt;T&gt; { "{ value: T }" }</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🏗️</span>
              <span className="font-semibold text-sky-300">
                Generic Class
              </span>
            </div>
            <p>class Stack&lt;T&gt; hanterar valfri datatyp</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔢</span>
              <span className="font-semibold text-cyan-300">
                Flera parametrar
              </span>
            </div>
            <p>&lt;K, V&gt; - t.ex. Map&lt;K, V&gt;</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black/20 rounded border-l-4 border-indigo-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-indigo-300">Tips:</span>
          </div>
          <p className="text-sm">
            Om du bara använder T en gång i en funktion behöver du kanske
            inte generics alls - fråga dig om typen faktiskt varierar mellan
            anrop.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-indigo-400">
            TypeScript Generics i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-indigo-500">
              <h3 className="text-lg font-bold text-indigo-400 mb-3">
                🔤 Generiska funktioner
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  T bestäms av vilken typ som faktiskt skickas in.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`function identity<T>(value: T): T {
  return value
}

identity<string>("hej") // T = string
identity(42)             // T härleds till number`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-violet-500">
              <h3 className="text-lg font-bold text-violet-400 mb-3">
                🚧 Constraints med extends
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Begränsa T till typer som har vissa egenskaper.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`function logLength<T extends { length: number }>(item: T) {
  console.log(item.length)
}

logLength("hej")       // OK - string har length
logLength([1, 2, 3])   // OK - array har length
logLength(42)          // Fel - number har ingen length`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                🎁 Default type parameters
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Ge T ett standardvärde om inget anges.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`interface ApiResponse<T = unknown> {
  data: T
  status: number
}

const res: ApiResponse = { data: "ok", status: 200 }`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-400 mb-3">
                🧩 Generiska interfaces
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Beskriv en form som fungerar för flera typer.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`interface Box<T> {
  value: T
}

const numberBox: Box<number> = { value: 42 }
const stringBox: Box<string> = { value: "hej" }`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-sky-500">
              <h3 className="text-lg font-bold text-sky-400 mb-3">
                🏗️ Generiska klasser
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  En återanvändbar datastruktur, t.ex. en Stack.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`class Stack<T> {
  private items: T[] = []
  push(item: T) { this.items.push(item) }
  pop(): T | undefined { return this.items.pop() }
}

const numbers = new Stack<number>()`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                🔢 Flera typparametrar
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Vanligt i inbyggda typer som Map och Record.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`function merge<A, B>(a: A, b: B): A & B {
  return { ...a, ...b }
}

const result = merge({ name: "Elin" }, { age: 30 })
// { name: string } & { age: number }`}
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
