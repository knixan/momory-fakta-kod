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
  "text-purple-300",
  "text-violet-300",
  "text-fuchsia-300",
  "text-pink-300",
  "text-indigo-300",
  "text-cyan-300",
];

const data = [
  {
    id: 1,
    content: "createBrowserRouter([...])",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Skapar en router baserad på webbläsarens history API",
    type: "description" as const,
    matchId: 1,
    textColor: colors[3],
  },

  {
    id: 3,
    content: "<Link to='/about'>",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Navigerar utan full sidladdning (klientroutning)",
    type: "description" as const,
    matchId: 2,
    textColor: colors[4],
  },

  {
    id: 5,
    content: "useNavigate()",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Navigerar programmatiskt, t.ex. efter en form-submit",
    type: "description" as const,
    matchId: 3,
    textColor: colors[5],
  },
];

export default function ReactViteRoutingGame() {
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
        <div className="text-xl font-bold text-purple-300">
          🧭 Matcha React Router (Vite)
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: begrepp och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">
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
                c.isSelected ? "ring-4 ring-purple-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🧭" : "📝"}
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
              Du klarade Routing-spelet på {moves} drag.
            </p>
            <div className="text-left bg-purple-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Till skillnad från Next.js har Vite ingen inbyggd router -
              react-router-dom sköter all routning manuellt.
            </div>
            <button
              onClick={init}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-purple-900 to-fuchsia-900 rounded-lg p-6 text-white border-2 border-purple-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">
            Snabbfakta om React Router i Vite
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🗺️</span>
              <span className="font-semibold text-purple-300">
                createBrowserRouter
              </span>
            </div>
            <p>Definierar alla routes i en array/config</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔗</span>
              <span className="font-semibold text-violet-300">Link</span>
            </div>
            <p>Klientnavigering utan reload</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📦</span>
              <span className="font-semibold text-fuchsia-300">
                Outlet
              </span>
            </div>
            <p>Renderar matchande barn-route i en layout</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔢</span>
              <span className="font-semibold text-pink-300">
                useParams
              </span>
            </div>
            <p>Läser dynamiska URL-segment, t.ex. :id</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">➡️</span>
              <span className="font-semibold text-indigo-300">
                useNavigate
              </span>
            </div>
            <p>Programmatisk navigering</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔎</span>
              <span className="font-semibold text-cyan-300">
                useSearchParams
              </span>
            </div>
            <p>Läser/uppdaterar query-strängen</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black/20 rounded border-l-4 border-purple-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-purple-300">Tips:</span>
          </div>
          <p className="text-sm">
            Konfigurera din hosting att servera index.html för alla routes
            (SPA fallback), annars ger F5 på en subroute 404.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-purple-400">
            React Router i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                🗺️ Konfigurera routes
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Definiera vilken komponent som renderas för varje path.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/users/:id", element: <User /> },
])

<RouterProvider router={router} />`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-violet-500">
              <h3 className="text-lg font-bold text-violet-400 mb-3">
                🔗 Navigera med Link
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Ersätter vanliga &lt;a&gt;-taggar.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { Link, NavLink } from "react-router-dom"

<Link to="/about">Om oss</Link>
<NavLink to="/" className={({isActive}) =>
  isActive ? "active" : ""
}>Hem</NavLink>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-fuchsia-500">
              <h3 className="text-lg font-bold text-fuchsia-400 mb-3">
                📦 Layouts med Outlet
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Delad layout runt nästlade routes.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`{
  path: "/",
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: "settings", element: <Settings /> },
  ],
}
// I Layout: <Outlet />`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-pink-400 mb-3">
                🔢 Dynamiska segment
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Läs URL-parametrar i komponenten.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { useParams } from "react-router-dom"

function User() {
  const { id } = useParams()
  return <div>User #{id}</div>
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-indigo-500">
              <h3 className="text-lg font-bold text-indigo-400 mb-3">
                ➡️ Programmatisk navigering
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Navigera efter en åtgärd, t.ex. inloggning.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { useNavigate } from "react-router-dom"

const navigate = useNavigate()

async function onSubmit() {
  await login()
  navigate("/dashboard")
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                🔎 Query-parametrar
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Läs och uppdatera ?sok=... i URL:en.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { useSearchParams } from "react-router-dom"

const [params, setParams] = useSearchParams()
const query = params.get("sok")
setParams({ sok: "nästa" })`}
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
