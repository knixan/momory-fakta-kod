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
  "text-red-300",
  "text-blue-300",
  "text-green-300",
  "text-yellow-300",
  "text-purple-300",
  "text-pink-300",
  "text-indigo-300",
  "text-orange-300",
];

const data = [
  {
    id: 1,
    content: "app/router (App Router)",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Filsystem-baserad routing i Next.js App Router",
    type: "description" as const,
    matchId: 1,
    textColor: colors[4],
  },

  {
    id: 3,
    content: "pages vs app",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content:
      "`app/` använder Server Components och layouts`, `pages/` är legacy",
    type: "description" as const,
    matchId: 2,
    textColor: colors[5],
  },

  {
    id: 5,
    content: "layout.tsx",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Delad layout som omsluter undersidor (root layout krävs)",
    type: "description" as const,
    matchId: 3,
    textColor: colors[6],
  },

  {
    id: 7,
    content: "dynamic routes",
    type: "term" as const,
    matchId: 4,
    textColor: colors[3],
  },
  {
    id: 8,
    content: "Parameteriserade segment som [slug] och catch-all",
    type: "description" as const,
    matchId: 4,
    textColor: colors[7],
  },
];

export default function NextjsRoutingGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => initialize(), []);

  const initialize = () => {
    const initial = data.map((c) => ({
      ...c,
      isFlipped: true,
      isMatched: false,
    }));
    setCards([...initial].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatches(0);
    setMoves(0);
    setCompleted(false);
  };

  const select = (id: number) => {
    if (flipped.length === 2) return;
    if (flipped.includes(id)) return;
    if (cards.find((c) => c.id === id)?.isMatched) return;

    const next = [...flipped, id];
    setFlipped(next);
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isSelected: true } : c))
    );

    if (next.length === 2) {
      setMoves((m) => m + 1);
      check(next);
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
      if (nm === data.length / 2) setTimeout(() => setCompleted(true), 900);
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
        <div className="text-center mb-3">
          <div className="text-xl font-bold text-blue-300">
            🧭 Matcha Next.js Routing
          </div>
          <div className="text-sm text-gray-300">
            Matcha termen med rätt förklaring.
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">{matches}</div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{moves}</div>
              <div className="text-sm">Drag</div>
            </div>
          </div>
          <button
            onClick={initialize}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            🔄 Nytt spel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => select(card.id)}
            className={`relative h-28 rounded-lg p-2 ${
              card.isMatched
                ? "scale-0 opacity-0"
                : "cursor-pointer hover:scale-105"
            } transition-all`}
          >
            <div
              className={`absolute inset-0 bg-gray-800 rounded-lg flex flex-col items-center justify-center border-2 p-2 ${
                card.isSelected ? "ring-4 ring-blue-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${card.textColor}`}
              >
                {card.content}
              </div>
              <div className="text-xs text-white mt-1">
                {card.type === "term" ? "🔖" : "📝"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {completed && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 text-center max-w-md mx-4">
            <div className="text-5xl mb-2">🎉</div>
            <h3 className="text-xl font-bold mb-2">Grattis!</h3>
            <p className="text-sm text-gray-700 mb-4">
              Du löste spelet på {moves} drag.
            </p>
            <div className="text-left bg-blue-50 p-3 rounded mb-4 text-sm text-gray-800">
              Next.js Routing: App Router använder filstruktur för routes och
              tillåter nested layouts.
            </div>
            <button
              onClick={initialize}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg p-6 text-white border-2 border-blue-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om Next.js Routing</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📁</span>
              <span className="font-semibold text-blue-300">App Router</span>
            </div>
            <p>Filsystem-baserad routing</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎨</span>
              <span className="font-semibold text-cyan-300">Layouts</span>
            </div>
            <p>Delade UI-komponenter</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔀</span>
              <span className="font-semibold text-green-300">
                Dynamic Routes
              </span>
            </div>
            <p>Parametriserade segment</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📄</span>
              <span className="font-semibold text-yellow-300">Pages</span>
            </div>
            <p>UI för specifika routes</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-blue-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-blue-300">Tips:</span>
          </div>
          <p className="text-sm">
            App Router är modern och rekommenderad - använd Server Components
            som standard och lägg till &apos;use client&apos; endast när
            nödvändigt!
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-blue-400">
            Next.js Routing i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-400 mb-3">
                📁 App Router
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Filsystem-baserad routing där mappar definierar
                  URL-strukturen.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`app/
  page.tsx        → /
  about/
    page.tsx      → /about
  blog/
    [slug]/
      page.tsx    → /blog/:slug`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                🎨 Layouts
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Delade UI-komponenter som bevarar state mellan navigeringar.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-400 mb-3">
                🔀 Dynamic Routes
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Skapa routes baserade på data med [param]-syntax.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// app/blog/[slug]/page.tsx
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <h1>Post: {slug}</h1>
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                📄 Pages
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  UI som renderas för en specifik route.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// app/about/page.tsx
export default function AboutPage() {
  return <h1>Om oss</h1>
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                🎯 Route Groups
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Organisera routes utan att påverka URL.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`app/
  (marketing)/
    about/
      page.tsx    → /about
  (shop)/
    products/
      page.tsx    → /products`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-orange-400 mb-3">
                📊 Catch-all Routes
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Fånga flera URL-segment med [...slug].
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// app/docs/[...slug]/page.tsx
// Matchar /docs/a, /docs/a/b, etc.`}
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
