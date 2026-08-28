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
  "text-teal-300",
  "text-cyan-300",
  "text-green-300",
  "text-lime-300",
  "text-yellow-300",
  "text-sky-300",
  "text-amber-300",
];

const data = [
  {
    id: 1,
    content: "fs.readFile(path, cb)",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Läser en fil asynkront (blockerar inte event loop)",
    type: "description" as const,
    matchId: 1,
    textColor: colors[4],
  },

  {
    id: 3,
    content: "fs.readFileSync(path)",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Läser en fil synkront - blockerar tills den är klar",
    type: "description" as const,
    matchId: 2,
    textColor: colors[5],
  },

  {
    id: 5,
    content: "http.createServer((req, res) => {})",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Skapar en enkel HTTP-server från Node:s inbyggda modul",
    type: "description" as const,
    matchId: 3,
    textColor: colors[6],
  },

  {
    id: 7,
    content: "path.join(a, b)",
    type: "term" as const,
    matchId: 4,
    textColor: colors[3],
  },
  {
    id: 8,
    content: "Slår ihop sökvägar plattformsoberoende",
    type: "description" as const,
    matchId: 4,
    textColor: colors[7],
  },
];

export default function NodeFsHttpGame() {
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
        <div className="text-xl font-bold text-emerald-300">
          📁 Matcha fs &amp; http
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: API och beskrivning.
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
              <div className="text-2xl font-bold text-teal-300">{moves}</div>
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
                c.isSelected ? "ring-4 ring-emerald-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "📁" : "📝"}
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
              Du klarade fs &amp; http-spelet på {moves} drag.
            </p>
            <div className="text-left bg-emerald-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Använd fs.promises eller fs/promises med async/await
              istället för callback-versionen för renare kod.
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
          <h3 className="text-xl font-bold">Snabbfakta om fs &amp; http</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📖</span>
              <span className="font-semibold text-emerald-300">
                fs-modulen
              </span>
            </div>
            <p>Läs/skriv filer, både sync och async</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌐</span>
              <span className="font-semibold text-teal-300">
                http-modulen
              </span>
            </div>
            <p>Inbyggd server utan externa beroenden</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧭</span>
              <span className="font-semibold text-cyan-300">
                path-modulen
              </span>
            </div>
            <p>join, resolve, extname för sökvägar</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌊</span>
              <span className="font-semibold text-green-300">
                Streams
              </span>
            </div>
            <p>Läs/skriv stora filer utan att fylla minnet</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📡</span>
              <span className="font-semibold text-lime-300">
                req/res
              </span>
            </div>
            <p>IncomingMessage och ServerResponse-objekt</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🚦</span>
              <span className="font-semibold text-sky-300">
                Statuskoder
              </span>
            </div>
            <p>res.statusCode / res.writeHead(200)</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black/20 rounded border-l-4 border-emerald-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-emerald-300">Tips:</span>
          </div>
          <p className="text-sm">
            För riktiga API:er används oftast Express eller Fastify ovanpå
            http-modulen - men det är bra att förstå grunderna först.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-emerald-400">
            fs &amp; http i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-emerald-500">
              <h3 className="text-lg font-bold text-emerald-400 mb-3">
                📖 Läsa filer
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Callback, promise och sync-varianter.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { readFile } from "fs/promises"

const data = await readFile("data.json", "utf-8")
const parsed = JSON.parse(data)`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-teal-400 mb-3">
                ✏️ Skriva filer
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  writeFile skriver över, appendFile lägger till.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { writeFile, appendFile } from "fs/promises"

await writeFile("log.txt", "Start\\n")
await appendFile("log.txt", "Ny rad\\n")`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                🧭 path-modulen
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Plattformsoberoende sökvägshantering.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import path from "path"

const full = path.join(__dirname, "data", "file.json")
path.extname("photo.jpg") // ".jpg"`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-400 mb-3">
                🌐 En enkel HTTP-server
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Grunden som Express m.fl. byggs ovanpå.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { createServer } from "http"

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ ok: true }))
})

server.listen(3000)`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-lime-500">
              <h3 className="text-lg font-bold text-lime-400 mb-3">
                📡 Läsa request-body
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  req är en läsbar stream av chunks.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`let body = ""
req.on("data", (chunk) => (body += chunk))
req.on("end", () => {
  const data = JSON.parse(body)
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-sky-500">
              <h3 className="text-lg font-bold text-sky-400 mb-3">
                🌊 Streams för stora filer
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Undvik att läsa allt i minnet på en gång.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { createReadStream } from "fs"

createReadStream("video.mp4").pipe(res)`}
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
