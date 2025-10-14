"use client";

import { useState, useEffect } from "react";
import React from "react";

interface Card {
  id: number;
  content: string;
  type: "datatype" | "description";
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
  // string
  {
    id: 1,
    content: "string",
    type: "datatype" as const,
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: "Textsträngar - \"hej\", 'text', `template string`",
    type: "description" as const,
    matchId: 1,
    textColor: cardColors[10],
  },

  // number
  {
    id: 3,
    content: "number",
    type: "datatype" as const,
    matchId: 2,
    textColor: cardColors[5],
  },
  {
    id: 4,
    content: "Alla tal - 42, 3.14, -10 (heltal, decimaltal)",
    type: "description" as const,
    matchId: 2,
    textColor: cardColors[15],
  },

  // boolean
  {
    id: 5,
    content: "boolean",
    type: "datatype" as const,
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: "Sant eller falskt - true, false",
    type: "description" as const,
    matchId: 3,
    textColor: cardColors[12],
  },

  // null
  {
    id: 7,
    content: "null",
    type: "datatype" as const,
    matchId: 4,
    textColor: cardColors[8],
  },
  {
    id: 8,
    content: "Inget värde (avsiktligt tomt)",
    type: "description" as const,
    matchId: 4,
    textColor: cardColors[3],
  },

  // undefined
  {
    id: 9,
    content: "undefined",
    type: "datatype" as const,
    matchId: 5,
    textColor: cardColors[14],
  },
  {
    id: 10,
    content: "Ej definierat (värdet saknas)",
    type: "description" as const,
    matchId: 5,
    textColor: cardColors[7],
  },

  // array
  {
    id: 11,
    content: "array",
    type: "datatype" as const,
    matchId: 6,
    textColor: cardColors[1],
  },
  {
    id: 12,
    content: "Lista av element av samma typ - number[], string[]",
    type: "description" as const,
    matchId: 6,
    textColor: cardColors[11],
  },

  // object
  {
    id: 13,
    content: "object",
    type: "datatype" as const,
    matchId: 7,
    textColor: cardColors[6],
  },
  {
    id: 14,
    content: "Samling av egenskaper (nyckel-värde)",
    type: "description" as const,
    matchId: 7,
    textColor: cardColors[16],
  },

  // any
  {
    id: 15,
    content: "any",
    type: "datatype" as const,
    matchId: 8,
    textColor: cardColors[13],
  },
  {
    id: 16,
    content: "Stänger av typkontrollen (kan vara vad som helst) ⚠️",
    type: "description" as const,
    matchId: 8,
    textColor: cardColors[4],
  },

  // void
  {
    id: 17,
    content: "void",
    type: "datatype" as const,
    matchId: 9,
    textColor: cardColors[9],
  },
  {
    id: 18,
    content: "Används när funktion inte returnerar något",
    type: "description" as const,
    matchId: 9,
    textColor: cardColors[17],
  },

  // Union
  {
    id: 19,
    content: "Union ( | )",
    type: "datatype" as const,
    matchId: 10,
    textColor: cardColors[18],
  },
  {
    id: 20,
    content: "Kombinerar flera möjliga typer - string | number",
    type: "description" as const,
    matchId: 10,
    textColor: cardColors[19],
  },
];

