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
  "text-amber-300",
  "text-lime-300",
  "text-teal-300",
  "text-fuchsia-300",
];

const cardData = [
  {
    id: 1,
    content: "betterAuth()",
    type: "concept" as const,
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: "Huvudfunktion som skapar en auth-instans",
    type: "description" as const,
    matchId: 1,
    textColor: cardColors[8],
  },

  {
    id: 3,
    content: "database",
    type: "concept" as const,
    matchId: 2,
    textColor: cardColors[1],
  },
  {
    id: 4,
    content: "Konfigurerar databaskopplingen för användardata",
    type: "description" as const,
    matchId: 2,
    textColor: cardColors[9],
  },

  {
    id: 5,
    content: "emailAndPassword",
    type: "concept" as const,
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: "Aktiverar email/lösenord autentisering",
    type: "description" as const,
    matchId: 3,
    textColor: cardColors[10],
  },

  {
    id: 7,
    content: "socialProviders",
    type: "concept" as const,
    matchId: 4,
    textColor: cardColors[3],
  },
  {
    id: 8,
    content: "Konfigurerar OAuth-providers (GitHub, Google, etc)",
    type: "description" as const,
    matchId: 4,
    textColor: cardColors[11],
  },

  {
    id: 9,
    content: "plugins",
    type: "concept" as const,
    matchId: 5,
    textColor: cardColors[4],
  },
  {
    id: 10,
    content: "Array för att lägga till extra funktionalitet",
    type: "description" as const,
    matchId: 5,
    textColor: cardColors[12],
  },

  {
    id: 11,
    content: "BETTER_AUTH_SECRET",
    type: "concept" as const,
    matchId: 6,
    textColor: cardColors[5],
  },
  {
    id: 12,
    content: "Hemlig nyckel för kryptering och hashning",
    type: "description" as const,
    matchId: 6,
    textColor: cardColors[13],
  },

  {
    id: 13,
    content: "BETTER_AUTH_URL",
    type: "concept" as const,
    matchId: 7,
    textColor: cardColors[6],
  },
  {
    id: 14,
    content: "Bas-URL för din applikation",
    type: "description" as const,
    matchId: 7,
    textColor: cardColors[14],
  },

  {
    id: 15,
    content: "auth.handler",
    type: "concept" as const,
    matchId: 8,
    textColor: cardColors[7],
  },
  {
    id: 16,
    content: "Funktion som hanterar alla API-requests",
    type: "description" as const,
    matchId: 8,
    textColor: cardColors[15],
  },
];

export default function BetterAuthGrundkoncept() {
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

      if (newMatches === 8) {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            🔐 Better Auth - Grundläggande Koncept
          </h1>
          <p className="text-gray-200">
            Matcha koncept med deras beskrivningar
          </p>
        </div>

        {/* Spelstatistik */}
        <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 text-white">
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => selectCard(card.id)}
              className={`
                relative h-32 sm:h-36 transform transition-all duration-500 
                ${
                  card.isMatched ? "scale-0 opacity-0" : "scale-100 opacity-100"
                }
                ${!card.isMatched ? "cursor-pointer hover:scale-105" : ""}
              `}
            >
              <div
                className={`
                absolute inset-0 flex flex-col items-center justify-center 
                bg-gray-800 rounded-lg border-2 shadow-lg p-2
                ${
                  card.isSelected
                    ? "ring-4 ring-yellow-400 border-yellow-300"
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Grattis!
              </h2>
              <p className="text-gray-600 mb-6">
                Du klarade spelet på {moves} drag med{" "}
                {Math.round((matches / moves) * 100)}% träffsäkerhet!
              </p>
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
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg p-6 text-white border-2 border-indigo-500">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl">📖</div>
            <h3 className="text-xl font-bold">
              Better Auth - Grundläggande Koncept
            </h3>
          </div>

          <div className="space-y-4 text-sm">
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">
                Framework-agnostiskt
              </p>
              <p>
                Better Auth fungerar med alla ramverk - Next.js, Nuxt,
                SvelteKit, Remix, och många fler
              </p>
            </div>

            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">
                Enkel konfiguration
              </p>
              <p>
                Skapa en auth-instans med betterAuth() och konfigurera databas,
                providers och plugins
              </p>
            </div>

            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Plugin-ekosystem</p>
              <p>
                Utöka funktionalitet med plugins som 2FA, passkey,
                multi-tenancy, och mer
              </p>
            </div>

            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Säkerhet först</p>
              <p>Built-in säkerhet med kryptering, hashing, och CSRF-skydd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
