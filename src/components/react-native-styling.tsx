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
  "text-teal-300",
  "text-cyan-300",
  "text-sky-300",
  "text-emerald-300",
  "text-indigo-300",
  "text-purple-300",
];

const data = [
  {
    id: 1,
    content: "StyleSheet.create({...})",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Skapar optimerade style-objekt (ej CSS)",
    type: "description" as const,
    matchId: 1,
    textColor: colors[3],
  },

  {
    id: 3,
    content: "Platform.OS",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Ger 'ios' eller 'android' för plattformsspecifik kod",
    type: "description" as const,
    matchId: 2,
    textColor: colors[4],
  },

  {
    id: 5,
    content: "Dimensions.get('window')",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Hämtar skärmens bredd och höjd",
    type: "description" as const,
    matchId: 3,
    textColor: colors[5],
  },
];

export default function ReactNativeStylingGame() {
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
        <div className="text-xl font-bold text-teal-300">
          🎨 Matcha Styling &amp; Platform APIs
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: begrepp och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-300">
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
                c.isSelected ? "ring-4 ring-teal-300" : "border-gray-300"
              }`}
            >
              <div
                className={`text-sm font-semibold text-center ${c.textColor}`}
              >
                {c.content}
              </div>
              <div className="text-xs text-white mt-1">
                {c.type === "term" ? "🎨" : "📝"}
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
              Du klarade Styling-spelet på {moves} drag.
            </p>
            <div className="text-left bg-teal-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Flexbox i React Native har column som default
              flexDirection, till skillnad från web-CSS där det är row.
            </div>
            <button
              onClick={init}
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-teal-900 to-cyan-900 rounded-lg p-6 text-white border-2 border-teal-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">
            Snabbfakta om Styling i React Native
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎨</span>
              <span className="font-semibold text-teal-300">
                StyleSheet
              </span>
            </div>
            <p>JS-objekt, inte riktig CSS</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📐</span>
              <span className="font-semibold text-cyan-300">Flexbox</span>
            </div>
            <p>column är default flexDirection</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📱</span>
              <span className="font-semibold text-sky-300">Platform</span>
            </div>
            <p>Platform.OS / Platform.select()</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📏</span>
              <span className="font-semibold text-emerald-300">
                Dimensions
              </span>
            </div>
            <p>Skärmens bredd/höjd i dp</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🛡️</span>
              <span className="font-semibold text-indigo-300">
                SafeAreaView
              </span>
            </div>
            <p>Undviker notch och statusbar</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔢</span>
              <span className="font-semibold text-purple-300">
                Unitless
              </span>
            </div>
            <p>Siffror är density-independent pixels (dp)</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-teal-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-teal-300">Tips:</span>
          </div>
          <p className="text-sm">
            StyleSheet.create() ger dig ingen CSS-cascading eller
            media-queries - använd Platform.select() eller bibliotek för
            responsivitet.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-teal-400">
            Styling &amp; Platform APIs i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-teal-400 mb-3">
                🎨 StyleSheet.create
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Validerar stilar och optimerar prestanda.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
})

<View style={styles.card} />`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                📐 Flexbox-layout
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Column är default, till skillnad från webben.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`row: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-sky-500">
              <h3 className="text-lg font-bold text-sky-400 mb-3">
                📱 Platform-specifik kod
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Anpassa beteende per OS.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { Platform } from "react-native"

const paddingTop = Platform.select({
  ios: 20,
  android: 0,
})

if (Platform.OS === "ios") { ... }`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-emerald-500">
              <h3 className="text-lg font-bold text-emerald-400 mb-3">
                📏 Dimensions &amp; responsivitet
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Anpassa layout efter skärmstorlek.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  half: { width: width / 2 },
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-indigo-500">
              <h3 className="text-lg font-bold text-indigo-400 mb-3">
                🛡️ SafeAreaView
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Undvik notch, statusbar och home-indicator.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { SafeAreaView } from "react-native-safe-area-context"

<SafeAreaView style={{ flex: 1 }}>
  <App />
</SafeAreaView>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                🌗 Dark Mode
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Läs systemets färgschema.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { useColorScheme } from "react-native"

const scheme = useColorScheme() // "light" | "dark"
const bg = scheme === "dark" ? "#000" : "#fff"`}
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