export default function DataTypesGame() {
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
            🧠 Matcha TypeScript-datatyper!
          </div>
          <div className="text-sm text-gray-300">
            Klicka på två kort som hör ihop: datatyp och dess förklaring.
            Matchade par försvinner från spelbrädet.
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
                {card.type === "datatype" && "🧠"}
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
                <strong>TypeScript-datatyper:</strong> Att förstå olika
                datatyper är grundläggande för att skriva säker och förutsägbar
                kod.
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
            Snabbfakta om TypeScript-datatyper
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔤</span>
              <span className="font-semibold text-yellow-300">
                Primära typer
              </span>
            </div>
            <p>string, number, boolean</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📦</span>
              <span className="font-semibold text-red-300">Sammansatta</span>
            </div>
            <p>array, object, tuple</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧮</span>
              <span className="font-semibold text-green-300">Speciella</span>
            </div>
            <p>any, void, never</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧱</span>
              <span className="font-semibold text-orange-300">
                Kombinationer
              </span>
            </div>
            <p>Union, Intersection</p>
          </div>
        </div>

        {/* Datatyper förklaringar */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🧠</span>
            <h4 className="text-lg font-bold text-cyan-300">
              Viktiga TypeScript-datatyper
            </h4>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">string</p>
              <p>
                Textsträngar - &quot;hej&quot;, &apos;text&apos;, `template`
              </p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">number</p>
              <p>Alla tal - 42, 3.14, -10</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">boolean</p>
              <p>Sant eller falskt - true/false</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">array</p>
              <p>Lista av samma typ - number[], string[]</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">object</p>
              <p>Samling av egenskaper - {`{name: string}`}</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">any</p>
              <p>Stänger av typkontroll ⚠️ - använd sparsamt</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">void</p>
              <p>Funktion returnerar inget värde</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Union (|)</p>
              <p>Kombinerar typer - string | number</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">null</p>
              <p>Inget värde (avsiktligt tomt)</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-yellow-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💭</span>
            <span className="font-semibold text-yellow-300">Reflektion:</span>
          </div>
          <p className="text-sm italic">
            &ldquo;Datatyper är byggstenarna i programmering - rätt typ
            säkerställer att din kod fungerar som förväntat.&rdquo;
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-yellow-400">
            TypeScript-datatyper i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Vänster kolumn */}
          <div className="space-y-6">
            {/* Primära datatyper */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔤</span>
                <h3 className="text-lg font-bold text-red-400">
                  Primära datatyper
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  • <strong className="text-yellow-300">string:</strong>{" "}
                  Textsträngar (&quot;hej&quot;, &apos;text&apos;, `template`)
                </p>
                <p>
                  • <strong className="text-yellow-300">number:</strong> Alla
                  tal (42, 3.14, -10)
                </p>
                <p>
                  • <strong className="text-yellow-300">boolean:</strong>{" "}
                  Sant/falskt (true/false)
                </p>
                <p>
                  • <strong className="text-yellow-300">null:</strong>{" "}
                  Avsiktligt tomt värde
                </p>
                <p>
                  • <strong className="text-yellow-300">undefined:</strong>{" "}
                  Värde som saknas
                </p>
              </div>
            </div>

            {/* Sammansatta datatyper */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📦</span>
                <h3 className="text-lg font-bold text-blue-400">
                  Sammansatta datatyper
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong className="text-yellow-300">Array:</strong> Lista av
                  samma typ
                </p>
                <div className="ml-4">
                  <p>
                    <strong className="text-yellow-300">
                      let numbers: number[] = [1, 2, 3];
                    </strong>
                  </p>
                </div>
                <p>
                  <strong className="text-yellow-300">Tuple:</strong> Fast
                  ordning av olika typer
                </p>
                <div className="ml-4">
                  <p>
                    <strong className="text-yellow-300">
                      let person: [string, number] = [&quot;Anna&quot;, 25];
                    </strong>
                  </p>
                </div>
                <p>
                  <strong className="text-yellow-300">Object:</strong>{" "}
                  Egenskaper och värden
                </p>
                <div className="ml-4">
                  <p>
                    <strong className="text-yellow-300">
                      let user = {`{name: "Tom", age: 28}`};
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Höger kolumn */}
          <div className="space-y-6">
            {/* Speciella datatyper */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🧮</span>
                <h3 className="text-lg font-bold text-green-400">
                  Speciella datatyper
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p>
                    <strong className="text-red-300">any:</strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Stänger av typkontroll - använd sparsamt ⚠️
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-yellow-300">unknown:</strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Okänd typ - måste kontrolleras innan användning
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-blue-300">void:</strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Funktion returnerar inget värde
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-indigo-300">never:</strong>
                  </p>
                  <p className="ml-4 text-gray-300">
                    Funktion som aldrig avslutas normalt
                  </p>
                </div>
              </div>
            </div>

            {/* Varför datatyper är viktiga */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-orange-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💀</span>
                <h3 className="text-lg font-bold text-orange-400">
                  Varför förstå datatyper?
                </h3>
              </div>
              <p className="text-sm">
                Rätt datatyper förhindrar många programmeringsfel:
              </p>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  • <strong className="text-red-300">Felförebyggande:</strong>{" "}
                  Upptäck fel tidigt
                </p>
                <p>
                  • <strong className="text-red-300">Bättre IDE-stöd:</strong>{" "}
                  Autokomplettering och refactoring
                </p>
                <p>
                  • <strong className="text-red-300">Kodförståelse:</strong>{" "}
                  Självdokumenterande kod
                </p>
                <p>
                  • <strong className="text-red-300">Prestanda:</strong>{" "}
                  Effektivare kompilering
                </p>
              </div>
              <div className="mt-3 p-2 bg-blue-900 bg-opacity-30 rounded text-xs">
                <p className="text-blue-200">
                  Datatyper är som byggstenar - rätt typ på rätt plats skapar
                  stabila applikationer!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
