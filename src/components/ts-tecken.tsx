"use client";

import { useState, useEffect } from "react";
import React from "react";

interface Card {
  id: number;
  content: string;
  type: "symbol" | "description";
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
  // :
  {
    id: 1,
    content: ":",
    type: "symbol" as const,
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: "Typangivelse – visar vilken typ en variabel eller parameter har",
    type: "description" as const,
    matchId: 1,
    textColor: cardColors[10],
  },

  // =
  {
    id: 3,
    content: "=",
    type: "symbol" as const,
    matchId: 2,
    textColor: cardColors[5],
  },
  {
    id: 4,
    content: "Tilldelning av värde",
    type: "description" as const,
    matchId: 2,
    textColor: cardColors[15],
  },

  // ;
  {
    id: 5,
    content: ";",
    type: "symbol" as const,
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: "Avslutar ett uttryck (valfritt i TypeScript, men bra stil)",
    type: "description" as const,
    matchId: 3,
    textColor: cardColors[12],
  },

  // .
  {
    id: 7,
    content: ".",
    type: "symbol" as const,
    matchId: 4,
    textColor: cardColors[8],
  },
  {
    id: 8,
    content: "Åtkomst till objektets egenskap",
    type: "description" as const,
    matchId: 4,
    textColor: cardColors[3],
  },

  // |
  {
    id: 9,
    content: "|",
    type: "symbol" as const,
    matchId: 5,
    textColor: cardColors[14],
  },
  {
    id: 10,
    content: "Union type – en variabel kan ha flera möjliga typer",
    type: "description" as const,
    matchId: 5,
    textColor: cardColors[7],
  },

  // ?
  {
    id: 11,
    content: "?",
    type: "symbol" as const,
    matchId: 6,
    textColor: cardColors[1],
  },
  {
    id: 12,
    content: "Valfri egenskap – kan finnas eller utelämnas",
    type: "description" as const,
    matchId: 6,
    textColor: cardColors[11],
  },

  // =>
  {
    id: 13,
    content: "=>",
    type: "symbol" as const,
    matchId: 7,
    textColor: cardColors[6],
  },
  {
    id: 14,
    content: "Arrow function (pilfunktion)",
    type: "description" as const,
    matchId: 7,
    textColor: cardColors[16],
  },

  // {}
  {
    id: 15,
    content: "{}",
    type: "symbol" as const,
    matchId: 8,
    textColor: cardColors[13],
  },
  {
    id: 16,
    content: "Objekt eller block av kod",
    type: "description" as const,
    matchId: 8,
    textColor: cardColors[4],
  },

  // []
  {
    id: 17,
    content: "[]",
    type: "symbol" as const,
    matchId: 9,
    textColor: cardColors[9],
  },
  {
    id: 18,
    content: "Array av en viss typ",
    type: "description" as const,
    matchId: 9,
    textColor: cardColors[17],
  },

  // <>
  {
    id: 19,
    content: "< >",
    type: "symbol" as const,
    matchId: 10,
    textColor: cardColors[18],
  },
  {
    id: 20,
    content: "Generics – gör funktioner/klasser flexibla för flera typer",
    type: "description" as const,
    matchId: 10,
    textColor: cardColors[19],
  },
];

