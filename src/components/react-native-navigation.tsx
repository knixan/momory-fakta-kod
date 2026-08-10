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
  "text-blue-300",
  "text-indigo-300",
  "text-sky-300",
  "text-cyan-300",
  "text-violet-300",
  "text-teal-300",
];

const data = [
  {
    id: 1,
    content: "createNativeStackNavigator()",
    type: "term" as const,
    matchId: 1,
    textColor: colors[0],
  },
  {
    id: 2,
    content: "Skapar en stack med skärmar som läggs ovanpå varandra",
    type: "description" as const,
    matchId: 1,
    textColor: colors[3],
  },

  {
    id: 3,
    content: "navigation.navigate('Profile')",
    type: "term" as const,
    matchId: 2,
    textColor: colors[1],
  },
  {
    id: 4,
    content: "Går till en annan skärm i navigationsstacken",
    type: "description" as const,
    matchId: 2,
    textColor: colors[4],
  },

  {
    id: 5,
    content: "createBottomTabNavigator()",
    type: "term" as const,
    matchId: 3,
    textColor: colors[2],
  },
  {
    id: 6,
    content: "Visar en flikmeny längst ner i appen",
    type: "description" as const,
    matchId: 3,
    textColor: colors[5],
  },
];

export default function ReactNativeNavigationGame() {
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
        <div className="text-xl font-bold text-blue-300">
          🧭 Matcha React Navigation
        </div>
        <div className="text-sm text-gray-300">
          Parvis matchning: begrepp och beskrivning.
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-300">
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
                c.isSelected ? "ring-4 ring-blue-300" : "border-gray-300"
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 text-center max-w-md mx-4">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-lg font-bold mb-2">Bra jobbat!</h3>
            <p className="text-sm text-gray-700 mb-3">
              Du klarade Navigation-spelet på {moves} drag.
            </p>
            <div className="text-left bg-blue-50 p-3 rounded mb-3 text-sm text-gray-800">
              Tips: Kombinera en Bottom Tab Navigator med en Stack Navigator
              per flik för typiska app-layouter.
            </div>
            <button
              onClick={init}
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
          <h3 className="text-xl font-bold">
            Snabbfakta om React Navigation
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📚</span>
              <span className="font-semibold text-blue-300">
                Stack Navigator
              </span>
            </div>
            <p>Skärmar staplas, med tillbaka-knapp</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔽</span>
              <span className="font-semibold text-indigo-300">
                Tab Navigator
              </span>
            </div>
            <p>Flikmeny, oftast längst ner</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📤</span>
              <span className="font-semibold text-sky-300">
                Drawer Navigator
              </span>
            </div>
            <p>Sidomeny som glider in</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎯</span>
              <span className="font-semibold text-cyan-300">
                Route Params
              </span>
            </div>
            <p>Skicka data mellan skärmar</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🪝</span>
              <span className="font-semibold text-violet-300">
                useNavigation
              </span>
            </div>
            <p>Hook för att navigera utanför skärmens props</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔗</span>
              <span className="font-semibold text-teal-300">
                Deep Linking
              </span>
            </div>
            <p>Öppnar specifika skärmar via URL</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-blue-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-blue-300">Tips:</span>
          </div>
          <p className="text-sm">
            Typa dina route params med TypeScript för att undvika buggar när
            du skickar fel data mellan skärmar.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-blue-400">
            React Navigation i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-400 mb-3">
                📚 Stack Navigator
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Grundläggande skärm-till-skärm-navigering.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

<Stack.Navigator>
  <Stack.Screen name="Home" component={Home} />
  <Stack.Screen name="Profile" component={Profile} />
</Stack.Navigator>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-indigo-500">
              <h3 className="text-lg font-bold text-indigo-400 mb-3">
                🔽 Bottom Tabs
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Flikbaserad huvudnavigering.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator()

<Tab.Navigator>
  <Tab.Screen name="Feed" component={Feed} />
  <Tab.Screen name="Settings" component={Settings} />
</Tab.Navigator>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-sky-500">
              <h3 className="text-lg font-bold text-sky-400 mb-3">
                🎯 Skicka params
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Data följer med till nästa skärm.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`navigation.navigate("Profile", { userId: 42 })

// I Profile-skärmen
function Profile({ route }) {
  const { userId } = route.params
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                🪝 useNavigation-hooken
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Navigera från komponenter utan navigation-prop.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { useNavigation } from "@react-navigation/native"

function LikeButton() {
  const navigation = useNavigation()
  return (
    <Button onPress={() => navigation.goBack()} />
  )
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-violet-500">
              <h3 className="text-lg font-bold text-violet-400 mb-3">
                🧷 Typade routes
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Säkra params med TypeScript.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`type RootStackParamList = {
  Home: undefined
  Profile: { userId: number }
}

type Props = NativeStackScreenProps<
  RootStackParamList, "Profile"
>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-teal-400 mb-3">
                🔗 Deep Linking
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Öppna appen direkt på rätt skärm via länk.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: { Profile: "user/:userId" },
  },
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
