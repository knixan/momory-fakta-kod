"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface MemoryPair {
  term: string;
  match: string;
  /** Visa termen som kod (monospace). Skriver över spelets standard. */
  termCode?: boolean;
  /** Visa matchningen som kod (monospace). Skriver över spelets standard. */
  matchCode?: boolean;
}

interface Card {
  id: number;
  pairId: number;
  kind: "term" | "match";
  text: string;
  code: boolean;
}

interface MemoryGameProps {
  pairs: MemoryPair[];
  instructions: string;
  termLabel: string;
  matchLabel: string;
  termCode?: boolean;
  matchCode?: boolean;
  /** Kort text som visas när spelet är klart. */
  completionNote?: string;
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildDeck(
  pairs: MemoryPair[],
  termCode: boolean,
  matchCode: boolean
): Card[] {
  return shuffle(
    pairs.flatMap((pair, index) => [
      {
        id: index * 2,
        pairId: index,
        kind: "term" as const,
        text: pair.term,
        code: pair.termCode ?? termCode,
      },
      {
        id: index * 2 + 1,
        pairId: index,
        kind: "match" as const,
        text: pair.match,
        code: pair.matchCode ?? matchCode,
      },
    ])
  );
}

export default function MemoryGame({
  pairs,
  instructions,
  termLabel,
  matchLabel,
  termCode = false,
  matchCode = false,
  completionNote,
}: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState(false);
  const [moves, setMoves] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setCards(buildDeck(pairs, termCode, matchCode));
    setSelected([]);
    setMatched(new Set());
    setWrong(false);
    setMoves(0);
    setDismissed(false);
  }, [pairs, termCode, matchCode]);

  // Blanda först på klienten så att server- och klientrendering matchar.
  useEffect(() => {
    reset();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [reset]);

  const select = (card: Card) => {
    if (selected.length === 2) return;
    if (selected.includes(card.id) || matched.has(card.pairId)) return;

    const next = [...selected, card.id];
    setSelected(next);
    if (next.length < 2) return;

    setMoves((m) => m + 1);
    const first = cards.find((c) => c.id === next[0]);

    if (first && first.pairId === card.pairId) {
      timer.current = setTimeout(() => {
        setMatched((prev) => new Set(prev).add(card.pairId));
        setSelected([]);
      }, 450);
    } else {
      setWrong(true);
      timer.current = setTimeout(() => {
        setSelected([]);
        setWrong(false);
      }, 900);
    }
  };

  const total = pairs.length;
  const found = matched.size;
  const accuracy = moves === 0 ? 0 : Math.round((found / moves) * 100);
  const completed = total > 0 && found === total;

  const gridCols =
    cards.length > 8
      ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-5"
      : "grid-cols-2 sm:grid-cols-4";

  return (
    <section aria-label="Spelplan">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4 rounded-xl border border-line bg-surface px-5 py-4">
        <div>
          <p className="max-w-xl text-sm text-fg-muted">{instructions}</p>
          <dl className="mt-3 flex gap-6 text-sm">
            <Stat label="Par" value={`${found} / ${total}`} />
            <Stat label="Drag" value={moves} />
            <Stat label="Träffsäkerhet" value={`${accuracy}%`} />
          </dl>
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-fg-muted/50 hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          Nytt spel
        </button>
      </div>

      <div className={`grid gap-3 ${gridCols}`}>
        {cards.map((card) => {
          const isMatched = matched.has(card.pairId);
          const isSelected = selected.includes(card.id);
          const isWrong = isSelected && wrong;

          let state =
            "border-line bg-surface hover:border-fg-muted/40 hover:bg-surface-raised";
          if (isWrong) state = "border-danger/70 bg-danger/10";
          else if (isSelected) state = "border-accent bg-accent/10";

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => select(card)}
              disabled={isMatched}
              aria-pressed={isSelected}
              className={`flex min-h-28 flex-col rounded-lg border p-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${state} ${
                isMatched ? "invisible scale-95 opacity-0" : "cursor-pointer"
              }`}
            >
              <span className="text-[11px] font-medium uppercase tracking-wider text-fg-muted">
                {card.kind === "term" ? termLabel : matchLabel}
              </span>
              <span
                className={`mt-2 flex flex-1 items-center ${
                  card.code
                    ? "whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-fg"
                    : "whitespace-pre-line text-sm leading-snug text-fg"
                }`}
              >
                {card.text}
              </span>
            </button>
          );
        })}
      </div>

      {completed && !dismissed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="memory-done-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
        >
          <div className="w-full max-w-md rounded-xl border border-line bg-surface p-6">
            <h2 id="memory-done-title" className="text-xl font-semibold text-fg">
              Alla par hittade
            </h2>
            <p className="mt-2 text-sm text-fg-muted">
              Du klarade spelet på {moves} drag med {accuracy}% träffsäkerhet.
            </p>
            {completionNote && (
              <p className="mt-4 border-l-2 border-accent/60 pl-3 text-sm leading-relaxed text-fg">
                {completionNote}
              </p>
            )}
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
              >
                Stäng
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Spela igen
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-xs text-fg-muted">{label}</dt>
      <dd className="text-lg font-semibold tabular-nums text-fg">{value}</dd>
    </div>
  );
}
