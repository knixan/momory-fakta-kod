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
  "text-sky-300",
  "text-cyan-300",
  "text-blue-300",
  "text-teal-300",
  "text-indigo-300",
  "text-violet-300",
  "text-emerald-300",
  "text-purple-300",
];

const data = [
  {
    id: 1,
    content: "schema.parse(data)",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Validerar data och kastar ett fel om det är ogiltigt",
    type: "description" as const,
    matchId: 1,
    textColor: colors[4],
  },

  {
    id: 3,
    content: "schema.safeParse(data)",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Validerar och returnerar { success, data/error } utan att kasta",
    type: "description" as const,
    matchId: 2,
    textColor: colors[5],
  },

  {
    id: 5,
    content: ".refine(fn, msg)",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Lägger till anpassad valideringslogik",
    type: "description" as const,
    matchId: 3,
    textColor: colors[6],
  },

  {
    id: 7,
    content: ".min(3) / .max(10)",
    type: "term" as const,
    matchId: 4,
    textColor: colors[3],
  },
  {
    id: 8,
    content: "Sätter längd- eller värdegränser på ett fält",
    type: "description" as const,
    matchId: 4,
    textColor: colors[7],
  },
];

export default function ZodValidationGame() {
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
        <div className="text-xl font-bold text-sky-300">
          ✅ Matcha Zod Validation
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: metod och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-300">
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
                c.isSelected ? "ring-4 ring-sky-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "✅" : "📝"}
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
              Du klarade Zod Validation-spelet på {moves} drag.
            </p>
            <div className="text-left bg-sky-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Använd safeParse när du inte vill hantera try/catch,
              t.ex. i API-routes där du vill returnera ett 400-svar.
            </div>
            <button
              onClick={init}
              className="bg-sky-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-sky-900 to-cyan-900 rounded-lg p-6 text-white border-2 border-sky-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om Zod Validation</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💥</span>
              <span className="font-semibold text-sky-300">parse</span>
            </div>
            <p>Kastar ZodError vid ogiltig data</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🛟</span>
              <span className="font-semibold text-cyan-300">
                safeParse
              </span>
            </div>
            <p>Returnerar ett result-objekt istället för att kasta</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔬</span>
              <span className="font-semibold text-blue-300">refine</span>
            </div>
            <p>Egen valideringslogik utöver inbyggda regler</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📏</span>
              <span className="font-semibold text-teal-300">
                min/max
              </span>
            </div>
            <p>Längd på strängar/arrayer, värde på tal</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📧</span>
              <span className="font-semibold text-indigo-300">
                Format-checks
              </span>
            </div>
            <p>.email(), .url(), .uuid()</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📋</span>
              <span className="font-semibold text-violet-300">
                ZodError.issues
              </span>
            </div>
            <p>Detaljerad lista över vad som gick fel</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black/20 rounded border-l-4 border-sky-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-sky-300">Tips:</span>
          </div>
          <p className="text-sm">
            Ge alltid egna felmeddelanden med refine/message - Zods
            standardmeddelanden är på engelska och ofta för tekniska för
            slutanvändare.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-sky-400">
            Zod Validation i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-sky-500">
              <h3 className="text-lg font-bold text-sky-400 mb-3">
                💥 parse - kastar vid fel
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Bra när du redan har try/catch runt koden.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`try {
  const user = userSchema.parse(input)
} catch (err) {
  if (err instanceof z.ZodError) {
    console.log(err.issues)
  }
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                🛟 safeParse - säkert resultat
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Ingen exception - kolla success-flaggan.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const result = userSchema.safeParse(input)

if (!result.success) {
  return res.status(400).json(result.error.issues)
}
const user = result.data`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-400 mb-3">
                🔬 Anpassad validering med refine
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  För regler som inte finns inbyggt.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const passwordSchema = z.object({
  password: z.string(),
  confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
  message: "Lösenorden matchar inte",
  path: ["confirm"],
})`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-teal-400 mb-3">
                📏 Längd- och värdegränser
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Vanliga fältvalidatorer.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const schema = z.object({
  username: z.string().min(3).max(20),
  age: z.number().min(18).max(120),
  bio: z.string().max(280).optional(),
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-indigo-500">
              <h3 className="text-lg font-bold text-indigo-400 mb-3">
                📧 Inbyggda format
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Färdiga valideringar för vanliga format.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`z.string().email()
z.string().url()
z.string().uuid()
z.string().regex(/^[0-9]{5}$/)`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-violet-500">
              <h3 className="text-lg font-bold text-violet-400 mb-3">
                📋 Läsa felmeddelanden
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  issues innehåller path och message per fel.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`result.error.issues.forEach((issue) => {
  console.log(issue.path, issue.message)
})`}
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
