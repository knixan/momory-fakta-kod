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
  {
    id: 1,
    content: "int",
    type: "datatype" as const,
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: "Heltal (32-bit) - t.ex. 42, -10, 0",
    type: "description" as const,
    matchId: 1,
    textColor: cardColors[10],
  },
  {
    id: 3,
    content: "string",
    type: "datatype" as const,
    matchId: 2,
    textColor: cardColors[5],
  },
  {
    id: 4,
    content: 'Textsträngar - "hej", @"rå sträng"',
    type: "description" as const,
    matchId: 2,
    textColor: cardColors[15],
  },
  {
    id: 5,
    content: "bool",
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
  {
    id: 7,
    content: "double",
    type: "datatype" as const,
    matchId: 4,
    textColor: cardColors[8],
  },
  {
    id: 8,
    content: "Decimaltal (64-bit) - t.ex. 3.14, -0.5",
    type: "description" as const,
    matchId: 4,
    textColor: cardColors[3],
  },
  {
    id: 9,
    content: "char",
    type: "datatype" as const,
    matchId: 5,
    textColor: cardColors[14],
  },
  {
    id: 10,
    content: "Enskilt tecken - 'A', 'z', '3'",
    type: "description" as const,
    matchId: 5,
    textColor: cardColors[7],
  },
  {
    id: 11,
    content: "long",
    type: "datatype" as const,
    matchId: 6,
    textColor: cardColors[1],
  },
  {
    id: 12,
    content: "Stort heltal (64-bit) - för mycket stora tal",
    type: "description" as const,
    matchId: 6,
    textColor: cardColors[11],
  },
  {
    id: 13,
    content: "float",
    type: "datatype" as const,
    matchId: 7,
    textColor: cardColors[6],
  },
  {
    id: 14,
    content: "Decimaltal (32-bit) - t.ex. 3.14f (kräver f)",
    type: "description" as const,
    matchId: 7,
    textColor: cardColors[16],
  },
  {
    id: 15,
    content: "decimal",
    type: "datatype" as const,
    matchId: 8,
    textColor: cardColors[13],
  },
  {
    id: 16,
    content: "Exakt decimaltal - används för pengar/finans (m suffix)",
    type: "description" as const,
    matchId: 8,
    textColor: cardColors[4],
  },
  {
    id: 17,
    content: "byte",
    type: "datatype" as const,
    matchId: 9,
    textColor: cardColors[9],
  },
  {
    id: 18,
    content: "Litet heltal utan tecken - värden 0 till 255",
    type: "description" as const,
    matchId: 9,
    textColor: cardColors[17],
  },
  {
    id: 19,
    content: "object",
    type: "datatype" as const,
    matchId: 10,
    textColor: cardColors[18],
  },
  {
    id: 20,
    content: "Basklass för ALLA typer i C# - kan hålla vad som helst",
    type: "description" as const,
    matchId: 10,
    textColor: cardColors[19],
  },
];

const TOTAL_PAIRS = 10;

export default function CsDatatyperGame() {
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

      if (newMatches === TOTAL_PAIRS) {
        setTimeout(() => setGameCompleted(true), 1200);
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 text-white">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-purple-400 mb-2">
            🧠 Matcha C# datatyper!
          </div>
          <div className="text-sm text-gray-300">
            Klicka på två kort som hör ihop: datatyp och dess förklaring.
            Matchade par försvinner från spelbrädet.
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{matches}</div>
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
                {TOTAL_PAIRS - matches}
              </div>
              <div className="text-sm">Kvar</div>
            </div>
          </div>
          <button
            onClick={initializeGame}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            🔄 Nytt spel
          </button>
        </div>
      </div>

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
            <div
              className={`
              absolute inset-0 flex flex-col items-center justify-center bg-gray-800
              rounded-lg border-2 shadow-lg p-2
              ${card.isSelected ? "ring-4 ring-yellow-400 border-yellow-300 shadow-yellow-200" : "border-gray-300"}
              transition-all duration-300
            `}
            >
              <div className={`text-xs sm:text-sm font-semibold text-center leading-tight ${card.textColor}`}>
                {card.content}
              </div>
              <div className="text-xs opacity-75 mt-1 text-white">
                {card.type === "datatype" && "🔷"}
                {card.type === "description" && "📝"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Grattis!</h2>
            <p className="text-gray-600 mb-6">
              Du klarade spelet på {moves} drag med{" "}
              {Math.round((matches / moves) * 100)}% träffsäkerhet!
            </p>
            <div className="bg-purple-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <strong>C# datatyper:</strong> C# är ett statiskt typat språk –
                rätt datatyp ger säkrare och effektivare kod.
              </p>
            </div>
            <button
              onClick={initializeGame}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg p-6 text-white border-2 border-purple-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om C# datatyper</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔢</span>
              <span className="font-semibold text-yellow-300">Heltal</span>
            </div>
            <p>byte, int, long</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔣</span>
              <span className="font-semibold text-red-300">Decimaltal</span>
            </div>
            <p>float, double, decimal</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔤</span>
              <span className="font-semibold text-green-300">Text</span>
            </div>
            <p>char, string</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧱</span>
              <span className="font-semibold text-orange-300">Övrigt</span>
            </div>
            <p>bool, object</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🧠</span>
            <h4 className="text-lg font-bold text-cyan-300">Viktiga C# datatyper</h4>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {[
              { name: "int", desc: "Heltal (32-bit), vanligaste heltalstypen" },
              { name: "double", desc: "Decimaltal (64-bit), standard för decimaler" },
              { name: "decimal", desc: "Exakt decimaltal, m suffix - t.ex. 9.99m" },
              { name: "string", desc: 'Text - "hej", interpolering med $"Hej {namn}"' },
              { name: "bool", desc: "Logiskt värde - true eller false" },
              { name: "char", desc: "Enskilt tecken med enkelfnutt - 'A'" },
              { name: "long", desc: "Stort heltal (64-bit), L suffix - t.ex. 9999L" },
              { name: "float", desc: "Decimaltal (32-bit), f suffix - t.ex. 3.14f" },
              { name: "object", desc: "Basklass - alla typer ärver från object" },
            ].map((item) => (
              <div key={item.name} className="bg-black bg-opacity-30 rounded p-3">
                <p className="font-semibold text-yellow-300">{item.name}</p>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-purple-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💭</span>
            <span className="font-semibold text-yellow-300">Reflektion:</span>
          </div>
          <p className="text-sm italic">
            &ldquo;I C# är varje variabel starkt typbunden – kompilatorn hjälper
            dig hitta fel redan innan programmet kör.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
