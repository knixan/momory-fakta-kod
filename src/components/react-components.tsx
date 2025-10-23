"use client";

import { useState, useEffect } from "react";

interface Card {
  id: number;
  content: string;
  type: "concept" | "description";
  matchId: number;
  textColor: string;
  isFlipped: boolean;
  isMatched: boolean;
  isSelected?: boolean;
}

const cardColors = [
  "text-red-300",
  "text-blue-300",
  "text-green-300",
  "text-yellow-300",
  "text-purple-300",
  "text-pink-300",
  "text-indigo-300",
  "text-orange-300",
  "text-cyan-300",
  "text-emerald-300",
];

const cardData = [
  {
    id: 1,
    content: "Functional Component",
    type: "concept" as const,
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: "En JavaScript-funktion som returnerar JSX",
    type: "description" as const,
    matchId: 1,
    textColor: cardColors[5],
  },

  {
    id: 3,
    content: "Props",
    type: "concept" as const,
    matchId: 2,
    textColor: cardColors[1],
  },
  {
    id: 4,
    content: "Data som skickas från förälder till barn-komponent",
    type: "description" as const,
    matchId: 2,
    textColor: cardColors[6],
  },

  {
    id: 5,
    content: "Children",
    type: "concept" as const,
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: "Innehåll mellan öppnings- och stängningstaggen",
    type: "description" as const,
    matchId: 3,
    textColor: cardColors[7],
  },

  {
    id: 7,
    content: "Pure Component",
    type: "concept" as const,
    matchId: 4,
    textColor: cardColors[3],
  },
  {
    id: 8,
    content: "Komponent som bara re-renderas vid prop/state-ändringar",
    type: "description" as const,
    matchId: 4,
    textColor: cardColors[8],
  },

  {
    id: 9,
    content: "Controlled Component",
    type: "concept" as const,
    matchId: 5,
    textColor: cardColors[4],
  },
  {
    id: 10,
    content: "Form-element vars värde styrs av React state",
    type: "description" as const,
    matchId: 5,
    textColor: cardColors[9],
  },
];

