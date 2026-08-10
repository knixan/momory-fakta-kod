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
  "text-emerald-300",
  "text-purple-300",
  "text-pink-300",
];

const data = [
  {
    id: 1,
    content: "<View>",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Grundläggande container, motsvarar <div> på webben",
    type: "description" as const,
    matchId: 1,
    textColor: colors[4],
  },

  {
    id: 3,
    content: "<Text>",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Enda komponenten som kan visa textinnehåll",
    type: "description" as const,
    matchId: 2,
    textColor: colors[5],
  },

  {
    id: 5,
    content: "<FlatList>",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Renderar långa listor effektivt (virtualisering)",
    type: "description" as const,
    matchId: 3,
    textColor: colors[6],
  },

  {
    id: 7,
    content: "<Pressable>",
    type: "term" as const,
    matchId: 4,
    textColor: colors[3],
  },
  {
    id: 8,
    content: "Hanterar tryck/beröring med flera tillstånd",
    type: "description" as const,
    matchId: 4,
    textColor: colors[7],
  },
];

export default function ReactNativeComponentsGame() {
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
        <div className="text-xl font-bold text-sky-300">
          📱 Matcha React Native Komponenter
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: komponent och beskrivning.
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
                {c.type === "term" ? "📱" : "📝"}
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
              Du klarade Komponenter-spelet på {moves} drag.
            </p>
            <div className="text-left bg-sky-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: All text i React Native MÅSTE ligga inuti en
              &lt;Text&gt;-komponent, annars kraschar appen.
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
      <div className="mt-6 bg-gradient-to-r from-sky-900 to-blue-900 rounded-lg p-6 text-white border-2 border-sky-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">
            Snabbfakta om React Native Komponenter
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📦</span>
              <span className="font-semibold text-sky-300">View</span>
            </div>
            <p>Container med flexbox-layout som standard</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔤</span>
              <span className="font-semibold text-cyan-300">Text</span>
            </div>
            <p>All text måste vara inuti &lt;Text&gt;</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📜</span>
              <span className="font-semibold text-blue-300">
                ScrollView
              </span>
            </div>
            <p>Scrollbar container, renderar allt direkt</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📋</span>
              <span className="font-semibold text-teal-300">
                FlatList
              </span>
            </div>
            <p>Virtualiserad lista för prestanda</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">👆</span>
              <span className="font-semibold text-indigo-300">
                Pressable
              </span>
            </div>
            <p>Modern touch-hantering (ersätter TouchableOpacity)</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🖼️</span>
              <span className="font-semibold text-purple-300">Image</span>
            </div>
            <p>Kräver explicit width/height för lokala bilder</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-sky-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-sky-300">Tips:</span>
          </div>
          <p className="text-sm">
            Använd FlatList istället för ScrollView + map() för listor -
            ScrollView renderar allt direkt vilket blir långsamt.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-sky-400">
            React Native Komponenter i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-sky-500">
              <h3 className="text-lg font-bold text-sky-400 mb-3">
                📦 View - grundcontainer
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Flexbox är standard-layout (column som default).
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { View, StyleSheet } from "react-native"

function Card() {
  return (
    <View style={styles.card}>
      <Text>Hej!</Text>
    </View>
  )
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                🔤 Text-komponenten
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Kan nästlas för blandad styling.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`<Text style={styles.title}>
  Hej <Text style={{fontWeight: "bold"}}>Elin</Text>!
</Text>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-400 mb-3">
                📋 FlatList
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Renderar bara synliga rader (virtualisering).
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`<FlatList
  data={users}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <Text>{item.name}</Text>
  )}
/>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-teal-400 mb-3">
                👆 Pressable
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Ger tillgång till pressed-state för feedback.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`<Pressable
  onPress={() => setLiked(!liked)}
  style={({ pressed }) => [
    styles.button,
    pressed && { opacity: 0.6 },
  ]}
>
  <Text>Gilla</Text>
</Pressable>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-indigo-500">
              <h3 className="text-lg font-bold text-indigo-400 mb-3">
                🖼️ Image
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Lokala bilder behöver explicit storlek.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`<Image
  source={require("./logo.png")}
  style={{ width: 100, height: 100 }}
/>

<Image source={{ uri: "https://..." }}
  style={{ width: 100, height: 100 }}
/>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                📜 ScrollView vs FlatList
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  • <strong className="text-sky-300">ScrollView:</strong>{" "}
                  Få, kända element (t.ex. formulär)
                </p>
                <p>
                  • <strong className="text-sky-300">FlatList:</strong> Långa
                  eller dynamiska listor
                </p>
                <p>
                  • <strong className="text-sky-300">SectionList:</strong>{" "}
                  Listor med rubriker/grupper
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
