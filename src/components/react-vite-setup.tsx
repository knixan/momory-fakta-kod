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
  "text-violet-300",
  "text-yellow-300",
  "text-purple-300",
  "text-amber-300",
  "text-fuchsia-300",
  "text-orange-300",
];

const data = [
  {
    id: 1,
    content: "npm create vite@latest",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Skapar ett nytt Vite-projekt från en mall",
    type: "description" as const,
    matchId: 1,
    textColor: colors[3],
  },

  {
    id: 3,
    content: "HMR (Hot Module Replacement)",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Uppdaterar moduler i webbläsaren utan full omladdning",
    type: "description" as const,
    matchId: 2,
    textColor: colors[4],
  },

  {
    id: 5,
    content: "vite.config.ts",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Konfigurationsfil för plugins, alias och build",
    type: "description" as const,
    matchId: 3,
    textColor: colors[5],
  },
];

export default function ReactViteSetupGame() {
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
        <div className="text-xl font-bold text-violet-300">
          ⚡ Matcha Vite Setup
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: begrepp och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-300">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">
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
                c.isSelected ? "ring-4 ring-violet-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "⚡" : "📝"}
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
              Du klarade Vite Setup-spelet på {moves} drag.
            </p>
            <div className="text-left bg-violet-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Vite använder native ES-moduler i dev-läge, vilket gör
              startup och HMR blixtsnabba jämfört med bundlade dev-servrar.
            </div>
            <button
              onClick={init}
              className="bg-violet-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-violet-900 to-purple-900 rounded-lg p-6 text-white border-2 border-violet-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om Vite</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🚀</span>
              <span className="font-semibold text-violet-300">
                Dev Server
              </span>
            </div>
            <p>Native ESM, ingen bundling i dev-läge</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔥</span>
              <span className="font-semibold text-yellow-300">HMR</span>
            </div>
            <p>Instant uppdatering utan att tappa state</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📦</span>
              <span className="font-semibold text-purple-300">
                Rollup Build
              </span>
            </div>
            <p>Optimerad produktionsbygge med Rollup</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔌</span>
              <span className="font-semibold text-amber-300">
                Plugins
              </span>
            </div>
            <p>@vitejs/plugin-react m.fl.</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌱</span>
              <span className="font-semibold text-fuchsia-300">
                Env Variables
              </span>
            </div>
            <p>import.meta.env.VITE_*</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧭</span>
              <span className="font-semibold text-orange-300">
                Alias
              </span>
            </div>
            <p>resolve.alias för korta importvägar</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-violet-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-violet-300">Tips:</span>
          </div>
          <p className="text-sm">
            Vite serverar moduler on-demand i dev-läge - det är därför appen
            startar direkt oavsett projektstorlek.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-violet-400">
            Vite Setup i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-violet-500">
              <h3 className="text-lg font-bold text-violet-400 mb-3">
                🚀 Skapa ett nytt projekt
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Interaktiv mall-väljare för React + TypeScript m.fl.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                ⚙️ vite.config.ts
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Plugins, alias och server-inställningar.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                🔥 HMR i praktiken
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Sker automatiskt för React-komponenter.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// Ändra JSX i en komponent -> ser
// uppdateringen direkt utan reload
// och utan att förlora useState()`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="text-lg font-bold text-amber-400 mb-3">
                🌱 Environment Variables
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Måste prefixas med VITE_ för att exponeras till klienten.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// .env
VITE_API_URL=https://api.example.com

// I koden
const url = import.meta.env.VITE_API_URL`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-fuchsia-500">
              <h3 className="text-lg font-bold text-fuchsia-400 mb-3">
                🔌 Vanliga plugins
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Utökar Vite med extra funktionalitet.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`plugins: [
  react(),
  svgr(),      // importera SVG som komponenter
  tsconfigPaths(), // läs tsconfig alias
]`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-orange-400 mb-3">
                📁 Projektstruktur
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Standardlayout från mallen.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`index.html   <- entry point (ej i public/)
src/main.tsx <- monterar React-appen
src/App.tsx
vite.config.ts`}
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
