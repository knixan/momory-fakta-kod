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
  "text-emerald-300",
  "text-cyan-300",
  "text-yellow-300",
  "text-pink-300",
  "text-violet-300",
  "text-orange-300",
];

const data = [
  {
    id: 1,
    content: "fetch (browser)",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Hämtar data i klienten med fetch API",
    type: "description" as const,
    matchId: 1,
    textColor: colors[3],
  },

  {
    id: 3,
    content: "getServerSideProps (pages)",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Server-renderat vid varje request (Pages Router)",
    type: "description" as const,
    matchId: 2,
    textColor: colors[4],
  },

  {
    id: 5,
    content: "getStaticProps",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Prerendera content vid build time (statisk)",
    type: "description" as const,
    matchId: 3,
    textColor: colors[5],
  },
];

export default function NextjsDataFetchGame() {
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
        <div className="text-xl font-bold text-emerald-300">
          🔁 Matcha Data Fetching
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: metod och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-300">
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
                c.isSelected ? "ring-4 ring-emerald-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "📡" : "📝"}
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
              Du klarade Data Fetching-spelet på {moves} drag.
            </p>
            <div className="text-left bg-emerald-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Använd rätt rendering/strategi baserat på hur ofta datan
              ändras.
            </div>
            <button
              onClick={init}
              className="bg-emerald-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-emerald-900 to-teal-900 rounded-lg p-6 text-white border-2 border-emerald-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om Data Fetching</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚡</span>
              <span className="font-semibold text-emerald-300">SSR</span>
            </div>
            <p>Server-Side Rendering</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🏗️</span>
              <span className="font-semibold text-cyan-300">SSG</span>
            </div>
            <p>Static Site Generation</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔄</span>
              <span className="font-semibold text-yellow-300">ISR</span>
            </div>
            <p>Incremental Static Regeneration</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💻</span>
              <span className="font-semibold text-pink-300">CSR</span>
            </div>
            <p>Client-Side Rendering</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎯</span>
              <span className="font-semibold text-orange-300">Fetch</span>
            </div>
            <p>Hämta data i komponenter</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📦</span>
              <span className="font-semibold text-purple-300">Caching</span>
            </div>
            <p>Automatisk cache-hantering</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-emerald-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-emerald-300">Tips:</span>
          </div>
          <p className="text-sm">
            Använd Server Components för data fetching när det är möjligt - det
            minskar JavaScript-bundeln och förbättrar prestandan!
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-emerald-400">
            Data Fetching i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-emerald-500">
              <h3 className="text-lg font-bold text-emerald-400 mb-3">
                ⚡ Server-Side Rendering (SSR)
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Data hämtas vid varje request på servern.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// App Router - Server Component
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store' // Inaktivera cache
  })
  return <div>{data}</div>
}`}
                  </pre>
                </div>
                <p className="text-emerald-300 font-semibold mt-2">
                  Användningsfall:
                </p>
                <p className="text-gray-300">
                  • Realtidsdata • Personaliserat innehåll • Ofta uppdaterad
                  data
                </p>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                🏗️ Static Site Generation (SSG)
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Sidor genereras vid build time.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// App Router - cachad som standard
export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  // Cachad automatiskt
  return <div>{data}</div>
}`}
                  </pre>
                </div>
                <p className="text-cyan-300 font-semibold mt-2">
                  Användningsfall:
                </p>
                <p className="text-gray-300">
                  • Blogg-posts • Dokumentation • Statiskt innehåll
                </p>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                🔄 Incremental Static Regeneration (ISR)
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Uppdatera statiska sidor efter deploy.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Revalidera varje timme
  })
  return <div>{data}</div>
}`}
                  </pre>
                </div>
                <p className="text-yellow-300 font-semibold mt-2">
                  Användningsfall:
                </p>
                <p className="text-gray-300">
                  • E-handel • Nyheter • Semi-statiskt innehåll
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-pink-400 mb-3">
                💻 Client-Side Rendering (CSR)
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Data hämtas i webbläsaren efter initial render.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(setData)
  }, [])
  
  return <div>{data}</div>
}`}
                  </pre>
                </div>
                <p className="text-pink-300 font-semibold mt-2">
                  Användningsfall:
                </p>
                <p className="text-gray-300">
                  • Dashboards • Användarspecifik data • Interaktiva widgets
                </p>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                🎯 Fetch i Server Components
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Extended fetch API med caching och revalidering.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// Automatisk cache
fetch('https://api.example.com')

// Force cache
fetch('...', { cache: 'force-cache' })

// No cache
fetch('...', { cache: 'no-store' })

// Revalidate
fetch('...', { next: { revalidate: 60 } })`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-orange-400 mb-3">
                📊 Välja rätt strategi
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  • <strong className="text-emerald-300">SSG:</strong> Bäst för
                  statiskt innehåll
                </p>
                <p>
                  • <strong className="text-emerald-300">ISR:</strong> Balans
                  mellan statiskt och dynamiskt
                </p>
                <p>
                  • <strong className="text-emerald-300">SSR:</strong> För
                  realtidsdata
                </p>
                <p>
                  • <strong className="text-emerald-300">CSR:</strong> För
                  klientspecifik data
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
