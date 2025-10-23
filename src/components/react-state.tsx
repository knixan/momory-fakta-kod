"use client";

import { useState, useEffect } from "react";

interface Card {
  id: number;
  content: string;
  type: "concept" | "description";
  matchId: number;
  textColor: string;
  isFlipped: boolean;
  isMatched: boolean;
  isSelected?: boolean;
}

const cardColors = [
  "text-red-300",
  "text-blue-300",
  "text-green-300",
  "text-yellow-300",
  "text-purple-300",
  "text-pink-300",
];

const cardData = [
  {
    id: 1,
    content: "Local State",
    type: "concept" as const,
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: "State som bara används i en komponent (useState)",
    type: "description" as const,
    matchId: 1,
    textColor: cardColors[3],
  },

  {
    id: 3,
    content: "Lifting State Up",
    type: "concept" as const,
    matchId: 2,
    textColor: cardColors[1],
  },
  {
    id: 4,
    content: "Flytta state till närmaste gemensamma förälder",
    type: "description" as const,
    matchId: 2,
    textColor: cardColors[4],
  },

  {
    id: 5,
    content: "Context API",
    type: "concept" as const,
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: "Dela state globalt utan prop drilling",
    type: "description" as const,
    matchId: 3,
    textColor: cardColors[5],
  },
];

export default function ReactStateGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => init(), []);

  const init = () => {
    setCards(
      cardData
        .map((c) => ({ ...c, isFlipped: true, isMatched: false }))
        .sort(() => Math.random() - 0.5)
    );
    setFlipped([]);
    setMatches(0);
    setMoves(0);
    setDone(false);
  };

  const select = (id: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(id) ||
      cards.find((c) => c.id === id)?.isMatched
    )
      return;
    const next = [...flipped, id];
    setFlipped(next);
    setCards((p) =>
      p.map((c) => (c.id === id ? { ...c, isSelected: true } : c))
    );
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      const ca = cards.find((c) => c.id === a),
        cb = cards.find((c) => c.id === b);
      if (ca && cb && ca.matchId === cb.matchId) {
        setTimeout(() => {
          setCards((p) =>
            p.map((c) =>
              next.includes(c.id)
                ? { ...c, isMatched: true, isSelected: false }
                : { ...c, isSelected: false }
            )
          );
          setFlipped([]);
        }, 700);
        const nm = matches + 1;
        setMatches(nm);
        if (nm === 3) setTimeout(() => setDone(true), 900);
      } else {
        setTimeout(() => {
          setCards((p) => p.map((c) => ({ ...c, isSelected: false })));
          setFlipped([]);
        }, 900);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 text-white">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-purple-400 mb-2">
            🔄 Matcha State Management!
          </div>
          <div className="text-sm text-gray-300">
            Matcha koncept med beskrivning.
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{moves}</div>
              <div className="text-sm">Drag</div>
            </div>
          </div>
          <button
            onClick={init}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold"
          >
            🔄 Nytt spel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div
            key={c.id}
            onClick={() => select(c.id)}
            className={`relative h-32 transform transition-all duration-500 ${
              c.isMatched
                ? "scale-0 opacity-0"
                : "scale-100 cursor-pointer hover:scale-105"
            }`}
          >
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-gray-800 rounded-lg border-2 shadow-lg p-2 ${
                c.isSelected
                  ? "ring-4 ring-purple-400 border-purple-300"
                  : "border-gray-300"
              } transition-all`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs opacity-75 mt-1 text-white">
                {c.type === "concept" ? "🔄" : "📝"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {done && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Grattis!</h2>
            <p className="text-gray-600 mb-6">
              Du klarade spelet på {moves} drag!
            </p>
            <div className="bg-purple-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <strong>State Management:</strong> Hantera applikationens data
                och tillstånd effektivt.
              </p>
            </div>
            <button
              onClick={init}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg p-6 text-white border-2 border-purple-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om State Management</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📍</span>
              <span className="font-semibold text-purple-300">Local State</span>
            </div>
            <p>State i komponenten</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⬆️</span>
              <span className="font-semibold text-cyan-300">Lifting Up</span>
            </div>
            <p>Dela mellan barn</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌐</span>
              <span className="font-semibold text-green-300">Context</span>
            </div>
            <p>Global state</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📦</span>
              <span className="font-semibold text-yellow-300">Redux</span>
            </div>
            <p>State management lib</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚡</span>
              <span className="font-semibold text-orange-300">Zustand</span>
            </div>
            <p>Enkel state manager</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔮</span>
              <span className="font-semibold text-pink-300">Jotai</span>
            </div>
            <p>Atomic state</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-purple-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-purple-300">Tips:</span>
          </div>
          <p className="text-sm">
            Börja med lokal state, använd Context för teaming, och external libs
            (Redux/Zustand) för stora appar!
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-purple-400">
            State Management i djupet
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                📍 Local State
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  State som hanteras i en enskild komponent.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>{`const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isOpen, setIsOpen] = useState(false);

// Bara denna komponent har access`}</pre>
                </div>
              </div>
            </div>
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                ⬆️ Lifting State Up
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Flytta state till gemensam förälder.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>{`function Parent() {
  const [data, setData] = useState('');
  return (
    <>
      <Child1 data={data} />
      <Child2 setData={setData} />
    </>
  );
}`}</pre>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-400 mb-3">
                🌐 Context API
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Dela state globalt utan prop drilling.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>{`const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <Child />
    </ThemeContext.Provider>
  );
}`}</pre>
                </div>
              </div>
            </div>
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                📦 External Libraries
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  • <strong className="text-purple-300">Redux:</strong>{" "}
                  Kompletta appar med middleware
                </p>
                <p>
                  • <strong className="text-purple-300">Zustand:</strong> Enkel
                  och minimal
                </p>
                <p>
                  • <strong className="text-purple-300">Jotai:</strong> Atomic
                  state management
                </p>
                <p>
                  • <strong className="text-purple-300">Recoil:</strong>{" "}
                  Facebook&apos;s state lib
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
