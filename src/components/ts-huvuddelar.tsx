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

const cardPairs = [
  {
    matchId: 1,
    concept: "Syntax",
    description: "Hur koden skrivs\n{ }, ;, if, for",
    conceptIcon: "🧠",
    descIcon: "📝",
  },
  {
    matchId: 2,
    concept: "Datatyper",
    description: "string, number, boolean\narray, object",
    conceptIcon: "🧩",
    descIcon: "🔢",
  },
  {
    matchId: 3,
    concept: "Operatorer",
    description: "+, -, *, /\n&&, ||, ===",
    conceptIcon: "🔣",
    descIcon: "⚡",
  },
  {
    matchId: 4,
    concept: "Variabler",
    description: "let name = 'Anna'\nconst age = 25",
    conceptIcon: "🧮",
    descIcon: "📦",
  },
  {
    matchId: 5,
    concept: "Funktioner",
    description: "function greet()\n=> arrow functions",
    conceptIcon: "⚙️",
    descIcon: "🔧",
  },
  {
    matchId: 6,
    concept: "Objekt & Klasser",
    description: "class Person {}\n{ name, age }",
    conceptIcon: "🧱",
    descIcon: "🏗️",
  },
  {
    matchId: 7,
    concept: "Interface",
    description: "interface User {}\ntype Shape = ...",
    conceptIcon: "🧩",
    descIcon: "📋",
  },
  {
    matchId: 8,
    concept: "Generics",
    description: "Array<T>\nfunction<T>(value: T)",
    conceptIcon: "🧠",
    descIcon: "🔄",
  },
  {
    matchId: 9,
    concept: "Moduler",
    description: "import { ... }\nexport default",
    conceptIcon: "⚡",
    descIcon: "📚",
  },
  {
    matchId: 10,
    concept: "Kontrollstrukturer",
    description: "if/else, switch\nfor, while loops",
    conceptIcon: "🔄",
    descIcon: "🎯",
  },
];

