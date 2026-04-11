"use client";

import { useState, useEffect } from "react";
import React from "react";

interface Card {
  id: number;
  content: string;
  type: "collection" | "description";
  matchId: number;
  textColor: string;
  isFlipped: boolean;
  isMatched: boolean;
  isSelected?: boolean;
}

const cardColors = [
  "text-red-300", "text-blue-300", "text-green-300", "text-yellow-300",
  "text-purple-300", "text-pink-300", "text-indigo-300", "text-orange-300",
  "text-cyan-300", "text-emerald-300", "text-rose-300", "text-violet-300",
  "text-amber-300", "text-lime-300", "text-teal-300", "text-fuchsia-300",
  "text-sky-300", "text-slate-300", "text-zinc-300", "text-gray-300",
];

const cardData = [
  { id: 1, content: "List<T>", type: "collection" as const, matchId: 1, textColor: cardColors[0] },
  { id: 2, content: "Dynamisk lista – lägg till/ta bort element fritt, indexbaserad", type: "description" as const, matchId: 1, textColor: cardColors[10] },

  { id: 3, content: "Dictionary<K,V>", type: "collection" as const, matchId: 2, textColor: cardColors[5] },
  { id: 4, content: "Nyckel-värde-par – extremt snabb uppslagning med unik nyckel", type: "description" as const, matchId: 2, textColor: cardColors[15] },

  { id: 5, content: "HashSet<T>", type: "collection" as const, matchId: 3, textColor: cardColors[2] },
  { id: 6, content: "Samling av UNIKA element – dubbletter ignoreras automatiskt", type: "description" as const, matchId: 3, textColor: cardColors[12] },

  { id: 7, content: "Queue<T>", type: "collection" as const, matchId: 4, textColor: cardColors[8] },
  { id: 8, content: "Kö – FIFO (First In, First Out): Enqueue lägger till, Dequeue tar ut", type: "description" as const, matchId: 4, textColor: cardColors[3] },

  { id: 9, content: "Stack<T>", type: "collection" as const, matchId: 5, textColor: cardColors[14] },
  { id: 10, content: "Stapel – LIFO (Last In, First Out): Push lägger till, Pop tar ut", type: "description" as const, matchId: 5, textColor: cardColors[7] },

  { id: 11, content: "Array (T[])", type: "collection" as const, matchId: 6, textColor: cardColors[1] },
  { id: 12, content: "Fast storlek, snabb indexåtkomst – deklareras med [] och new T[n]", type: "description" as const, matchId: 6, textColor: cardColors[11] },

  { id: 13, content: "IEnumerable<T>", type: "collection" as const, matchId: 7, textColor: cardColors[6] },
  { id: 14, content: "Basinterface för alla samlingar – möjliggör foreach och LINQ", type: "description" as const, matchId: 7, textColor: cardColors[16] },

  { id: 15, content: "LinkedList<T>", type: "collection" as const, matchId: 8, textColor: cardColors[13] },
  { id: 16, content: "Dubbellänkad lista – effektiv insättning/borttagning mitt i listan", type: "description" as const, matchId: 8, textColor: cardColors[4] },

  { id: 17, content: "SortedDictionary<K,V>", type: "collection" as const, matchId: 9, textColor: cardColors[9] },
  { id: 18, content: "Dictionary som alltid är sorterat efter nyckel – O(log n) åtkomst", type: "description" as const, matchId: 9, textColor: cardColors[17] },

  { id: 19, content: "ConcurrentDictionary<K,V>", type: "collection" as const, matchId: 10, textColor: cardColors[18] },
  { id: 20, content: "Trådsäker Dictionary – säker att använda från flera trådar samtidigt", type: "description" as const, matchId: 10, textColor: cardColors[19] },
];

const TOTAL_PAIRS = 10;

