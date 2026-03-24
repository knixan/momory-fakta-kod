"use client";

import { useState, useEffect } from "react";
import React from "react";

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
  "text-rose-300",
  "text-violet-300",
];

const cardData = [
  // model
  {
    id: 1,
    content: "model",
    type: "concept" as const,
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: "Definierar en databastabell/entitet",
    type: "description" as const,
    matchId: 1,
    textColor: cardColors[6],
  },

  // prisma-client generator (Prisma 7)
  {
    id: 3,
    content: "prisma-client",
    type: "concept" as const,
    matchId: 2,
    textColor: cardColors[1],
  },
  {
    id: 4,
    content: "Ny generator i Prisma 7 (ersätter prisma-client-js)",
    type: "description" as const,
    matchId: 2,
    textColor: cardColors[7],
  },

  // prisma.config.ts (Prisma 7)
  {
    id: 5,
    content: "prisma.config.ts",
    type: "concept" as const,
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: "Ny konfigurationsfil för CLI och databas-URL i Prisma 7",
    type: "description" as const,
    matchId: 3,
    textColor: cardColors[8],
  },

  // Driver Adapter (Prisma 7)
  {
    id: 7,
    content: "Driver Adapter",
    type: "concept" as const,
    matchId: 4,
    textColor: cardColors[3],
  },
  {
    id: 8,
    content: "Krävs i Prisma 7 för att koppla till databasen (ersätter Rust-engine)",
    type: "description" as const,
    matchId: 4,
    textColor: cardColors[9],
  },

  // @relation
  {
    id: 9,
    content: "@relation",
    type: "concept" as const,
    matchId: 5,
    textColor: cardColors[4],
  },
  {
    id: 10,
    content: "Definierar relation mellan modeller",
    type: "description" as const,
    matchId: 5,
    textColor: cardColors[10],
  },

  // output (Prisma 7)
  {
    id: 11,
    content: "output (i generator)",
    type: "concept" as const,
    matchId: 6,
    textColor: cardColors[5],
  },
  {
    id: 12,
    content: "Obligatoriskt i Prisma 7 — anger var klienten genereras",
    type: "description" as const,
    matchId: 6,
    textColor: cardColors[11],
  },
];

export default function PrismaSchemaGame() {
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

      if (newMatches === 6) {
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
          <div className="text-xl font-bold text-cyan-400 mb-2">
            🗄️ Matcha Prisma 7 Schema-koncept!
          </div>
          <div className="text-sm text-gray-300">
            Klicka på två kort som hör ihop: koncept och dess förklaring.
            Matchade par försvinner från spelbrädet.
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{matches}</div>
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
                {6 - matches}
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  ? "ring-4 ring-cyan-400 border-cyan-300 shadow-cyan-200"
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
                {card.type === "concept" && "🧠"}
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
            <div className="bg-cyan-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <strong>Prisma 7 Schema:</strong> Att förstå schema-syntaxen och
                de nya Prisma 7-koncepten som driver adapters och prisma.config.ts
                är grunden för modern Prisma-utveckling.
              </p>
            </div>
            <button
              onClick={resetGame}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-cyan-900 to-blue-900 rounded-lg p-6 text-white border-2 border-cyan-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om Prisma 7 Schema</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🏗️</span>
              <span className="font-semibold text-cyan-300">Model</span>
            </div>
            <p>Definierar tabellstruktur</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚡</span>
              <span className="font-semibold text-yellow-300">prisma-client</span>
            </div>
            <p>Ny Rust-fri generator i v7</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📋</span>
              <span className="font-semibold text-green-300">prisma.config.ts</span>
            </div>
            <p>Ny konfigurationsfil för CLI</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔌</span>
              <span className="font-semibold text-purple-300">Driver Adapter</span>
            </div>
            <p>Ersätter Rust-engine i v7</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔗</span>
              <span className="font-semibold text-pink-300">@relation</span>
            </div>
            <p>Kopplar ihop modeller</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📂</span>
              <span className="font-semibold text-orange-300">output</span>
            </div>
            <p>Obligatoriskt i generator (v7)</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-cyan-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-cyan-300">Tips:</span>
          </div>
          <p className="text-sm">
            Prisma 7 kräver driver adapters och ES-moduler — ingen Rust-engine
            längre! Konfigurationen flyttar till prisma.config.ts.
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-cyan-400">
            Prisma 7 Schema i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                ⚡ Ny generator i Prisma 7
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  prisma-client-js ersätts av prisma-client (Rust-fri).
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`generator client {
  provider = "prisma-client"
  output   = "./generated/prisma"
}

// output är nu obligatoriskt!
// Genereras INTE längre i node_modules`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                📋 prisma.config.ts
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Ny konfigurationsfil ersätter URL i schema.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`import { defineConfig } from "prisma/config"

export default defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
})`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-400 mb-3">
                🔌 Driver Adapter-setup
              </h3>
              <div className="bg-gray-900 p-3 rounded text-xs font-mono">
                <pre>
                  {`import { PrismaClient } from "./generated/prisma"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: url })
const prisma = new PrismaClient({ adapter })`}
                </pre>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                💡 Viktigt i Prisma 7
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  • <strong className="text-cyan-300">ES-moduler:</strong>{" "}
                  Kräver {`"type": "module"`} i package.json
                </p>
                <p>
                  • <strong className="text-cyan-300">Node.js 20.19+:</strong>{" "}
                  Minsta version som stöds
                </p>
                <p>
                  • <strong className="text-cyan-300">TypeScript 5.4+:</strong>{" "}
                  Med moduleResolution: bundler
                </p>
                <p>
                  • <strong className="text-cyan-300">Ingen MongoDB:</strong>{" "}
                  Stöds inte ännu i v7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
