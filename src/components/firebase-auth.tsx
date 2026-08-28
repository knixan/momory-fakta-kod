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
  "text-orange-300",
  "text-amber-300",
  "text-yellow-300",
  "text-red-300",
  "text-pink-300",
  "text-rose-300",
  "text-lime-300",
  "text-fuchsia-300",
];

const data = [
  {
    id: 1,
    content: "signInWithEmailAndPassword",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Loggar in en användare med e-post och lösenord",
    type: "description" as const,
    matchId: 1,
    textColor: colors[4],
  },

  {
    id: 3,
    content: "signInWithPopup",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Loggar in med OAuth-leverantör (Google, GitHub) i popup",
    type: "description" as const,
    matchId: 2,
    textColor: colors[5],
  },

  {
    id: 5,
    content: "onAuthStateChanged",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Lyssnare som triggas när inloggningsstatus ändras",
    type: "description" as const,
    matchId: 3,
    textColor: colors[6],
  },

  {
    id: 7,
    content: "signOut(auth)",
    type: "term" as const,
    matchId: 4,
    textColor: colors[3],
  },
  {
    id: 8,
    content: "Loggar ut den nuvarande användaren",
    type: "description" as const,
    matchId: 4,
    textColor: colors[7],
  },
];

export default function FirebaseAuthGame() {
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
        <div className="text-xl font-bold text-orange-300">
          🔥 Matcha Firebase Authentication
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: metod och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-300">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-300">{moves}</div>
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
                c.isSelected ? "ring-4 ring-orange-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🔥" : "📝"}
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
              Du klarade Firebase Auth-spelet på {moves} drag.
            </p>
            <div className="text-left bg-orange-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Lyssna alltid på onAuthStateChanged istället för att lita
              på ett engångsvärde vid sidladdning.
            </div>
            <button
              onClick={init}
              className="bg-orange-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-orange-900 to-amber-900 rounded-lg p-6 text-white border-2 border-orange-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om Firebase Auth</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📧</span>
              <span className="font-semibold text-orange-300">
                Email/Lösenord
              </span>
            </div>
            <p>Klassisk inloggning med createUser/signIn-metoder</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌐</span>
              <span className="font-semibold text-amber-300">
                OAuth Providers
              </span>
            </div>
            <p>Google, GitHub, Facebook, Apple m.fl.</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎟️</span>
              <span className="font-semibold text-yellow-300">
                ID Token
              </span>
            </div>
            <p>JWT som verifierar användarens identitet</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">👂</span>
              <span className="font-semibold text-red-300">
                Auth State
              </span>
            </div>
            <p>onAuthStateChanged håller UI i synk med inloggning</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🛡️</span>
              <span className="font-semibold text-pink-300">
                Security Rules
              </span>
            </div>
            <p>request.auth styr åtkomst i Firestore/Storage</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🏷️</span>
              <span className="font-semibold text-rose-300">
                Custom Claims
              </span>
            </div>
            <p>Roller (t.ex. admin) på servern via Admin SDK</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black/20 rounded border-l-4 border-orange-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-orange-300">Tips:</span>
          </div>
          <p className="text-sm">
            Rendera aldrig skyddat innehåll förrän onAuthStateChanged har
            svarat minst en gång - annars flimrar UI:t mellan states.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-orange-400">
            Firebase Authentication i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-orange-400 mb-3">
                📧 Email &amp; Lösenord
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Skapa konto och logga in med e-post/lösenord.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"

const auth = getAuth(app)

await createUserWithEmailAndPassword(
  auth, email, password
)

await signInWithEmailAndPassword(
  auth, email, password
)`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="text-lg font-bold text-amber-400 mb-3">
                🌐 OAuth med Popup
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Logga in via tredjepartsleverantörer.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"

const provider = new GoogleAuthProvider()
const result = await signInWithPopup(
  auth, provider
)
const user = result.user`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                👂 Lyssna på Auth State
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Håll UI synkat med inloggningsstatus.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { onAuthStateChanged } from "firebase/auth"

useEffect(() => {
  const unsub = onAuthStateChanged(auth, (user) => {
    setUser(user)
    setLoading(false)
  })
  return unsub
}, [])`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-red-400 mb-3">
                🚪 Logga ut
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Avsluta sessionen.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { signOut } from "firebase/auth"

await signOut(auth)`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-pink-400 mb-3">
                🛡️ Security Rules
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Skydda data baserat på inloggad användare.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /users/{uid} {
      allow read, write: if
        request.auth != null &&
        request.auth.uid == uid;
    }
  }
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-rose-500">
              <h3 className="text-lg font-bold text-rose-400 mb-3">
                🏷️ Custom Claims (Admin SDK)
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Sätt roller på servern, läs dem i klienten.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// Server (Admin SDK)
await admin.auth().setCustomUserClaims(
  uid, { admin: true }
)

// Klient
const token = await user.getIdTokenResult()
if (token.claims.admin) { /* ... */ }`}
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
