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
  "text-orange-300",
  "text-amber-300",
  "text-rose-300",
  "text-pink-300",
  "text-yellow-300",
];

const data = [
  {
    id: 1,
    content: "uploadBytes(ref, file)",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Laddar upp en fil till Cloud Storage",
    type: "description" as const,
    matchId: 1,
    textColor: colors[3],
  },

  {
    id: 3,
    content: "getDownloadURL(ref)",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Hämtar publik URL till en uppladdad fil",
    type: "description" as const,
    matchId: 2,
    textColor: colors[4],
  },

  {
    id: 5,
    content: "firebase deploy --only hosting",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Publicerar den byggda appen till Firebase Hosting",
    type: "description" as const,
    matchId: 3,
    textColor: colors[5],
  },
];

export default function FirebaseHostingStorageGame() {
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
        <div className="text-xl font-bold text-red-300">
          🚀 Matcha Storage &amp; Hosting
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: metod och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-300">
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
                c.isSelected ? "ring-4 ring-red-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🚀" : "📝"}
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
              Du klarade Storage &amp; Hosting-spelet på {moves} drag.
            </p>
            <div className="text-left bg-red-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Sätt alltid Storage Security Rules innan du släpper en
              app live - annars kan vem som helst ladda upp filer.
            </div>
            <button
              onClick={init}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-red-900 to-orange-900 rounded-lg p-6 text-white border-2 border-red-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">
            Snabbfakta om Storage &amp; Hosting
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📤</span>
              <span className="font-semibold text-red-300">Upload</span>
            </div>
            <p>uploadBytes/uploadBytesResumable för filer</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔗</span>
              <span className="font-semibold text-orange-300">
                Download URL
              </span>
            </div>
            <p>Publik/signerad länk till filen</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📁</span>
              <span className="font-semibold text-amber-300">
                Storage Ref
              </span>
            </div>
            <p>Sökväg-baserad referens till en fil/mapp</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌍</span>
              <span className="font-semibold text-rose-300">
                Hosting
              </span>
            </div>
            <p>Global CDN för statiska/SSR-appar</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧾</span>
              <span className="font-semibold text-pink-300">
                firebase.json
              </span>
            </div>
            <p>Konfig för hosting, rewrites och headers</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🛡️</span>
              <span className="font-semibold text-yellow-300">
                Storage Rules
              </span>
            </div>
            <p>Styr vem som får läsa/skriva filer</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black/20 rounded border-l-4 border-red-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-red-300">Tips:</span>
          </div>
          <p className="text-sm">
            Använd firebase deploy --only hosting för snabbare deploys när du
            bara ändrat frontend, istället för att deploya allt.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-red-400">
            Storage &amp; Hosting i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-red-400 mb-3">
                📤 Ladda upp en fil
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Skapa en ref och ladda upp bytes.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import {
  getStorage, ref, uploadBytes
} from "firebase/storage"

const storage = getStorage(app)
const fileRef = ref(storage, \`images/\${file.name}\`)
await uploadBytes(fileRef, file)`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-orange-400 mb-3">
                🔗 Hämta nedladdnings-URL
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Efter uppladdning, hämta en delbar länk.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { getDownloadURL } from "firebase/storage"

const url = await getDownloadURL(fileRef)
// <img src={url} />`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="text-lg font-bold text-amber-400 mb-3">
                📊 Uppladdning med progress
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Resumable uploads för stora filer.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import {
  uploadBytesResumable
} from "firebase/storage"

const task = uploadBytesResumable(fileRef, file)
task.on("state_changed", (snap) => {
  const pct = snap.bytesTransferred / snap.totalBytes
  setProgress(pct * 100)
})`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-rose-500">
              <h3 className="text-lg font-bold text-rose-400 mb-3">
                🌍 Deploy till Hosting
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Bygg appen och publicera via CLI.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`npm run build
firebase deploy --only hosting

# Endast en specifik target
firebase deploy --only hosting:app`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-pink-400 mb-3">
                🧾 firebase.json
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Konfigurera public-mapp och rewrites för SPA.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`{
  "hosting": {
    "public": "dist",
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                🛡️ Storage Security Rules
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Begränsa filstorlek och åtkomst.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`service firebase.storage {
  match /b/{bucket}/o {
    match /images/{uid}/{file} {
      allow write: if request.auth.uid == uid
        && request.resource.size < 5 * 1024 * 1024;
      allow read: if true;
    }
  }
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
