"use client";

import { useState, useEffect } from "react";
import React from "react";

interface Card {
  id: number;
  content: string;
  type: "keyword" | "description";
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
  { id: 1, content: "async", type: "keyword" as const, matchId: 1, textColor: cardColors[0] },
  { id: 2, content: "Markerar en metod som asynkron – möjliggör await inuti den", type: "description" as const, matchId: 1, textColor: cardColors[10] },

  { id: 3, content: "await", type: "keyword" as const, matchId: 2, textColor: cardColors[5] },
  { id: 4, content: "Pausar metoden tills en asynkron operation är klar – utan att blockera tråden", type: "description" as const, matchId: 2, textColor: cardColors[15] },

  { id: 5, content: "Task", type: "keyword" as const, matchId: 3, textColor: cardColors[2] },
  { id: 6, content: "Representerar en asynkron operation som INTE returnerar ett värde", type: "description" as const, matchId: 3, textColor: cardColors[12] },

  { id: 7, content: "Task<T>", type: "keyword" as const, matchId: 4, textColor: cardColors[8] },
  { id: 8, content: "Representerar en asynkron operation som returnerar ett värde av typ T", type: "description" as const, matchId: 4, textColor: cardColors[3] },

  { id: 9, content: "async void", type: "keyword" as const, matchId: 5, textColor: cardColors[14] },
  { id: 10, content: "Bör undvikas ⚠️ – undantag kan inte fångas, okej BARA för event handlers", type: "description" as const, matchId: 5, textColor: cardColors[7] },

  { id: 11, content: "Task.Run()", type: "keyword" as const, matchId: 6, textColor: cardColors[1] },
  { id: 12, content: "Kör CPU-intensiv kod på en bakgrundstråd i trådpoolen", type: "description" as const, matchId: 6, textColor: cardColors[11] },

  { id: 13, content: "CancellationToken", type: "keyword" as const, matchId: 7, textColor: cardColors[6] },
  { id: 14, content: "Möjliggör avbrytning av asynkrona operationer på ett kontrollerat sätt", type: "description" as const, matchId: 7, textColor: cardColors[16] },

  { id: 15, content: "ValueTask<T>", type: "keyword" as const, matchId: 8, textColor: cardColors[13] },
  { id: 16, content: "Lättviktig Task-variant – effektiv när operationen ofta är synkron", type: "description" as const, matchId: 8, textColor: cardColors[4] },

  { id: 17, content: "ConfigureAwait(false)", type: "keyword" as const, matchId: 9, textColor: cardColors[9] },
  { id: 18, content: "Hindrar återgång till ursprunglig synkroniseringskontext – används i bibliotek", type: "description" as const, matchId: 9, textColor: cardColors[17] },

  { id: 19, content: "deadlock", type: "keyword" as const, matchId: 10, textColor: cardColors[18] },
  { id: 20, content: "Kan uppstå om man blandar async/await med .Result eller .Wait() ⚠️", type: "description" as const, matchId: 10, textColor: cardColors[19] },
];

const TOTAL_PAIRS = 10;

export default function CsAsyncGame() {
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
      <div className="bg-black/50 rounded-lg p-6 mb-6 text-white">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-sky-400 mb-2">🧠 Matcha C# async/await!</div>
          <div className="text-sm text-gray-300">Klicka på ett nyckelord och dess förklaring. Matchade par försvinner.</div>
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
              <div className="text-xs opacity-75 mt-1 text-white">{card.type === "keyword" ? "⚡" : "📝"}</div>
            </div>
          </div>
        ))}
      </div>

      {gameCompleted && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Grattis!</h2>
            <p className="text-gray-600 mb-6">Du klarade spelet på {moves} drag med {Math.round((matches / moves) * 100)}% träffsäkerhet!</p>
            <div className="bg-sky-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700"><strong>Async/Await:</strong> Modern .NET-kod är genomsyrad av asynkronitet – att förstå Task och await är avgörande för responsiva applikationer.</p>
            </div>
            <button onClick={initializeGame} className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold">Spela igen</button>
          </div>
        </div>
      )}

      <div className="mt-6 bg-gradient-to-r from-sky-900 to-blue-900 rounded-lg p-6 text-white border-2 border-sky-500">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-xl font-bold">Snabbfakta om async/await i C#</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-black/30 rounded p-3">
            <span className="font-semibold text-yellow-300">Grundregel</span>
            <p>async all the way – await uppifrån och ned i anropskedjan</p>
          </div>
          <div className="bg-black/30 rounded p-3">
            <span className="font-semibold text-red-300">Undvik</span>
            <p>.Result, .Wait() – riskerar deadlock i synkron kontext</p>
          </div>
          <div className="bg-black/30 rounded p-3">
            <span className="font-semibold text-green-300">Namnkonvention</span>
            <p>Asynkrona metoder namnges med Async-suffix: GetDataAsync()</p>
          </div>
        </div>

        <div className="mt-4 bg-black/50 rounded p-3 text-sm font-mono text-green-300">
          <p className="text-gray-400 font-sans text-xs mb-1">// Typiskt async-mönster</p>
          <p>public async Task{"<"}string{">"} HämtaDataAsync(int id,</p>
          <p className="ml-4">CancellationToken ct = default)</p>
          <p>{"{"}</p>
          <p className="ml-4">var svar = await httpClient</p>
          <p className="ml-8">.GetStringAsync($"/api/{"{id}"}", ct);</p>
          <p className="ml-4">return svar;</p>
          <p>{"}"}</p>
        </div>

        <div className="mt-4 p-3 bg-black/20 rounded border-l-4 border-sky-400">
          <p className="text-sm italic">&ldquo;Asynkron kod frigör trådar medan man väntar på I/O – det är nyckeln till skalbara .NET-applikationer.&rdquo;</p>
        </div>
      </div>
    </div>
  );
}
