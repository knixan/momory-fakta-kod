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
  "text-violet-300",
  "text-pink-300",
  "text-cyan-300",
];

const data = [
  {
    id: 1,
    content: "vite build",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Bygger en optimerad produktionsversion med Rollup",
    type: "description" as const,
    matchId: 1,
    textColor: colors[3],
  },

  {
    id: 3,
    content: "React.lazy() + Suspense",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Delar upp koden i mindre bundlar (code splitting)",
    type: "description" as const,
    matchId: 2,
    textColor: colors[4],
  },

  {
    id: 5,
    content: "vite preview",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Kör produktionsbygget lokalt för test innan deploy",
    type: "description" as const,
    matchId: 3,
    textColor: colors[5],
  },
];

export default function ReactViteBuildGame() {
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
          📦 Matcha Vite Build &amp; Env
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: begrepp och beskrivning.
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
                c.isSelected ? "ring-4 ring-amber-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "📦" : "📝"}
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
              Du klarade Build-spelet på {moves} drag.
            </p>
            <div className="text-left bg-amber-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Kör alltid vite preview innan deploy för att testa den
              faktiska produktionsbundlen, inte bara dev-servern.
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
            Snabbfakta om Build &amp; Optimering
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📦</span>
              <span className="font-semibold text-amber-300">
                Rollup
              </span>
            </div>
            <p>Bundlar produktionskoden effektivt</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✂️</span>
              <span className="font-semibold text-orange-300">
                Code Splitting
              </span>
            </div>
            <p>Laddar bara koden som behövs per route</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌳</span>
              <span className="font-semibold text-yellow-300">
                Tree Shaking
              </span>
            </div>
            <p>Tar bort oanvänd kod automatiskt</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔑</span>
              <span className="font-semibold text-violet-300">
                Env Modes
              </span>
            </div>
            <p>.env, .env.production, .env.development</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🗂️</span>
              <span className="font-semibold text-pink-300">
                Asset Hashing
              </span>
            </div>
            <p>Filnamn med hash för cache-busting</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">👀</span>
              <span className="font-semibold text-cyan-300">
                Preview
              </span>
            </div>
            <p>Testa produktionsbygget lokalt</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-amber-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-amber-300">Tips:</span>
          </div>
          <p className="text-sm">
            Använd React.lazy() för tunga sidor/rutter som inte alla
            användare besöker - det minskar den initiala bundle-storleken.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-amber-400">
            Vite Build &amp; Env i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="text-lg font-bold text-amber-400 mb-3">
                📦 Bygga för produktion
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Genererar en dist/-mapp redo att deployas.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`npm run build
# -> dist/index.html
# -> dist/assets/index-[hash].js

npm run preview
# Serverar dist/ lokalt på :4173`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-orange-400 mb-3">
                ✂️ Code Splitting med lazy
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Ladda tunga komponenter först när de behövs.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { lazy, Suspense } from "react"

const Dashboard = lazy(() => import("./Dashboard"))

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                🌳 Tree Shaking
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Importera bara det du faktiskt använder.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// Bra - tree-shakeable
import { debounce } from "lodash-es"

// Dåligt - drar in hela biblioteket
import _ from "lodash"`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-violet-500">
              <h3 className="text-lg font-bold text-violet-400 mb-3">
                🔑 Environment-lägen
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Olika .env-filer per läge.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`.env                 # alla lägen
.env.development     # npm run dev
.env.production       # npm run build

vite build --mode staging
# -> läser .env.staging`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-pink-400 mb-3">
                🗂️ Statiska assets
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  public/ kopieras oförändrad, src/assets hashas.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import logo from "./assets/logo.png"
// -> /assets/logo-a1b2c3.png

// public/favicon.ico -> /favicon.ico (oförändrad)`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                ⚙️ Manuella chunks
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Styr hur Rollup grupperar filer.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ["react", "react-dom"],
      },
    },
  },
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