export default function HuvuddelarGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const allCards: Card[] = [];

    // Skapa kort för begrepp och beskrivningar
    cardPairs.forEach((pair, index) => {
      // Begreppskort
      allCards.push({
        id: pair.matchId,
        content: pair.concept,
        type: "concept",
        matchId: pair.matchId,
        textColor: cardColors[index * 2],
        isFlipped: true,
        isMatched: false,
      });

      // Beskrivningskort
      allCards.push({
        id: pair.matchId + 100, // Offset för att undvika ID-konflikter
        content: pair.description,
        type: "description",
        matchId: pair.matchId,
        textColor: cardColors[index * 2 + 1],
        isFlipped: true,
        isMatched: false,
      });
    });

    // Blanda korten
    const shuffledCards = [...allCards].sort(() => Math.random() - 0.5);
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

    if (
      firstCard &&
      secondCard &&
      firstCard.matchId === secondCard.matchId &&
      firstCard.type !== secondCard.type // Måste vara olika typer (concept + description)
    ) {
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

  const getCardIcon = (card: Card) => {
    const pair = cardPairs.find((p) => p.matchId === card.matchId);
    if (!pair) return "📝";
    return card.type === "concept" ? pair.conceptIcon : pair.descIcon;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Spelstatistik och instruktioner */}
      <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 text-white">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-purple-400 mb-2">
            🧠 Matcha TypeScript-begrepp med beskrivningar!
          </div>
          <div className="text-sm text-gray-300">
            Klicka på ett begrepp och matcha det med rätt beskrivning eller
            exempel. Matchade par försvinner från spelbrädet.
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
              ${
                card.type === "concept"
                  ? "bg-gradient-to-br from-blue-900 to-purple-900"
                  : "bg-gradient-to-br from-green-900 to-teal-900"
              }
              transition-all duration-300
            `}
            >
              <div className="text-lg mb-1">{getCardIcon(card)}</div>
              <div
                className={`text-xs sm:text-sm font-semibold text-center leading-tight ${card.textColor} whitespace-pre-line`}
              >
                {card.content}
              </div>
              {card.type === "concept" && (
                <div className="text-xs opacity-75 mt-1 text-white">
                  Begrepp
                </div>
              )}
              {card.type === "description" && (
                <div className="text-xs opacity-75 mt-1 text-white">
                  Exempel
                </div>
              )}
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
            <div className="bg-purple-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <strong>Bra jobbat!</strong> Nu känner du till huvuddelarna i
                TypeScript och hur de används i praktiken.
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
      <div className="mt-6 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg p-6 text-white border-2 border-purple-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Så fungerar matchningen</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧠</span>
              <span className="font-semibold text-blue-300">Begreppskort</span>
            </div>
            <p>Blå bakgrund - visar namnet på TypeScript-konceptet</p>
          </div>

          <div className="bg-black bg-opacity-30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📝</span>
              <span className="font-semibold text-green-300">
                Beskrivningskort
              </span>
            </div>
            <p>Grön bakgrund - visar exempel eller förklaring</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-yellow-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-yellow-300">Tips:</span>
          </div>
          <p className="text-sm italic">
            &ldquo;Varje begrepp har sitt eget exempel. Försök koppla samman vad
            du vet om TypeScript för att hitta rätt matchningar!&rdquo;
          </p>
        </div>
      </div>

      {/* Detaljerad information */}
      <div className="mt-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-lg p-6 text-white border-2 border-gray-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📚</div>
          <h2 className="text-2xl font-bold text-purple-400">
            TypeScript-huvuddelar i djupet
          </h2>
        </div>

        <div className="space-y-6">
          {/* Syntax och struktur */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧠</span>
              <h3 className="text-lg font-bold text-blue-400">
                1. Syntax och struktur
              </h3>
            </div>
            <p className="text-sm mb-3">Hur koden skrivs och organiseras.</p>
            <div className="space-y-2 text-sm">
              <p>
                • <strong className="text-yellow-300">Variabler:</strong> let,
                const
              </p>
              <p>
                • <strong className="text-yellow-300">Satser:</strong> if, for,
                while
              </p>
              <p>
                • <strong className="text-yellow-300">Funktioner:</strong>{" "}
                function keyword
              </p>
              <p>
                • <strong className="text-yellow-300">Block:</strong>{" "}
                {"{ ... }"}
              </p>
              <p>
                • <strong className="text-yellow-300">Kommentarer:</strong>{" "}
                {"//"}, /* */
              </p>
            </div>
            <div className="mt-3 p-2 bg-blue-900 bg-opacity-30 rounded text-xs">
              <p className="text-blue-200">
                ➡️ Syfte: definiera programflöde och logik.
              </p>
            </div>
          </div>

          {/* Datatyper */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧩</span>
              <h3 className="text-lg font-bold text-green-400">2. Datatyper</h3>
            </div>
            <p className="text-sm mb-3">
              Vilken sorts information som lagras eller hanteras.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-semibold text-yellow-300">Grundtyper:</p>
                <p>string, number, boolean, null, undefined</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-300">
                  Samlings- och specialtyper:
                </p>
                <p>array, tuple, object, any, unknown</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-semibold text-yellow-300">Avancerat:</p>
                <p>union, intersection, literal types, enum, generic</p>
              </div>
            </div>
            <div className="mt-3 p-2 bg-green-900 bg-opacity-30 rounded text-xs">
              <p className="text-green-200">
                ➡️ Syfte: skapa struktur, minska fel och ge tydlighet.
              </p>
            </div>
          </div>

          {/* Operatorer och tecken */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-red-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔣</span>
              <h3 className="text-lg font-bold text-red-400">
                3. Operatorer och tecken
              </h3>
            </div>
            <p className="text-sm mb-3">
              Symboler som styr hur data behandlas.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-semibold text-yellow-300">Aritmetiska:</p>
                <p>+, -, *, /</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-300">Jämförelser:</p>
                <p>==, ===, &lt;, &gt;</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-300">Logiska:</p>
                <p>&amp;&amp;, ||, !</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-300">Typrelaterade:</p>
                <p>:, |, &amp;, as, typeof</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-semibold text-yellow-300">
                  Ternära och spread:
                </p>
                <p>? :, ...</p>
              </div>
            </div>
            <div className="mt-3 p-2 bg-red-900 bg-opacity-30 rounded text-xs">
              <p className="text-red-200">
                ➡️ Syfte: utföra operationer och styra logik.
              </p>
            </div>
          </div>

          {/* Variabler och konstanter */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-yellow-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧮</span>
              <h3 className="text-lg font-bold text-yellow-400">
                4. Variabler och konstanter
              </h3>
            </div>
            <p className="text-sm mb-3">Hur man lagrar värden.</p>
            <div className="space-y-2 text-sm">
              <p>
                • <strong className="text-blue-300">let</strong> → ändringsbar
                variabel
              </p>
              <p>
                • <strong className="text-green-300">const</strong> → konstant
                värde
              </p>
              <p>
                • <strong className="text-red-300">var</strong> → äldre variant
                (undviks oftast i TS)
              </p>
            </div>
            <div className="mt-3 p-2 bg-yellow-900 bg-opacity-30 rounded text-xs">
              <p className="text-yellow-200">
                ➡️ Syfte: hålla data i minnet för senare användning.
              </p>
            </div>
          </div>

          {/* Funktioner */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⚙️</span>
              <h3 className="text-lg font-bold text-purple-400">
                5. Funktioner
              </h3>
            </div>
            <p className="text-sm mb-3">
              Block av kod som går att återanvända.
            </p>
            <div className="bg-gray-800 p-3 rounded text-sm font-mono text-green-300 mb-3">
              <pre>{`function greet(name: string): string {
  return \`Hej, \${name}!\`;
}`}</pre>
            </div>
            <div className="mt-3 p-2 bg-purple-900 bg-opacity-30 rounded text-xs">
              <p className="text-purple-200">
                ➡️ Syfte: återanvänd logik, dela upp programmet i mindre delar.
              </p>
            </div>
          </div>

          {/* Objekt och klasser */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-orange-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧱</span>
              <h3 className="text-lg font-bold text-orange-400">
                6. Objekt och klasser
              </h3>
            </div>
            <p className="text-sm mb-3">
              Grunden för objektorienterad programmering (OOP).
            </p>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-yellow-300">
                  Objekt: strukturerad data
                </p>
                <div className="bg-gray-800 p-2 rounded text-xs font-mono text-blue-300 mt-1">
                  const user = {'{ name: "Anna", age: 25 }'};
                </div>
              </div>
              <div>
                <p className="font-semibold text-yellow-300">
                  Klasser: mallar för att skapa objekt
                </p>
                <div className="bg-gray-800 p-2 rounded text-xs font-mono text-green-300 mt-1">
                  <pre>{`class Person {
  constructor(public name: string) {}
  greet() { console.log(\`Hej \${this.name}\`); }
}`}</pre>
                </div>
              </div>
            </div>
            <div className="mt-3 p-2 bg-orange-900 bg-opacity-30 rounded text-xs">
              <p className="text-orange-200">
                ➡️ Syfte: strukturera och modellera verkliga saker.
              </p>
            </div>
          </div>

          {/* Interface & Type */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-cyan-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧩</span>
              <h3 className="text-lg font-bold text-cyan-400">
                7. Interface & Type
              </h3>
            </div>
            <p className="text-sm mb-3">
              Sätt att beskriva form och struktur på objekt och data.
            </p>
            <div className="bg-gray-800 p-3 rounded text-sm font-mono text-yellow-300 mb-3">
              <pre>{`interface User {
  id: number;
  name: string;
}`}</pre>
            </div>
            <div className="mt-3 p-2 bg-cyan-900 bg-opacity-30 rounded text-xs">
              <p className="text-cyan-200">
                ➡️ Syfte: skapa tydliga &quot;mallar&quot; för data.
              </p>
            </div>
          </div>

          {/* Generics */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-pink-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧠</span>
              <h3 className="text-lg font-bold text-pink-400">8. Generics</h3>
            </div>
            <p className="text-sm mb-3">
              Kod som kan användas med olika datatyper utan att tappa
              typkontroll.
            </p>
            <div className="bg-gray-800 p-3 rounded text-sm font-mono text-green-300 mb-3">
              <pre>{`function identity<T>(value: T): T {
  return value;
}`}</pre>
            </div>
            <div className="mt-3 p-2 bg-pink-900 bg-opacity-30 rounded text-xs">
              <p className="text-pink-200">
                ➡️ Syfte: återanvändbar och flexibel kod.
              </p>
            </div>
          </div>

          {/* Moduler och import/export */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-indigo-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⚡</span>
              <h3 className="text-lg font-bold text-indigo-400">
                9. Moduler och import/export
              </h3>
            </div>
            <p className="text-sm mb-3">Hur man delar upp kod i flera filer.</p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-semibold text-yellow-300">{"// user.ts"}</p>
                <div className="bg-gray-800 p-2 rounded text-xs font-mono text-blue-300">
                  export interface User {"{ name: string; }"}
                </div>
              </div>
              <div>
                <p className="font-semibold text-yellow-300">{"// app.ts"}</p>
                <div className="bg-gray-800 p-2 rounded text-xs font-mono text-green-300">
                  import {"{ User }"} from &quot;./user&quot;;
                </div>
              </div>
            </div>
            <div className="mt-3 p-2 bg-indigo-900 bg-opacity-30 rounded text-xs">
              <p className="text-indigo-200">
                ➡️ Syfte: strukturera större projekt.
              </p>
            </div>
          </div>

          {/* Felhantering */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-red-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧰</span>
              <h3 className="text-lg font-bold text-red-400">
                10. Felhantering
              </h3>
            </div>
            <p className="text-sm mb-3">Hanterar oväntade situationer.</p>
            <div className="bg-gray-800 p-3 rounded text-sm font-mono text-red-300 mb-3">
              <pre>{`try {
  throw new Error("Något gick fel");
} catch (e) {
  console.log(e.message);
}`}</pre>
            </div>
            <div className="mt-3 p-2 bg-red-900 bg-opacity-30 rounded text-xs">
              <p className="text-red-200">
                ➡️ Syfte: förhindra att program kraschar vid fel.
              </p>
            </div>
          </div>

          {/* Kontrollstrukturer */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-emerald-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔄</span>
              <h3 className="text-lg font-bold text-emerald-400">
                11. Kontrollstrukturer
              </h3>
            </div>
            <p className="text-sm mb-3">Styr programflödet.</p>
            <div className="space-y-2 text-sm">
              <p>
                • <strong className="text-yellow-300">if / else:</strong>{" "}
                Villkorlig körning
              </p>
              <p>
                • <strong className="text-yellow-300">switch:</strong> Flera
                alternativ
              </p>
              <p>
                •{" "}
                <strong className="text-yellow-300">
                  for, while, for...of, for...in:
                </strong>{" "}
                Loopar
              </p>
              <p>
                •{" "}
                <strong className="text-yellow-300">
                  return, break, continue:
                </strong>{" "}
                Kontrollflöde
              </p>
            </div>
            <div className="mt-3 p-2 bg-emerald-900 bg-opacity-30 rounded text-xs">
              <p className="text-emerald-200">
                ➡️ Syfte: styra ordningen som koden körs i.
              </p>
            </div>
          </div>

          {/* Kommentarer och dokumentation */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-gray-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💬</span>
              <h3 className="text-lg font-bold text-gray-400">
                12. Kommentarer och dokumentation
              </h3>
            </div>
            <p className="text-sm mb-3">Förklarar koden.</p>
            <div className="space-y-2 text-sm">
              <p>
                •{" "}
                <strong className="text-green-300">
                  {"// En enkel kommentar"}
                </strong>
              </p>
              <div className="bg-gray-800 p-2 rounded text-xs font-mono text-blue-300">
                <pre>{`/**
 * Dokumentationskommentar för funktioner
 */`}</pre>
              </div>
            </div>
            <div className="mt-3 p-2 bg-gray-900 bg-opacity-30 rounded text-xs">
              <p className="text-gray-200">
                ➡️ Syfte: gör koden lättare att förstå och underhålla.
              </p>
            </div>
          </div>

          {/* Typdeklarationer och bibliotek */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-teal-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧩</span>
              <h3 className="text-lg font-bold text-teal-400">
                13. Typdeklarationer och bibliotek
              </h3>
            </div>
            <p className="text-sm mb-3">
              TypeScript använder ofta typer från externa bibliotek
              (.d.ts-filer).
            </p>
            <div className="bg-gray-800 p-3 rounded text-sm font-mono text-yellow-300 mb-3">
              <pre>npm install --save-dev @types/express</pre>
            </div>
            <div className="mt-3 p-2 bg-teal-900 bg-opacity-30 rounded text-xs">
              <p className="text-teal-200">
                ➡️ Syfte: lägga till typstöd för tredjepartspaket.
              </p>
            </div>
          </div>

          {/* Konfigurationsfiler */}
          <div className="bg-black bg-opacity-40 rounded-lg p-4 border-l-4 border-amber-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧾</span>
              <h3 className="text-lg font-bold text-amber-400">
                14. Konfigurationsfiler
              </h3>
            </div>
            <p className="text-sm mb-3">
              tsconfig.json – styr hur TypeScript kompilerar projektet.
            </p>
            <div className="bg-gray-800 p-3 rounded text-sm font-mono text-cyan-300 mb-3">
              <pre>{`{
  "compilerOptions": {
    "target": "ES6",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}`}</pre>
            </div>
            <div className="mt-3 p-2 bg-amber-900 bg-opacity-30 rounded text-xs">
              <p className="text-amber-200">
                ➡️ Syfte: kontrollera hur koden översätts till JavaScript.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
