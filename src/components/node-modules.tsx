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
  "text-green-300",
  "text-lime-300",
  "text-emerald-300",
  "text-yellow-300",
  "text-teal-300",
  "text-cyan-300",
  "text-amber-300",
  "text-orange-300",
];

const data = [
  {
    id: 1,
    content: "require('module')",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Importerar en modul med CommonJS-syntax",
    type: "description" as const,
    matchId: 1,
    textColor: colors[4],
  },

  {
    id: 3,
    content: "module.exports",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Exporterar värden från en CommonJS-modul",
    type: "description" as const,
    matchId: 2,
    textColor: colors[5],
  },

  {
    id: 5,
    content: "import x from 'module'",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Importerar en modul med ES Modules-syntax",
    type: "description" as const,
    matchId: 3,
    textColor: colors[6],
  },

  {
    id: 7,
    content: "\"type\": \"module\"",
    type: "term" as const,
    matchId: 4,
    textColor: colors[3],
  },
  {
    id: 8,
    content: "Aktiverar ES Modules i package.json",
    type: "description" as const,
    matchId: 4,
    textColor: colors[7],
  },
];

export default function NodeModulesGame() {
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
        <div className="text-xl font-bold text-green-300">
          🟩 Matcha Node.js Moduler
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: syntax och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-lime-300">{moves}</div>
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
                c.isSelected ? "ring-4 ring-green-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🟩" : "📝"}
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
              Du klarade Node.js Moduler-spelet på {moves} drag.
            </p>
            <div className="text-left bg-green-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Du kan inte blanda require() och import fritt i samma
              fil - filändelsen (.mjs/.cjs) eller package.json styr vilket
              modulsystem som gäller.
            </div>
            <button
              onClick={init}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-green-900 to-emerald-900 rounded-lg p-6 text-white border-2 border-green-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om Node.js Moduler</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📦</span>
              <span className="font-semibold text-green-300">
                CommonJS
              </span>
            </div>
            <p>require/module.exports, Node.js standard historiskt</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📥</span>
              <span className="font-semibold text-lime-300">
                ES Modules
              </span>
            </div>
            <p>import/export, moderna standarden</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧾</span>
              <span className="font-semibold text-emerald-300">
                package.json
              </span>
            </div>
            <p>&quot;type&quot;: &quot;module&quot; styr default-läge</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📂</span>
              <span className="font-semibold text-yellow-300">
                .mjs / .cjs
              </span>
            </div>
            <p>Filändelser som tvingar ett specifikt modulsystem</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌍</span>
              <span className="font-semibold text-teal-300">
                Global scope
              </span>
            </div>
            <p>__dirname/__filename finns endast i CommonJS</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧩</span>
              <span className="font-semibold text-cyan-300">
                Dynamic import()
              </span>
            </div>
            <p>Asynkron import, fungerar i båda systemen</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-green-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-green-300">Tips:</span>
          </div>
          <p className="text-sm">
            Nya projekt bör använda ES Modules - de stöds nativt av
            webbläsaren, är statiskt analyserbara och möjliggör tree shaking.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-green-400">
            Node.js Moduler i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-400 mb-3">
                📦 CommonJS
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Synkron, klassisk Node.js-modulsyntax.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// math.js
function add(a, b) { return a + b }
module.exports = { add }

// app.js
const { add } = require("./math")
console.log(add(2, 3))`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-lime-500">
              <h3 className="text-lg font-bold text-lime-400 mb-3">
                📥 ES Modules
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Standardiserad syntax, delas med webbläsaren.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// math.mjs
export function add(a, b) { return a + b }

// app.mjs
import { add } from "./math.mjs"
console.log(add(2, 3))`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-emerald-500">
              <h3 className="text-lg font-bold text-emerald-400 mb-3">
                🧾 Aktivera ESM i package.json
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Gör att .js-filer tolkas som ES Modules.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`{
  "name": "my-app",
  "type": "module"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                📂 __dirname i ESM
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Måste härledas manuellt eftersom det inte finns i ESM.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-teal-400 mb-3">
                🧩 Dynamic import()
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Ladda moduler villkorat eller lazy.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`if (needsFeature) {
  const { feature } = await import("./feature.js")
  feature()
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                📊 CommonJS vs ESM
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  • <strong className="text-green-300">CommonJS:</strong>{" "}
                  Synkron, require() kan anropas villkorat
                </p>
                <p>
                  • <strong className="text-green-300">ESM:</strong>{" "}
                  Statiska imports, top-level await
                </p>
                <p>
                  • <strong className="text-green-300">Interop:</strong> ESM
                  kan importera CommonJS, men inte tvärtom (synkront)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
