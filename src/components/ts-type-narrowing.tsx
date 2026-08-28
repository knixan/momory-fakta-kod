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
  "text-rose-300",
  "text-pink-300",
  "text-fuchsia-300",
  "text-red-300",
  "text-orange-300",
  "text-amber-300",
  "text-violet-300",
  "text-purple-300",
];

const data = [
  {
    id: 1,
    content: 'typeof x === "string"',
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Typeof-guard - smalnar av typen till string i den grenen",
    type: "description" as const,
    matchId: 1,
    textColor: colors[4],
  },

  {
    id: 3,
    content: "x instanceof Dog",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Instanceof-guard - kontrollerar om x är en instans av klassen",
    type: "description" as const,
    matchId: 2,
    textColor: colors[5],
  },

  {
    id: 5,
    content: '"paws" in animal',
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "In-guard - kontrollerar om en egenskap finns på objektet",
    type: "description" as const,
    matchId: 3,
    textColor: colors[6],
  },

  {
    id: 7,
    content: "function isFish(pet): pet is Fish",
    type: "term" as const,
    matchId: 4,
    textColor: colors[3],
  },
  {
    id: 8,
    content: "Custom type predicate - egen funktion som smalnar av en union",
    type: "description" as const,
    matchId: 4,
    textColor: colors[7],
  },
];

export default function TsTypeNarrowingGame() {
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
        <div className="text-xl font-bold text-rose-300">
          🔍 Matcha Type Narrowing &amp; Guards
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: guard och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-300">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-300">{moves}</div>
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
                c.isSelected ? "ring-4 ring-rose-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🔍" : "📝"}
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
              Du klarade Type Narrowing-spelet på {moves} drag.
            </p>
            <div className="text-left bg-rose-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Type guards körs vid runtime - TypeScript använder
              resultatet för att smalna av typen bara inom den if-grenen.
            </div>
            <button
              onClick={init}
              className="bg-rose-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-rose-900 to-pink-900 rounded-lg p-6 text-white border-2 border-rose-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">
            Snabbfakta om Type Narrowing
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔤</span>
              <span className="font-semibold text-rose-300">typeof</span>
            </div>
            <p>Fungerar för primitiver: string, number, boolean m.fl.</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🏷️</span>
              <span className="font-semibold text-pink-300">
                instanceof
              </span>
            </div>
            <p>Fungerar för klasser och deras instanser</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔑</span>
              <span className="font-semibold text-fuchsia-300">in</span>
            </div>
            <p>Kollar om en egenskap existerar på objektet</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎯</span>
              <span className="font-semibold text-orange-300">
                Discriminated Union
              </span>
            </div>
            <p>En gemensam &quot;tag&quot;-egenskap skiljer varianterna åt</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🛠️</span>
              <span className="font-semibold text-amber-300">
                Type Predicate
              </span>
            </div>
            <p>Egen funktion: `param is Typ`</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🚫</span>
              <span className="font-semibold text-violet-300">
                never
              </span>
            </div>
            <p>Exhaustiveness check fångar ohanterade fall</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black/20 rounded border-l-4 border-rose-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-rose-300">Tips:</span>
          </div>
          <p className="text-sm">
            Lägg till ett `default`-fall som tilldelar värdet till en
            `never`-variabel - då varnar TypeScript dig om du glömmer
            hantera en ny variant i en union.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-rose-400">
            Type Narrowing &amp; Guards i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-rose-500">
              <h3 className="text-lg font-bold text-rose-400 mb-3">
                🔤 typeof-guard
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Smalnar av unioner av primitiver.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`function print(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()) // id är string här
  } else {
    console.log(id.toFixed(2))    // id är number här
  }
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-pink-400 mb-3">
                🏷️ instanceof-guard
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Fungerar för klasser, inte plain objects.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`class Dog { bark() {} }
class Cat { meow() {} }

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark()
  } else {
    animal.meow()
  }
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-fuchsia-500">
              <h3 className="text-lg font-bold text-fuchsia-400 mb-3">
                🔑 in-guard
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Praktiskt för plain objects utan klasser.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`type Fish = { swim: () => void }
type Bird = { fly: () => void }

function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    pet.swim()
  } else {
    pet.fly()
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-orange-400 mb-3">
                🎯 Discriminated unions
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Den tydligaste och säkraste formen av narrowing.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`type Result =
  | { status: "success"; data: string }
  | { status: "error"; message: string }

function handle(result: Result) {
  if (result.status === "success") {
    console.log(result.data)
  } else {
    console.log(result.message)
  }
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="text-lg font-bold text-amber-400 mb-3">
                🛠️ Egna type predicates
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Kapsla in komplex kontrollogik i en återanvändbar funktion.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`type Fish = { swim: () => void }
type Bird = { fly: () => void }

function isFish(pet: Fish | Bird): pet is Fish {
  return "swim" in pet
}

if (isFish(pet)) pet.swim()`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-violet-500">
              <h3 className="text-lg font-bold text-violet-400 mb-3">
                🚫 Exhaustiveness med never
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Fångar upp när du glömt ett fall i en switch.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`function assertNever(x: never): never {
  throw new Error("Ohanterat fall: " + x)
}

switch (result.status) {
  case "success": return result.data
  case "error": return result.message
  default: return assertNever(result)
}`}
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
