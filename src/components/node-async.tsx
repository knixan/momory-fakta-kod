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
  "text-lime-300",
  "text-green-300",
  "text-emerald-300",
  "text-teal-300",
  "text-cyan-300",
  "text-yellow-300",
  "text-amber-300",
  "text-orange-300",
];

const data = [
  {
    id: 1,
    content: "process.nextTick(fn)",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Kör en callback direkt efter aktuell operation, före event loop",
    type: "description" as const,
    matchId: 1,
    textColor: colors[4],
  },

  {
    id: 3,
    content: "setTimeout(fn, 0)",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Kör en callback i timers-fasen av event loop",
    type: "description" as const,
    matchId: 2,
    textColor: colors[5],
  },

  {
    id: 5,
    content: "Promise.all([...])",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Väntar in flera promises parallellt",
    type: "description" as const,
    matchId: 3,
    textColor: colors[6],
  },

  {
    id: 7,
    content: "async/await",
    type: "term" as const,
    matchId: 4,
    textColor: colors[3],
  },
  {
    id: 8,
    content: "Syntax för att skriva asynkron kod som ser synkron ut",
    type: "description" as const,
    matchId: 4,
    textColor: colors[7],
  },
];

export default function NodeAsyncGame() {
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
        <div className="text-xl font-bold text-lime-300">
          🔁 Matcha Event Loop &amp; Async
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: begrepp och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-lime-300">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">
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
                c.isSelected ? "ring-4 ring-lime-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🔁" : "📝"}
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
              Du klarade Event Loop-spelet på {moves} drag.
            </p>
            <div className="text-left bg-lime-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: process.nextTick() och mikrotasks (promises) körs alltid
              före makrotasks som setTimeout, oavsett delay.
            </div>
            <button
              onClick={init}
              className="bg-lime-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-lime-900 to-green-900 rounded-lg p-6 text-white border-2 border-lime-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">
            Snabbfakta om Event Loop &amp; Async
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔂</span>
              <span className="font-semibold text-lime-300">
                Event Loop
              </span>
            </div>
            <p>Faser: timers, pending, poll, check, close</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚡</span>
              <span className="font-semibold text-green-300">
                Microtasks
              </span>
            </div>
            <p>Promises och nextTick körs mellan varje fas</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⏱️</span>
              <span className="font-semibold text-emerald-300">
                Macrotasks
              </span>
            </div>
            <p>setTimeout, setInterval, I/O-callbacks</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🤝</span>
              <span className="font-semibold text-teal-300">Promise</span>
            </div>
            <p>Representerar ett framtida värde</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✍️</span>
              <span className="font-semibold text-cyan-300">
                async/await
              </span>
            </div>
            <p>Syntaktiskt socker ovanpå promises</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧵</span>
              <span className="font-semibold text-yellow-300">
                Single-threaded
              </span>
            </div>
            <p>Node kör JS på en tråd, I/O sköts av libuv</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-lime-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-lime-300">Tips:</span>
          </div>
          <p className="text-sm">
            Blockera aldrig event loop med tunga synkrona operationer - det
            fryser hela servern för alla samtidiga requests.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-lime-400">
            Event Loop &amp; Async i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-lime-500">
              <h3 className="text-lg font-bold text-lime-400 mb-3">
                🔂 Körordning
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Microtasks töms helt innan nästa fas körs.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`console.log("1")
setTimeout(() => console.log("2"), 0)
Promise.resolve().then(() => console.log("3"))
console.log("4")
// Output: 1, 4, 3, 2`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-400 mb-3">
                🤝 Promise-kedjor
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Hantera flera steg av async.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`fetchUser(id)
  .then((user) => fetchPosts(user.id))
  .then((posts) => console.log(posts))
  .catch((err) => console.error(err))`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-emerald-500">
              <h3 className="text-lg font-bold text-emerald-400 mb-3">
                ✍️ async/await
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Läsbart alternativ till .then()-kedjor.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`async function getData() {
  try {
    const user = await fetchUser(id)
    const posts = await fetchPosts(user.id)
    return posts
  } catch (err) {
    console.error(err)
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-teal-400 mb-3">
                🚀 Promise.all vs allSettled
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Parallell körning med olika felhantering.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// Avbryts om EN misslyckas
const [a, b] = await Promise.all([p1, p2])

// Väntar in alla, oavsett resultat
const results = await Promise.allSettled([p1, p2])`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                🧵 Blockera inte tråden
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Undvik synkrona I/O-anrop i servrar.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// Dåligt - blockerar hela servern
const data = fs.readFileSync("big.json")

// Bra - släpper tråden medan den väntar
const data = await fs.promises.readFile("big.json")`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                🛠️ EventEmitter
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Grunden för många asynkrona Node-API:er.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { EventEmitter } from "events"

const bus = new EventEmitter()
bus.on("data", (chunk) => console.log(chunk))
bus.emit("data", "hej")`}
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
