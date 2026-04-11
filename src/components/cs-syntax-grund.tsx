"use client";

import { useState, useEffect } from "react";
import React from "react";

interface Card {
  id: number;
  content: string;
  type: "concept" | "code";
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
    content: "Deklarera variabel",
    type: "concept" as const,
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: "int ålder = 25;\nstring namn = \"Anna\";",
    type: "code" as const,
    matchId: 1,
    textColor: cardColors[10],
  },
  {
    id: 3,
    content: "if-sats",
    type: "concept" as const,
    matchId: 2,
    textColor: cardColors[5],
  },
  {
    id: 4,
    content: "if (x > 0) {\n  Console.WriteLine(\"Positiv\");\n}",
    type: "code" as const,
    matchId: 2,
    textColor: cardColors[15],
  },
  {
    id: 5,
    content: "for-loop",
    type: "concept" as const,
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: "for (int i = 0; i < 10; i++) {\n  // kod\n}",
    type: "code" as const,
    matchId: 3,
    textColor: cardColors[12],
  },
  {
    id: 7,
    content: "foreach-loop",
    type: "concept" as const,
    matchId: 4,
    textColor: cardColors[8],
  },
  {
    id: 8,
    content: "foreach (var item in lista) {\n  Console.WriteLine(item);\n}",
    type: "code" as const,
    matchId: 4,
    textColor: cardColors[3],
  },
  {
    id: 9,
    content: "Metod utan returvärde",
    type: "concept" as const,
    matchId: 5,
    textColor: cardColors[14],
  },
  {
    id: 10,
    content: "void SägHej(string namn) {\n  Console.WriteLine($\"Hej {namn}!\");\n}",
    type: "code" as const,
    matchId: 5,
    textColor: cardColors[7],
  },
  {
    id: 11,
    content: "Metod med returvärde",
    type: "concept" as const,
    matchId: 6,
    textColor: cardColors[1],
  },
  {
    id: 12,
    content: "int Addera(int a, int b) {\n  return a + b;\n}",
    type: "code" as const,
    matchId: 6,
    textColor: cardColors[11],
  },
  {
    id: 13,
    content: "while-loop",
    type: "concept" as const,
    matchId: 7,
    textColor: cardColors[6],
  },
  {
    id: 14,
    content: "while (villkor) {\n  // upprepa\n}",
    type: "code" as const,
    matchId: 7,
    textColor: cardColors[16],
  },
  {
    id: 15,
    content: "switch-sats",
    type: "concept" as const,
    matchId: 8,
    textColor: cardColors[13],
  },
  {
    id: 16,
    content: "switch (dag) {\n  case 1: break;\n  default: break;\n}",
    type: "code" as const,
    matchId: 8,
    textColor: cardColors[4],
  },
  {
    id: 17,
    content: "Skapa lista",
    type: "concept" as const,
    matchId: 9,
    textColor: cardColors[9],
  },
  {
    id: 18,
    content: 'var lista = new List<string>();\nlista.Add("hej");',
    type: "code" as const,
    matchId: 9,
    textColor: cardColors[17],
  },
  {
    id: 19,
    content: "Stränginterpolering",
    type: "concept" as const,
    matchId: 10,
    textColor: cardColors[18],
  },
  {
    id: 20,
    content: 'string namn = "Lisa";\nConsole.WriteLine($"Hej {namn}!");',
    type: "code" as const,
    matchId: 10,
    textColor: cardColors[19],
  },
];

const TOTAL_PAIRS = 10;

export default function CsSyntaxGrundGame() {
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
          <div className="text-xl font-bold text-blue-400 mb-2">
            🧠 Matcha C# syntax med kod!
          </div>
          <div className="text-sm text-gray-300">
            Klicka på ett syntaxkoncept och ett kodexempel som hör ihop.
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
              <div
                className={`text-xs font-semibold text-center leading-tight whitespace-pre-wrap ${card.textColor} ${card.type === "code" ? "font-mono text-[10px]" : "sm:text-sm"}`}
              >
                {card.content}
              </div>
              <div className="text-xs opacity-75 mt-1 text-white">
                {card.type === "concept" && "💡"}
                {card.type === "code" && "💻"}
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
            <div className="bg-blue-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <strong>C# syntax:</strong> Att läsa och skriva C# kod flytande
                är grunden för att bli en skicklig .NET-utvecklare.
              </p>
            </div>
            <button
              onClick={initializeGame}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 bg-gradient-to-r from-blue-900 to-cyan-900 rounded-lg p-6 text-white border-2 border-blue-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om C# grundsyntax</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📦</span>
              <span className="font-semibold text-yellow-300">Variabler</span>
            </div>
            <p>int, var, const, readonly</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔁</span>
              <span className="font-semibold text-red-300">Loopar</span>
            </div>
            <p>for, foreach, while, do-while</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌿</span>
              <span className="font-semibold text-green-300">Villkor</span>
            </div>
            <p>if/else, switch, ternary ? :</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔧</span>
              <span className="font-semibold text-orange-300">Metoder</span>
            </div>
            <p>void, return, params, ref, out</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-blue-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💭</span>
            <span className="font-semibold text-yellow-300">Tips:</span>
          </div>
          <p className="text-sm italic">
            &ldquo;C# liknar Java och TypeScript i syntax – när du lärt dig ett
            av dem är de andra lättare att förstå.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