export default function ReactComponentsGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initializedCards = cardData.map((card) => ({
      ...card,
      isFlipped: true,
      isMatched: false,
    }));

    const shuffledCards = [...initializedCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameCompleted(false);
  };

  const selectCard = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find((card) => card.id === cardId)?.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isSelected: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds;
    const firstCard = cards.find((card) => card.id === firstId);
    const secondCard = cards.find((card) => card.id === secondId);

    if (firstCard && secondCard && firstCard.matchId === secondCard.matchId) {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            flippedCardIds.includes(card.id)
              ? { ...card, isMatched: true, isSelected: false }
              : { ...card, isSelected: false }
          )
        );
      }, 800);

      const newMatches = matches + 1;
      setMatches(newMatches);
      setFlippedCards([]);

      if (newMatches === 5) {
        setTimeout(() => {
          setGameCompleted(true);
        }, 1200);
      }
    } else {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) => ({ ...card, isSelected: false }))
        );
        setFlippedCards([]);
      }, 1000);
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Spelstatistik */}
      <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 text-white">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-blue-400 mb-2">
            ⚛️ Matcha React Components!
          </div>
          <div className="text-sm text-gray-300">
            Klicka på två kort som hör ihop: koncept och beskrivning. Matchade
            par försvinner från spelbrädet.
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{matches}</div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{moves}</div>
              <div className="text-sm">Drag</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {Math.round((matches / Math.max(moves, 1)) * 100)}%
              </div>
              <div className="text-sm">Träffsäkerhet</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {5 - matches}
              </div>
              <div className="text-sm">Kvar</div>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            🔄 Nytt spel
          </button>
        </div>
      </div>

      {/* Spelplan */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => selectCard(card.id)}
            className={`
              relative h-32 sm:h-36 transform transition-all duration-500 
              ${card.isMatched ? "scale-0 opacity-0" : "scale-100 opacity-100"}
              ${!card.isMatched ? "cursor-pointer hover:scale-105" : ""}
            `}
          >
            <div
              className={`
              absolute inset-0 flex
              flex-col items-center justify-center bg-gray-800
              rounded-lg border-2 shadow-lg p-2
              ${
                card.isSelected
                  ? "ring-4 ring-blue-400 border-blue-300 shadow-blue-200"
                  : "border-gray-300"
              }
              ${card.isMatched ? "ring-4 ring-green-400 bg-opacity-90" : ""}
              transition-all duration-300
            `}
            >
              <div
                className={`text-xs sm:text-sm font-semibold text-center leading-tight ${card.textColor}`}
              >
                {card.content}
              </div>
              <div className="text-xs opacity-75 mt-1 text-white">
                {card.type === "concept" && "⚛️"}
                {card.type === "description" && "📝"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vinst-meddelande */}
      {gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Grattis!</h2>
            <p className="text-gray-600 mb-6">
              Du klarade spelet på {moves} drag med{" "}
              {Math.round((matches / moves) * 100)}% träffsäkerhet!
            </p>
            <div className="bg-blue-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <strong>React Components:</strong> Komponenter är byggstenarna i
                React - återanvändbara delar av UI som kan komponeras.
              </p>
            </div>
            <button
              onClick={resetGame}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
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
          <h3 className="text-xl font-bold">Snabbfakta om React Components</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚛️</span>
              <span className="font-semibold text-blue-300">Functional</span>
            </div>
            <p>JavaScript-funktioner</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📦</span>
              <span className="font-semibold text-cyan-300">Props</span>
            </div>
            <p>Data från förälder</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">👶</span>
              <span className="font-semibold text-green-300">Children</span>
            </div>
            <p>Nästlade element</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✨</span>
              <span className="font-semibold text-yellow-300">Pure</span>
            </div>
            <p>Optimerad rendering</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎮</span>
              <span className="font-semibold text-purple-300">Controlled</span>
            </div>
            <p>State-styrda inputs</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔄</span>
              <span className="font-semibold text-pink-300">Lifecycle</span>
            </div>
            <p>Mount, update, unmount</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-blue-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-blue-300">Tips:</span>
          </div>
          <p className="text-sm">
            Håll komponenter små och fokuserade på en uppgift - det gör dem
            lättare att testa och återanvända!
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-blue-400">
            React Components i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-400 mb-3">
                ⚛️ Functional Components
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  En JavaScript-funktion som returnerar JSX.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`function Welcome({ name }: { name: string }) {
  return <h1>Hej, {name}!</h1>;
}

// Arrow function
const Greeting = ({ name }: { name: string }) => {
  return <h1>Välkommen {name}</h1>;
};`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">📦 Props</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Skicka data mellan komponenter.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// Parent
<UserCard 
  name="Anna" 
  age={25} 
  isActive={true} 
/>

// Child
function UserCard({ name, age, isActive }) {
  return <div>{name}, {age}</div>;
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-400 mb-3">
                👶 Children Prop
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Innehåll mellan komponentens taggar.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Användning
<Card>
  <h1>Titel</h1>
  <p>Innehåll</p>
</Card>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                ✨ Pure Components
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Bara re-renderas vid ändringar.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  // Renderas bara om data ändras
  return <div>{data}</div>;
});`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                🎮 Controlled Components
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Form-element styrda av React state.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const [value, setValue] = useState('');

<input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// React kontrollerar input-värdet`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-pink-400 mb-3">
                🔄 Component Lifecycle
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Komponenten går igenom olika faser.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`useEffect(() => {
  // Mount: Komponent läggs till
  console.log('Mounted');
  
  return () => {
    // Unmount: Komponent tas bort
    console.log('Unmounted');
  };
}, []); // Tom array = bara mount/unmount`}
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
