"use client";

import { useState, useEffect } from "react";

interface Card {
  id: number;
  content: string;
  type: "term" | "description";
  matchId: number;
  textColor: string;
  isSelected?: boolean;
  isMatched?: boolean;
}

const colors = [
  "text-yellow-300",
  "text-red-300",
  "text-blue-300",
  "text-purple-300",
  "text-pink-300",
  "text-cyan-300",
];

const cardData: Card[] = [
  {
    id: 1,
    content: "Server Component",
    type: "term",
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Renderas på servern, mindre JS skickas till klienten",
    type: "description",
    matchId: 1,
    textColor: colors[3],
  },

  {
    id: 3,
    content: "Client Component",
    type: "term",
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "`'use client'` krävs för state och effects",
    type: "description",
    matchId: 2,
    textColor: colors[4],
  },

  {
    id: 5,
    content: "useEffect",
    type: "term",
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Körs på klienten efter render för biverkningar",
    type: "description",
    matchId: 3,
    textColor: colors[5],
  },
];

export default function NextjsLifecycleGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  useEffect(() => initialize(), []);

  function initialize() {
    const initialized = cardData.map((c) => ({
      ...c,
      isSelected: false,
      isMatched: false,
    }));
    setCards(initialized.sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatches(0);
    setMoves(0);
    setGameCompleted(false);
  }

  function selectCard(id: number) {
    if (flipped.length === 2) return;
    if (flipped.includes(id)) return;
    if (cards.find((c) => c.id === id && c.isMatched)) return;

    const next = [...flipped, id];
    setFlipped(next);
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isSelected: true } : c))
    );

    if (next.length === 2) {
      setMoves((m) => m + 1);
      checkForMatch(next);
    }
  }

  function checkForMatch(ids: number[]) {
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
      if (nm === cardData.length / 2) {
        setTimeout(() => setGameCompleted(true), 900);
      }
    } else {
      setTimeout(() => {
        setCards((prev) => prev.map((c) => ({ ...c, isSelected: false })));
        setFlipped([]);
      }, 900);
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 text-white">
        <div className="text-center mb-3">
          <div className="text-xl font-bold text-yellow-300">
            🔁 Matcha Next.js Lifecycle
          </div>
          <div className="text-sm text-gray-300">
            Lär dig skillnaden mellan Server / Client components och hooks.
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{moves}</div>
              <div className="text-sm">Drag</div>
            </div>
          </div>
          <button
            onClick={initialize}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold"
          >
            🔄 Nytt spel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => selectCard(card.id)}
            className={`relative h-28 rounded-lg transform transition-all duration-300 ${
              card.isMatched
                ? "scale-0 opacity-0"
                : "cursor-pointer hover:scale-105"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gray-800 rounded-lg flex flex-col items-center justify-center border-2 p-2 ${
                card.isSelected ? "ring-4 ring-yellow-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${card.textColor}`}
              >
                {card.content}
              </div>
              <div className="text-xs opacity-75 mt-1 text-white">
                {card.type === "term" ? "⚙️" : "📝"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Grattis!</h2>
            <p className="text-gray-600 mb-6">
              Du klarade spelet på {moves} drag.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-800">
                <strong>Next.js Lifecycle:</strong> Server Components är
                perfekta för data/SEO, Client Components behövs för
                interaktivitet.
              </p>
            </div>
            <button
              onClick={initialize}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-yellow-900 to-orange-900 rounded-lg p-6 text-white border-2 border-yellow-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om Next.js Lifecycle</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🖥️</span>
              <span className="font-semibold text-yellow-300">
                Server Components
              </span>
            </div>
            <p>Renderas endast på servern</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💻</span>
              <span className="font-semibold text-cyan-300">
                Client Components
              </span>
            </div>
            <p>Kräver &apos;use client&apos;</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚡</span>
              <span className="font-semibold text-green-300">useEffect</span>
            </div>
            <p>Körs efter render på klienten</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔄</span>
              <span className="font-semibold text-pink-300">useState</span>
            </div>
            <p>State management på klienten</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎨</span>
              <span className="font-semibold text-purple-300">Hydration</span>
            </div>
            <p>Gör HTML interaktivt</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📦</span>
              <span className="font-semibold text-orange-300">Bundle Size</span>
            </div>
            <p>Server Components = mindre JS</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-yellow-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-yellow-300">Tips:</span>
          </div>
          <p className="text-sm">
            Använd Server Components som standard och lägg till &apos;use
            client&apos; endast när du behöver interaktivitet, state eller
            browser APIs!
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-yellow-400">
            Next.js Lifecycle i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                🖥️ Server Components
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Renderas endast på servern, skickar HTML till klienten.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// Server Component (standard)
export default async function Page() {
  const data = await fetch('...')
  return <div>{data}</div>
}

// Fördelar:
// • Direkt databasaccess
// • Mindre JavaScript till klienten
// • Bättre SEO och prestanda`}
                  </pre>
                </div>
                <p className="text-yellow-300 font-semibold mt-2">
                  När ska man använda?
                </p>
                <p className="text-gray-300">
                  • Hämta data • Statiskt innehåll • SEO-kritiska sidor
                </p>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                💻 Client Components
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Renderas på klienten, behövs för interaktivitet.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}`}
                  </pre>
                </div>
                <p className="text-cyan-300 font-semibold mt-2">
                  När ska man använda?
                </p>
                <p className="text-gray-300">
                  • Event handlers • State • useEffect • Browser APIs
                </p>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-400 mb-3">
                ⚡ React Hooks
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Hooks fungerar endast i Client Components.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`'use client'

// useState - för state
const [value, setValue] = useState(0)

// useEffect - biverkningar
useEffect(() => {
  // Körs efter render
}, [])

// useContext - dela state
const theme = useContext(ThemeContext)`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                🎨 Hydration
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Processen där React gör server-renderad HTML interaktiv.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`1. Server → Renderar HTML
2. Klient → Tar emot HTML
3. React → "Hydraterar" HTML
4. Resultat → Interaktiv app

// Server Components skickar mindre JS
// = Snabbare hydration`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-pink-400 mb-3">
                🔄 Komposition
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Kombinera Server och Client Components.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// Server Component
export default async function Page() {
  const data = await fetchData()
  
  return (
    <div>
      <h1>{data.title}</h1>
      {/* Client Component för interaktivitet */}
      <LikeButton initialLikes={data.likes} />
    </div>
  )
}`}
                  </pre>
                </div>
                <p className="text-pink-300 font-semibold mt-2">
                  Best Practice:
                </p>
                <p className="text-gray-300">
                  Använd Server Components för layout och data, Client
                  Components för knappar och forms.
                </p>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-orange-400 mb-3">
                📊 Performance Tips
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  •{" "}
                  <strong className="text-yellow-300">
                    Minimera Client Components:
                  </strong>{" "}
                  Mindre JavaScript
                </p>
                <p>
                  •{" "}
                  <strong className="text-yellow-300">Använd Suspense:</strong>{" "}
                  Bättre laddningsupplevelse
                </p>
                <p>
                  • <strong className="text-yellow-300">Server först:</strong>{" "}
                  Data fetching på servern
                </p>
                <p>
                  • <strong className="text-yellow-300">Code splitting:</strong>{" "}
                  Ladda bara vad som behövs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
