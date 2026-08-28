"use client";

import { useState, useEffect } from "react";
import React from "react";

interface Card {
  id: number;
  content: string;
  type: "concept" | "code" | "description";
  matchId: number;
  textColor: string;
  isFlipped: boolean;
  isMatched: boolean;
  isSelected?: boolean;
}

// Färger som blandas slumpmässigt för att inte avslöja svaren
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
  "text-rose-300",
  "text-violet-300",
  "text-amber-300",
  "text-lime-300",
  "text-teal-300",
  "text-fuchsia-300",
  "text-sky-300",
  "text-slate-300",
  "text-zinc-300",
  "text-gray-300",
];

const cardData = [
  // Variables and types
  {
    id: 1,
    content: "Variabler och typer",
    type: "concept" as const,
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: `let name: string = "Alice";
let age: number = 25;
let isStudent: boolean = true;`,
    type: "code" as const,
    matchId: 1,
    textColor: cardColors[10],
  },

  // Type inference
  {
    id: 3,
    content: "Type inference",
    type: "concept" as const,
    matchId: 2,
    textColor: cardColors[5],
  },
  {
    id: 4,
    content: "Om du inte anger typen, försöker TypeScript gissa",
    type: "description" as const,
    matchId: 2,
    textColor: cardColors[15],
  },

  // Arrays
  {
    id: 5,
    content: "Arrayer",
    type: "concept" as const,
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: `let numbers: number[] = [1, 2, 3];
let names: string[] = ["Anna", "Björn"];`,
    type: "code" as const,
    matchId: 3,
    textColor: cardColors[12],
  },

  // Tuples
  {
    id: 7,
    content: "Tuples",
    type: "concept" as const,
    matchId: 4,
    textColor: cardColors[8],
  },
  {
    id: 8,
    content: `let person: [string, number] = ["Sara", 30];`,
    type: "code" as const,
    matchId: 4,
    textColor: cardColors[3],
  },

  // Functions
  {
    id: 9,
    content: "Funktioner",
    type: "concept" as const,
    matchId: 5,
    textColor: cardColors[14],
  },
  {
    id: 10,
    content: `function greet(name: string): string {
  return "Hej, " + name;
}`,
    type: "code" as const,
    matchId: 5,
    textColor: cardColors[7],
  },

  // Objects
  {
    id: 11,
    content: "Objekt",
    type: "concept" as const,
    matchId: 6,
    textColor: cardColors[1],
  },
  {
    id: 12,
    content: `let user: { name: string; age: number } = {
  name: "Erik",
  age: 28,
};`,
    type: "code" as const,
    matchId: 6,
    textColor: cardColors[11],
  },

  // Interfaces
  {
    id: 13,
    content: "Interfaces",
    type: "concept" as const,
    matchId: 7,
    textColor: cardColors[6],
  },
  {
    id: 14,
    content: `interface User {
  name: string;
  age: number;
}
const user: User = { name: "Erik", age: 28 };`,
    type: "code" as const,
    matchId: 7,
    textColor: cardColors[16],
  },

  // Classes
  {
    id: 15,
    content: "Klasser",
    type: "concept" as const,
    matchId: 8,
    textColor: cardColors[13],
  },
  {
    id: 16,
    content: `class Person {
  constructor(public name: string, private age: number) {}
  greet() {
    console.log(\`Hej, jag heter \${this.name}\`);
  }
}`,
    type: "code" as const,
    matchId: 8,
    textColor: cardColors[4],
  },

  // Union & Optional types
  {
    id: 17,
    content: "Union & Optional types",
    type: "concept" as const,
    matchId: 9,
    textColor: cardColors[9],
  },
  {
    id: 18,
    content: `let id: number | string;
function printName(name: string, nickname?: string) {}`,
    type: "code" as const,
    matchId: 9,
    textColor: cardColors[17],
  },

  // Enums
  {
    id: 19,
    content: "Enums",
    type: "concept" as const,
    matchId: 10,
    textColor: cardColors[18],
  },
  {
    id: 20,
    content: `enum Direction {
  Up,
  Down,
  Left,
  Right,
}
let move: Direction = Direction.Up;`,
    type: "code" as const,
    matchId: 10,
    textColor: cardColors[19],
  },
];