export default function SymbolsGame() {
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
      <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 text-white">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-yellow-400 mb-2">
            🔤 Matcha TypeScript-symboler!
          </div>
          <div className="text-sm text-gray-300">
            Klicka på två kort som hör ihop: symbol och dess betydelse. Matchade
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
                {card.type === "symbol" && "🔤"}
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
            <div className="bg-yellow-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <strong>TypeScript-symboler:</strong> Att förstå dessa symboler
                är grundläggande för att skriva tydlig och säker TypeScript-kod.
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
          <h3 className="text-xl font-bold">
            Snabbfakta om TypeScript-symboler
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔤</span>
              <span className="font-semibold text-yellow-300">
                Grundsymboler
              </span>
            </div>
            <p>: = ; . ,</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧩</span>
              <span className="font-semibold text-red-300">Typ-symboler</span>
            </div>
            <p>| & ? ! as</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧮</span>
              <span className="font-semibold text-green-300">
                Funktionssymboler
              </span>
            </div>
            <p>() {`{}`} [] =&gt; &lt; &gt;</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚙️</span>
              <span className="font-semibold text-orange-300">
                Specialsymboler
              </span>
            </div>
            <p>... ? : == ===</p>
          </div>
        </div>

        {/* Symboler förklaringar */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🧠</span>
            <h4 className="text-lg font-bold text-cyan-300">
              Viktiga TypeScript-symboler
            </h4>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">:</p>
              <p>Typangivelse - anger typen av en variabel</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">=</p>
              <p>Tilldelning - ger ett värde till en variabel</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">.</p>
              <p>Egenskapsåtkomst - når egenskaper i objekt</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">|</p>
              <p>Union - flera möjliga typer</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">?</p>
              <p>Valfritt - egenskapen kan utelämnas</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">=&gt;</p>
              <p>Arrow function - kompakt funktionssyntax</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">[]</p>
              <p>Array - lista av värden av samma typ</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">{}</p>
              <p>Objekt - samling av egenskaper</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">&lt; &gt;</p>
              <p>Generics - typ-parametrar för flexibilitet</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-yellow-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💭</span>
            <span className="font-semibold text-yellow-300">Reflektion:</span>
          </div>
          <p className="text-sm italic">
            &ldquo;Symboler är byggstenarna i programmeringsspråk - att förstå
            dem öppnar dörren till effektiv kodning.&rdquo;
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-yellow-400">
            TypeScript-symboler i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Vänster kolumn */}
          <div className="space-y-6">
            {/* Grundläggande symboler */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔤</span>
                <h3 className="text-lg font-bold text-red-400">
                  Grundläggande symboler
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  • <strong className="text-yellow-300">:</strong> Typangivelse
                  - anger vilken typ en variabel har
                </p>
                <p>
                  • <strong className="text-yellow-300">=</strong> Tilldelning -
                  ger värde till variabel
                </p>
                <p>
                  • <strong className="text-yellow-300">;</strong> Avslutar
                  uttryck (rekommenderas)
                </p>
                <p>
                  • <strong className="text-yellow-300">.</strong> Åtkomst till
                  objektegenskaper
                </p>
              </div>
            </div>

            {/* Typ-relaterade symboler */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🧩</span>
                <h3 className="text-lg font-bold text-blue-400">
                  Typ-relaterade symboler
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong className="text-yellow-300">| (Union):</strong> string
                  | number
                </p>
                <div className="ml-4">
                  <p>
                    <strong className="text-yellow-300">
                      & (Intersection):
                    </strong>{" "}
                    A & B
                  </p>
                  <p className="ml-4">• Kombinerar flera typer</p>
                </div>
                <p>
                  <strong className="text-yellow-300">? (Optional):</strong>{" "}
                  age?: number
                </p>
                <div className="ml-4">
                  <p>
                    <strong className="text-yellow-300">! (Non-null):</strong>{" "}
                    user!.name
                  </p>
                  <p className="ml-4">• Säkerställer att värdet inte är null</p>
                </div>
              </div>
            </div>
          </div>

          {/* Höger kolumn */}
          <div className="space-y-6">
            {/* Funktionssymboler */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🧮</span>
                <h3 className="text-lg font-bold text-green-400">
                  Funktions- och datastrukturer
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p>
                    <strong className="text-red-300">() (Parenteser):</strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Funktionsanrop eller parametrar
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-yellow-300">
                      {}
                      {} (Klamrar):
                    </strong>
                  </p>
                  <p className="ml-4 text-gray-300">Objekt eller kodblock</p>
                </div>
                <div>
                  <p>
                    <strong className="text-blue-300">
                      [] (Hakparenteser):
                    </strong>
                  </p>
                  <p className="ml-4 text-gray-300">Array-syntax</p>
                </div>
                <div>
                  <p>
                    <strong className="text-indigo-300">=&gt; (Arrow):</strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Arrow functions: (x) =&gt; x * 2
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-cyan-300">
                      &lt; &gt; (Vinkelparenteser):
                    </strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Generics: Array&lt;string&gt;
                  </p>
                </div>
              </div>
            </div>

            {/* Varför symboler är viktiga */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-orange-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💀</span>
                <h3 className="text-lg font-bold text-orange-400">
                  Varför förstå symboler?
                </h3>
              </div>
              <p className="text-sm">
                Varje symbol har en specifik betydelse som formar hur koden
                fungerar:
              </p>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  • <strong className="text-red-300">Läsa kod:</strong>{" "}
                  Förståelse av andras kod
                </p>
                <p>
                  • <strong className="text-red-300">Skriva kod:</strong> Rätt
                  användning förhindrar fel
                </p>
                <p>
                  • <strong className="text-red-300">Debugging:</strong>{" "}
                  Snabbare hitta problem
                </p>
                <p>
                  •{" "}
                  <strong className="text-red-300">TypeScript-specifik:</strong>{" "}
                  Utnyttja språkets fulla potential
                </p>
              </div>
              <div className="mt-3 p-2 bg-blue-900 bg-opacity-30 rounded text-xs">
                <p className="text-blue-200">
                  Symboler är som alfabetet - nödvändiga för att uttrycka
                  komplexa idéer i kod!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
