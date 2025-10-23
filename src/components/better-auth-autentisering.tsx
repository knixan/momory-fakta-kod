"use client";

import { useState, useEffect } from "react";
import React from "react";

interface Card {
  id: number;
  content: string;
  type: "method" | "description";
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
    content: "signUp.email()",
    type: "method" as const,
    matchId: 1,
    textColor: cardColors[0],
  },
  {
    id: 2,
    content: "Skapar ny användare med email och lösenord",
    type: "description" as const,
    matchId: 1,
    textColor: cardColors[8],
  },

  {
    id: 3,
    content: "signIn.email()",
    type: "method" as const,
    matchId: 2,
    textColor: cardColors[1],
  },
  {
    id: 4,
    content: "Loggar in användare med email och lösenord",
    type: "description" as const,
    matchId: 2,
    textColor: cardColors[9],
  },

  {
    id: 5,
    content: "signIn.social()",
    type: "method" as const,
    matchId: 3,
    textColor: cardColors[2],
  },
  {
    id: 6,
    content: "Autentisera via OAuth-providers (GitHub, Google, etc)",
    type: "description" as const,
    matchId: 3,
    textColor: cardColors[10],
  },

  {
    id: 7,
    content: "signOut()",
    type: "method" as const,
    matchId: 4,
    textColor: cardColors[3],
  },
  {
    id: 8,
    content: "Loggar ut användaren och invaliderar sessionen",
    type: "description" as const,
    matchId: 4,
    textColor: cardColors[11],
  },

  {
    id: 9,
    content: "useSession()",
    type: "method" as const,
    matchId: 5,
    textColor: cardColors[4],
  },
  {
    id: 10,
    content: "Hook för att få aktuell session på klientsidan",
    type: "description" as const,
    matchId: 5,
    textColor: cardColors[12],
  },

  {
    id: 11,
    content: "getSession()",
    type: "method" as const,
    matchId: 6,
    textColor: cardColors[5],
  },
  {
    id: 12,
    content: "Hämtar session utan att använda hook",
    type: "description" as const,
    matchId: 6,
    textColor: cardColors[13],
  },

  {
    id: 13,
    content: "auth.api.getSession()",
    type: "method" as const,
    matchId: 7,
    textColor: cardColors[6],
  },
  {
    id: 14,
    content: "Hämtar session på serversidan med headers",
    type: "description" as const,
    matchId: 7,
    textColor: cardColors[14],
  },

  {
    id: 15,
    content: "callbackURL",
    type: "method" as const,
    matchId: 8,
    textColor: cardColors[7],
  },
  {
    id: 16,
    content: "URL dit användaren omdirigeras efter inloggning",
    type: "description" as const,
    matchId: 8,
    textColor: cardColors[15],
  },

  {
    id: 17,
    content: "rememberMe",
    type: "method" as const,
    matchId: 9,
    textColor: cardColors[0],
  },
  {
    id: 18,
    content: "Håller sessionen aktiv efter att webbläsaren stängs",
    type: "description" as const,
    matchId: 9,
    textColor: cardColors[8],
  },

  {
    id: 19,
    content: "autoSignIn",
    type: "method" as const,
    matchId: 10,
    textColor: cardColors[1],
  },
  {
    id: 20,
    content: "Loggar automatiskt in användare efter registrering",
    type: "description" as const,
    matchId: 10,
    textColor: cardColors[9],
  },
];

export default function BetterAuthAutentisering() {
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

      if (newMatches === 10) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-cyan-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            🔑 Better Auth - Autentiseringsmetoder
          </h1>
          <p className="text-gray-200">
            Matcha autentiseringsmetoder med deras funktioner
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
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
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
                  {card.type === "method" && "⚙️"}
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
        <div className="bg-gradient-to-r from-blue-900 to-cyan-900 rounded-lg p-6 text-white border-2 border-blue-500">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl">📖</div>
            <h3 className="text-xl font-bold">
              Better Auth - Autentiseringsmetoder
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Email & Lösenord</p>
              <p>
                Traditionell autentisering med email och lösenord. Aktiveras med
                emailAndPassword: {`{ enabled: true }`}
              </p>
            </div>

            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Social Sign-On</p>
              <p>
                OAuth-autentisering med providers som GitHub, Google, Apple,
                Discord m.fl.
              </p>
            </div>

            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Sessions</p>
              <p>
                Hantera användarens inloggningsstatus både på klient- och
                serversidan
              </p>
            </div>

            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Plugin-metoder</p>
              <p>
                Utöka med passkey, magic link, email-OTP, username och mer via
                plugins
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-yellow-400">
            <p className="text-sm">
              <strong>💡 Tips:</strong> Använd callbacks (onSuccess, onError,
              onRequest) för att hantera UI-uppdateringar och felhantering
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
