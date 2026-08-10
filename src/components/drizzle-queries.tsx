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
  "text-emerald-300",
  "text-teal-300",
  "text-cyan-300",
  "text-sky-300",
  "text-yellow-300",
];

const data = [
  {
    id: 1,
    content: "db.select().from(users)",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Hämtar alla rader från users-tabellen",
    type: "description" as const,
    matchId: 1,
    textColor: colors[3],
  },

  {
    id: 3,
    content: "db.insert(users).values({...})",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Lägger till en ny rad i tabellen",
    type: "description" as const,
    matchId: 2,
    textColor: colors[4],
  },

  {
    id: 5,
    content: "db.query.users.findMany({ with: {...} })",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Hämtar rader inklusive relaterad data",
    type: "description" as const,
    matchId: 3,
    textColor: colors[5],
  },
];

export default function DrizzleQueriesGame() {
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
          🔎 Matcha Drizzle Queries
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: metod och beskrivning.
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
              <div className="text-2xl font-bold text-emerald-300">
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
                c.isSelected ? "ring-4 ring-lime-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🔎" : "📝"}
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
              Du klarade Drizzle Queries-spelet på {moves} drag.
            </p>
            <div className="text-left bg-lime-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: db.query.* ger dig relationell data i ett anrop, medan
              db.select() ger dig SQL-liknande kontroll.
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
      <div className="mt-6 bg-gradient-to-r from-lime-900 to-emerald-900 rounded-lg p-6 text-white border-2 border-lime-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om Drizzle Queries</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📥</span>
              <span className="font-semibold text-lime-300">Select</span>
            </div>
            <p>SQL-liknande query builder</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">➕</span>
              <span className="font-semibold text-emerald-300">Insert</span>
            </div>
            <p>.values() + .returning() för Postgres</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✏️</span>
              <span className="font-semibold text-teal-300">Update</span>
            </div>
            <p>.set({}).where(eq(col, val))</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🗑️</span>
              <span className="font-semibold text-cyan-300">Delete</span>
            </div>
            <p>db.delete(table).where(...)</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧭</span>
              <span className="font-semibold text-sky-300">
                Relational API
              </span>
            </div>
            <p>db.query.table.findMany/findFirst</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧮</span>
              <span className="font-semibold text-yellow-300">
                Operatorer
              </span>
            </div>
            <p>eq, and, or, gt, like m.fl.</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-lime-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-lime-300">Tips:</span>
          </div>
          <p className="text-sm">
            Drizzle genererar SQL på ett förutsägbart sätt - du kan alltid
            logga frågan med .toSQL() för att se exakt vad som skickas.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-lime-400">
            Drizzle Queries i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-lime-500">
              <h3 className="text-lg font-bold text-lime-400 mb-3">
                📥 Select med filter
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  where, orderBy, limit precis som SQL.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { eq, desc } from "drizzle-orm"

const activeUsers = await db
  .select()
  .from(users)
  .where(eq(users.active, true))
  .orderBy(desc(users.createdAt))
  .limit(10)`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-emerald-500">
              <h3 className="text-lg font-bold text-emerald-400 mb-3">
                ➕ Insert &amp; Update
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  .returning() ger tillbaka de skapade/ändrade raderna.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const [newUser] = await db
  .insert(users)
  .values({ name: "Elin", email: "e@x.se" })
  .returning()

await db.update(users)
  .set({ active: false })
  .where(eq(users.id, id))`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-teal-400 mb-3">
                🗑️ Delete
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Ta bort rader villkorat.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`await db.delete(users)
  .where(eq(users.id, id))`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                🧭 Relational Query API
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Hämta relationer utan manuella joins.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const result = await db.query.users.findMany({
  with: {
    posts: true,
  },
  where: (users, { eq }) => eq(users.active, true),
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-sky-500">
              <h3 className="text-lg font-bold text-sky-400 mb-3">
                🔗 Manuell Join
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Full kontroll med query builder-joins.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const rows = await db
  .select()
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id))`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                🧮 Vanliga operatorer
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Importeras från &quot;drizzle-orm&quot;.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { eq, and, or, gt, like } from "drizzle-orm"

where(and(
  eq(users.active, true),
  gt(users.age, 18)
))`}
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