export default function MemoryGame() {
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
      isFlipped: true, // Visa alla kort hela tiden
      isMatched: false,
    }));

    // Blanda korten
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

    // Markera kortet som valt (med visuell feedback)
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
      // Match! Låt korten försvinna efter en kort stund
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

      if (newMatches === 10) {
        // 10 par totalt
        setTimeout(() => {
          setGameCompleted(true);
        }, 1200);
      }
    } else {
      // Ingen match - ta bort markeringen efter 1 sekund
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
      {/* Spelstatistik och instruktioner */}
      <div className="bg-black/50 rounded-lg p-6 mb-6 text-white">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-yellow-400 mb-2">
            🎯 Matcha TypeScript-koncept!
          </div>
          <div className="text-sm text-gray-300">
            Klicka på två kort som hör ihop: begrepp och kodexempel. Matchade
            par försvinner från spelbrädet.
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {matches}
              </div>
              <div className="text-sm">Matchningar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{moves}</div>
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
                {10 - matches}
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
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
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
            {/* Kortframsida - alltid synlig */}
            <div
              className={`
              absolute inset-0 flex
              flex-col items-center justify-center bg-gray-800
              rounded-lg border-2 shadow-lg p-2
              ${
                card.isSelected
                  ? "ring-4 ring-yellow-400 border-yellow-300 shadow-yellow-200"
                  : "border-gray-300"
              }
              ${card.isMatched ? "ring-4 ring-green-400" : ""}
              transition-all duration-300
            `}
            >
              <div
                className={`text-xs sm:text-sm font-semibold text-center leading-tight ${card.textColor}`}
              >
                {card.content}
              </div>
              <div className="text-xs opacity-75 mt-1 text-white">
                {card.type === "concept" && "�"}
                {card.type === "code" && "�"}
                {card.type === "description" && "📝"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vinst-meddelande */}
      {gameCompleted && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Grattis!</h2>
            <p className="text-gray-600 mb-6">
              Du klarade spelet på {moves} drag med{" "}
              {Math.round((matches / moves) * 100)}% träffsäkerhet!
            </p>
            <div className="bg-yellow-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <strong>TypeScript-reflektion:</strong> TypeScript hjälper till
                att skriva säkrare och mer förutsägbar kod genom att lägga till
                typer. Det minskar buggar och förbättrar utvecklarupplevelsen.
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

      {/* Faktaruta - kompakta fakta */}
      <div className="mt-6 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 text-white border-2 border-blue-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om TypeScript</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📅</span>
              <span className="font-semibold text-yellow-300">Utgiven</span>
            </div>
            <p>2012 av Microsoft</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">�</span>
              <span className="font-semibold text-red-300">Superset</span>
            </div>
            <p>Utökar JavaScript</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">�️</span>
              <span className="font-semibold text-green-300">Typer</span>
            </div>
            <p>Statisk typning</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚡</span>
              <span className="font-semibold text-orange-300">Kompilering</span>
            </div>
            <p>Till JavaScript</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🛡️</span>
              <span className="font-semibold text-purple-300">Säkerhet</span>
            </div>
            <p>Fångar fel tidigt</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📈</span>
              <span className="font-semibold text-blue-300">Popularitet</span>
            </div>
            <p>Används av stora företag</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">�</span>
              <span className="font-semibold text-cyan-300">IDE-stöd</span>
            </div>
            <p>Autokomplettering</p>
          </div>

          <div className="bg-black/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌐</span>
              <span className="font-semibold text-emerald-300">
                Öppen källkod
              </span>
            </div>
            <p>GitHub-projekt</p>
          </div>
        </div>

        {/* Begrepp och förklaringar */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🧠</span>
            <h4 className="text-lg font-bold text-cyan-300">
              TypeScript-begrepp
            </h4>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <div className="bg-black/30 rounded p-3">
              <p className="font-semibold text-yellow-300">Interface</p>
              <p>
                Definierar strukturen för ett objekt, som en mall för vilka
                egenskaper och metoder ett objekt ska ha.
              </p>
            </div>
            <div className="bg-black/30 rounded p-3">
              <p className="font-semibold text-yellow-300">Type Inference</p>
              <p>
                TypeScript gissar automatiskt typen baserat på värdet, utan att
                du behöver ange den explicit.
              </p>
            </div>
            <div className="bg-black/30 rounded p-3">
              <p className="font-semibold text-yellow-300">Union Types</p>
              <p>
                En variabel kan ha flera möjliga typer, t.ex. string | number.
              </p>
            </div>
            <div className="bg-black/30 rounded p-3">
              <p className="font-semibold text-yellow-300">Generics</p>
              <p>
                Tillåter att skapa återanvändbara komponenter som fungerar med
                olika typer.
              </p>
            </div>
            <div className="bg-black/30 rounded p-3">
              <p className="font-semibold text-yellow-300">
                Optional Properties
              </p>
              <p>
                Egenskaper som inte behöver vara definierade, markerade med ?.
              </p>
            </div>
            <div className="bg-black/30 rounded p-3">
              <p className="font-semibold text-yellow-300">Type Guards</p>
              <p>
                Funktioner som hjälper TypeScript att förstå vilken typ en
                variabel har vid runtime.
              </p>
            </div>
            <div className="bg-black/30 rounded p-3">
              <p className="font-semibold text-yellow-300">Enums</p>
              <p>
                Uppräknade typer som gör det lättare att arbeta med namngivna
                konstanter.
              </p>
            </div>
            <div className="bg-black/30 rounded p-3">
              <p className="font-semibold text-yellow-300">Modules</p>
              <p>
                Organiserar kod i separata filer som kan importeras och
                exporteras.
              </p>
            </div>
            <div className="bg-black/30 rounded p-3">
              <p className="font-semibold text-yellow-300">Decorators</p>
              <p>
                Funktioner som kan modifiera klasser, metoder eller egenskaper
                vid design-time.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black/20 rounded border-l-4 border-yellow-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💭</span>
            <span className="font-semibold text-yellow-300">Reflektion:</span>
          </div>
          <p className="text-sm italic">
            &ldquo;TypeScript hjälper utvecklare att skriva bättre kod genom att
            fånga fel tidigt och förbättra utvecklarupplevelsen.&rdquo;
          </p>
        </div>
      </div>

      {/* Detaljerad TypeScript-information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-yellow-400">
            TypeScript Grunderna
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Vänster kolumn */}
          <div className="space-y-6">
            {/* Vad är TypeScript? */}
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔥</span>
                <h3 className="text-lg font-bold text-red-400">
                  Vad är TypeScript?
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  • TypeScript är ett programmeringsspråk som är en{" "}
                  <strong className="text-yellow-300">superset</strong> av
                  JavaScript.
                </p>
                <p>
                  • Det lägger till{" "}
                  <strong className="text-red-300">statisk typning</strong> och
                  andra funktioner till JavaScript.
                </p>
                <p>
                  • Kod kompileras till vanlig JavaScript som kan köras i
                  webbläsaren.
                </p>
              </div>
            </div>

            {/* Varför TypeScript? */}
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">⚔️</span>
                <h3 className="text-lg font-bold text-blue-400">
                  Varför TypeScript?
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong className="text-yellow-300">
                    Tidig felupptäckt:
                  </strong>{" "}
                  Fångar många fel innan koden körs.
                </p>
                <div className="ml-4">
                  <p>
                    <strong className="text-yellow-300">
                      Bättre IDE-stöd:
                    </strong>
                  </p>
                  <p className="ml-4">• Autokomplettering och intellisense.</p>
                  <p className="ml-4">• Refactoring blir säkrare.</p>
                </div>
                <p>
                  <strong className="text-yellow-300">Kodkvalitet:</strong>{" "}
                  Tvingar bättre kodningsvanor.
                </p>
                <div className="ml-4">
                  <p>
                    <strong className="text-yellow-300">Större projekt:</strong>
                  </p>
                  <p className="ml-4">• Lättare att underhålla och utöka.</p>
                  <p className="ml-4">• Bättre samarbete i team.</p>
                </div>
              </div>
            </div>

            {/* Grundläggande typer */}
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-purple-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💔</span>
                <h3 className="text-lg font-bold text-purple-400">
                  Grundläggande typer
                </h3>
              </div>
              <p className="text-sm">
                TypeScript har samma typer som JavaScript plus några extra:
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <p>
                  • <strong className="text-red-300">boolean:</strong>{" "}
                  true/false
                </p>
                <p>
                  • <strong className="text-red-300">number:</strong> alla
                  nummer
                </p>
                <p>
                  • <strong className="text-red-300">string:</strong> text
                </p>
                <p>
                  • <strong className="text-red-300">array:</strong> listor av
                  värden
                </p>
                <p>
                  • <strong className="text-red-300">object:</strong> komplexa
                  datastrukturer
                </p>
                <p>
                  • <strong className="text-red-300">null/undefined:</strong>{" "}
                  frånvaro av värde
                </p>
              </div>
            </div>
          </div>

          {/* Höger kolumn */}
          <div className="space-y-6">
            {/* Avancerade funktioner */}
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">👑</span>
                <h3 className="text-lg font-bold text-green-400">
                  Avancerade funktioner
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p>
                    <strong className="text-red-300">Interfaces:</strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Definierar strukturen för objekt.
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-yellow-300">Generics:</strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Återanvändbara komponenter som fungerar med olika typer.
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-red-300">Union Types:</strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    En variabel kan ha flera möjliga typer.
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-blue-300">Enums:</strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Namngivna konstanter för bättre kodläsbarhet.
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-indigo-300">Type Guards:</strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Hjälper TypeScript att förstå typer vid runtime.
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-cyan-300">Decorators:</strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Modifierar klasser och metoder.
                  </p>
                </div>
              </div>
            </div>

            {/* Komma igång */}
            <div className="bg-black/40 rounded-lg p-4 border-l-4 border-orange-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💀</span>
                <h3 className="text-lg font-bold text-orange-400">
                  Komma igång med TypeScript
                </h3>
              </div>
              <p className="text-sm">
                För att börja använda TypeScript i ditt projekt:
              </p>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  1. Installera TypeScript:{" "}
                  <code className="bg-gray-700 px-1 rounded">
                    npm install typescript
                  </code>
                </p>
                <p>
                  2. Skapa en{" "}
                  <code className="bg-gray-700 px-1 rounded">
                    tsconfig.json
                  </code>
                </p>
                <p>
                  3. Byt filändelse från{" "}
                  <code className="bg-gray-700 px-1 rounded">.js</code> till{" "}
                  <code className="bg-gray-700 px-1 rounded">.ts</code>
                </p>
                <p>
                  4. Kompilera:{" "}
                  <code className="bg-gray-700 px-1 rounded">tsc</code>
                </p>
              </div>
              <div className="mt-3 p-2 bg-blue-900/30 rounded text-xs">
                <p className="text-blue-200">
                  TypeScript gör JavaScript-utveckling mer robust och njutbar!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