export default function CsCollectionsGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => { initializeGame(); }, []);

  const initializeGame = () => {
    const initialized = cardData.map((c) => ({ ...c, isFlipped: true, isMatched: false }));
    setCards([...initialized].sort(() => Math.random() - 0.5));
    setFlippedCards([]); setMatches(0); setMoves(0); setGameCompleted(false);
  };

  const selectCard = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find((c) => c.id === cardId)?.isMatched) return;
    const next = [...flippedCards, cardId];
    setFlippedCards(next);
    setCards((prev) => prev.map((c) => c.id === cardId ? { ...c, isSelected: true } : c));
    if (next.length === 2) { setMoves((m) => m + 1); checkForMatch(next); }
  };

  const checkForMatch = (ids: number[]) => {
    const [a, b] = ids.map((id) => cards.find((c) => c.id === id));
    if (a && b && a.matchId === b.matchId) {
      setTimeout(() => {
        setCards((prev) => prev.map((c) => ids.includes(c.id) ? { ...c, isMatched: true, isSelected: false } : { ...c, isSelected: false }));
      }, 800);
      setMatches((m) => {
        if (m + 1 === TOTAL_PAIRS) setTimeout(() => setGameCompleted(true), 1200);
        return m + 1;
      });
      setFlippedCards([]);
    } else {
      setTimeout(() => { setCards((prev) => prev.map((c) => ({ ...c, isSelected: false }))); setFlippedCards([]); }, 1000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 text-white">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-emerald-400 mb-2">🧠 Matcha C# collections!</div>
          <div className="text-sm text-gray-300">Klicka på en collection-typ och dess förklaring. Matchade par försvinner.</div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-6">
            <div className="text-center"><div className="text-2xl font-bold text-yellow-400">{matches}</div><div className="text-sm">Matchningar</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-blue-400">{moves}</div><div className="text-sm">Drag</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-green-400">{Math.round((matches / Math.max(moves, 1)) * 100)}%</div><div className="text-sm">Träffsäkerhet</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-purple-400">{TOTAL_PAIRS - matches}</div><div className="text-sm">Kvar</div></div>
          </div>
          <button onClick={initializeGame} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors">🔄 Nytt spel</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div key={card.id} onClick={() => selectCard(card.id)}
            className={`relative h-32 sm:h-36 transform transition-all duration-500 ${card.isMatched ? "scale-0 opacity-0" : "scale-100 opacity-100"} ${!card.isMatched ? "cursor-pointer hover:scale-105" : ""}`}>
            <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gray-800 rounded-lg border-2 shadow-lg p-2 ${card.isSelected ? "ring-4 ring-yellow-400 border-yellow-300" : "border-gray-300"} transition-all duration-300`}>
              <div className={`text-xs sm:text-sm font-semibold text-center leading-tight ${card.textColor}`}>{card.content}</div>
              <div className="text-xs opacity-75 mt-1 text-white">{card.type === "collection" ? "📦" : "📝"}</div>
            </div>
          </div>
        ))}
      </div>

      {gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Grattis!</h2>
            <p className="text-gray-600 mb-6">Du klarade spelet på {moves} drag med {Math.round((matches / moves) * 100)}% träffsäkerhet!</p>
            <div className="bg-emerald-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700"><strong>Collections:</strong> Rätt datastruktur kan göra din kod 100x snabbare – välj List för ordnad data, Dictionary för uppslagning, HashSet för unikhet.</p>
            </div>
            <button onClick={initializeGame} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold">Spela igen</button>
          </div>
        </div>
      )}

      <div className="mt-6 bg-gradient-to-r from-emerald-900 to-green-900 rounded-lg p-6 text-white border-2 border-emerald-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om C# Collections</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-black bg-opacity-30 rounded p-3">
            <span className="font-semibold text-yellow-300">Vanligast</span>
            <p>List&lt;T&gt;, Dictionary&lt;K,V&gt;, Array</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <span className="font-semibold text-red-300">Unikhet</span>
            <p>HashSet&lt;T&gt;, SortedSet&lt;T&gt;</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <span className="font-semibold text-green-300">FIFO/LIFO</span>
            <p>Queue&lt;T&gt; (FIFO), Stack&lt;T&gt; (LIFO)</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-3">
            <span className="font-semibold text-orange-300">Trådsäkert</span>
            <p>ConcurrentDictionary, ConcurrentQueue</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎯</span>
            <h4 className="text-lg font-bold text-cyan-300">Välj rätt collection</h4>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Behöver du söka på nyckel?</p>
              <p>→ Dictionary&lt;K,V&gt;</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Behöver du unika värden?</p>
              <p>→ HashSet&lt;T&gt;</p>
            </div>
            <div className="bg-black bg-opacity-30 rounded p-3">
              <p className="font-semibold text-yellow-300">Behöver du ordnad lista?</p>
              <p>→ List&lt;T&gt; eller Array</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black bg-opacity-20 rounded border-l-4 border-emerald-400">
          <p className="text-sm italic">&ldquo;Dictionary-uppslagning är O(1) medan List-sökning är O(n) – rätt val kan göra enorm skillnad i prestanda.&rdquo;</p>
        </div>
      </div>
    </div>
  );
}
