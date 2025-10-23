"use client";

import { useState, useEffect } from "react";
import React from "react";

interface Card {
  id: number;
  content: string;
  type: "query" | "description";
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
  // create
  {
    id: 1,
    content: "create()",
    type: "query" as const,
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: "Skapar en ny post i databasen",
    type: "description" as const,
    matchId: 1,
    textColor: cardColors[6],
  },

  // findMany
  {
    id: 3,
    content: "findMany()",
    type: "query" as const,
    matchId: 2,
    textColor: cardColors[1],
  },
  {
    id: 4,
    content: "Hämtar flera poster från databasen",
    type: "description" as const,
    matchId: 2,
    textColor: cardColors[7],
  },

  // findUnique
  {
    id: 5,
    content: "findUnique()",
    type: "query" as const,
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: "Hämtar en unik post (via id eller @unique fält)",
    type: "description" as const,
    matchId: 3,
    textColor: cardColors[8],
  },

  // update
  {
    id: 7,
    content: "update()",
    type: "query" as const,
    matchId: 4,
    textColor: cardColors[3],
  },
  {
    id: 8,
    content: "Uppdaterar en befintlig post",
    type: "description" as const,
    matchId: 4,
    textColor: cardColors[9],
  },

  // delete
  {
    id: 9,
    content: "delete()",
    type: "query" as const,
    matchId: 5,
    textColor: cardColors[4],
  },
  {
    id: 10,
    content: "Tar bort en post från databasen",
    type: "description" as const,
    matchId: 5,
    textColor: cardColors[10],
  },

  // where
  {
    id: 11,
    content: "where",
    type: "query" as const,
    matchId: 6,
    textColor: cardColors[5],
  },
  {
    id: 12,
    content: "Filtrerar resultat baserat på villkor",
    type: "description" as const,
    matchId: 6,
    textColor: cardColors[11],
  },
];

export default function PrismaQueriesGame() {
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
          <div className="text-xl font-bold text-emerald-400 mb-2">
            ⚡ Matcha Prisma Queries!
          </div>
          <div className="text-sm text-gray-300">
            Klicka på två kort som hör ihop: query och dess funktion. Matchade
            par försvinner från spelbrädet.
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">
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
                  ? "ring-4 ring-emerald-400 border-emerald-300 shadow-emerald-200"
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
                {card.type === "query" && "⚡"}
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
            <div className="bg-emerald-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <strong>Prisma Queries:</strong> Att behärska CRUD-operationer
                är fundamentalt för att arbeta med data i Prisma.
              </p>
            </div>
            <button
              onClick={resetGame}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      {/* Faktaruta */}
      <div className="mt-6 bg-gradient-to-r from-emerald-900 to-green-900 rounded-lg p-6 text-white border-2 border-emerald-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om Prisma Queries</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">➕</span>
              <span className="font-semibold text-emerald-300">Create</span>
            </div>
            <p>Skapar ny data</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔍</span>
              <span className="font-semibold text-blue-300">Find</span>
            </div>
            <p>Hämtar data</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✏️</span>
              <span className="font-semibold text-yellow-300">Update</span>
            </div>
            <p>Uppdaterar data</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🗑️</span>
              <span className="font-semibold text-red-300">Delete</span>
            </div>
            <p>Tar bort data</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎯</span>
              <span className="font-semibold text-purple-300">Where</span>
            </div>
            <p>Filtrerar resultat</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📊</span>
              <span className="font-semibold text-orange-300">CRUD</span>
            </div>
            <p>Create, Read, Update, Delete</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-emerald-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-emerald-300">Tips:</span>
          </div>
          <p className="text-sm">
            Prisma Client ger typade queries - du får autocomplete och
            type-safety direkt från din schema!
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-emerald-400">
            Prisma Queries i djupet
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-emerald-500">
              <h3 className="text-lg font-bold text-emerald-400 mb-3">
                ➕ Create - Skapa data
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Skapar en ny post i databasen.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const user = await prisma.user.create({
  data: {
    email: "anna@example.com",
    name: "Anna"
  }
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-400 mb-3">
                🔍 Find - Hämta data
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Hämtar en eller flera poster.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`// Hämta alla
const users = await prisma.user.findMany()

// Hämta en specifik
const user = await prisma.user.findUnique({
  where: { id: 1 }
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                ✏️ Update - Uppdatera data
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Uppdaterar befintlig data.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const user = await prisma.user.update({
  where: { id: 1 },
  data: { name: "Anna Svensson" }
})`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-red-400 mb-3">
                🗑️ Delete - Ta bort data
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Raderar poster från databasen.</p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const user = await prisma.user.delete({
  where: { id: 1 }
})

// Ta bort många
await prisma.user.deleteMany({
  where: { email: { contains: "test" } }
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                🎯 Where - Filtrera
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Filtrerar resultat baserat på villkor.
                </p>
                <div className="bg-gray-900 p-2 rounded text-xs font-mono">
                  <pre>
                    {`const users = await prisma.user.findMany({
  where: {
    email: { contains: "@gmail" },
    age: { gte: 18 }
  }
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-orange-400 mb-3">
                📊 Andra viktiga queries
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  • <strong className="text-emerald-300">count():</strong>{" "}
                  Räknar poster
                </p>
                <p>
                  • <strong className="text-emerald-300">createMany():</strong>{" "}
                  Skapar flera poster
                </p>
                <p>
                  • <strong className="text-emerald-300">upsert():</strong>{" "}
                  Update eller create
                </p>
                <p>
                  • <strong className="text-emerald-300">orderBy:</strong>{" "}
                  Sortera resultat
                </p>
                <p>
                  • <strong className="text-emerald-300">include:</strong> Inkl.
                  relationer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
