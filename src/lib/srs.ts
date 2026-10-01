import { plural } from "@/lib/text";
import type { CardProgress, VocabCard } from "@/lib/types";

const MIN10 = 10 * 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;

export type ProgressMap = Record<string, CardProgress>;

export function applyGrade(prev: CardProgress | undefined, knew: boolean, now = Date.now()): CardProgress {
  const base = prev ?? { box: 0, due: 0, seen: 0, correct: 0, intervalDays: 0 };
  let box = 1;
  let intervalDays = 0;
  let due = now + MIN10;
  if (knew && base.box <= 1) {
    box = 2;
    intervalDays = 1;
    due = now + DAY;
  } else if (knew && base.box === 2) {
    box = 3;
    intervalDays = 3;
    due = now + 3 * DAY;
  } else if (knew && base.box === 3) {
    box = 4;
    intervalDays = 7;
    due = now + 7 * DAY;
  } else if (knew) {
    box = 4;
    intervalDays = 21;
    due = now + 21 * DAY;
  }
  return {
    box,
    due,
    intervalDays,
    seen: base.seen + 1,
    correct: base.correct + (knew ? 1 : 0),
  };
}

export function deckStats(cards: VocabCard[], progress: ProgressMap, now = Date.now()) {
  let fresh = 0;
  let learning = 0;
  let known = 0;
  let due = 0;
  for (const card of cards) {
    const item = progress[card.id];
    if (!item) {
      fresh += 1;
      due += 1;
      continue;
    }
    if (item.box >= 3) known += 1;
    else learning += 1;
    if (item.due <= now) due += 1;
  }
  return { fresh, learning, known, due, total: cards.length };
}

export function isCaughtUp(cards: VocabCard[], progress: ProgressMap, now = Date.now()): boolean {
  if (cards.length === 0) return false;
  return cards.every((card) => {
    const item = progress[card.id];
    return item !== undefined && item.due > now;
  });
}

function formatGap(ms: number): string {
  const mins = Math.max(1, Math.round(ms / 60000));
  if (mins < 60) return `через ${mins} ${plural(mins, "хвилину", "хвилини", "хвилин")}`;
  const hours = Math.max(1, Math.round(mins / 60));
  if (hours < 36) return `через ${hours} ${plural(hours, "годину", "години", "годин")}`;
  const days = Math.max(1, Math.round(hours / 24));
  return `через ${days} ${plural(days, "день", "дні", "днів")}`;
}

export function nextDuePhrase(cards: VocabCard[], progress: ProgressMap, now = Date.now()): string | null {
  let min = Infinity;
  for (const card of cards) {
    const item = progress[card.id];
    if (!item || item.due <= now) return null;
    if (item.due < min) min = item.due;
  }
  if (!Number.isFinite(min)) return null;
  return `наступне ${formatGap(min - now)}`;
}

export function dueLabel(item: CardProgress | undefined, now = Date.now()): string {
  if (!item) return "нове";
  if (item.due <= now) return "пора повторити";
  return formatGap(item.due - now);
}

function shuffled<T>(list: T[]): T[] {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = copy[i];
    const b = copy[j];
    if (a === undefined || b === undefined) continue;
    copy[i] = b;
    copy[j] = a;
  }
  return copy;
}

export function sessionQueue(cards: VocabCard[], progress: ProgressMap, limit = 12, mix = false): VocabCard[] {
  const now = Date.now();
  const due = cards.filter((card) => {
    const item = progress[card.id];
    return !item || item.due <= now;
  });
  const orderedDue = mix
    ? shuffled(due)
    : due.slice().sort((a, b) => {
        const box = (progress[a.id]?.box ?? 0) - (progress[b.id]?.box ?? 0);
        if (box !== 0) return box;
        return (progress[a.id]?.due ?? 0) - (progress[b.id]?.due ?? 0);
      });
  if (orderedDue.length >= limit) return orderedDue.slice(0, limit);
  if (orderedDue.length > 0) return orderedDue;
  if (mix) return shuffled(cards).slice(0, Math.min(limit, cards.length));
  return cards
    .slice()
    .sort((a, b) => (progress[a.id]?.due ?? 0) - (progress[b.id]?.due ?? 0))
    .slice(0, Math.min(limit, cards.length));
}

export function quizQueue(cards: VocabCard[], progress: ProgressMap, limit = 10): VocabCard[] {
  const now = Date.now();
  const due = shuffled(
    cards.filter((card) => {
      const item = progress[card.id];
      return !item || item.due <= now;
    }),
  );
  const later = shuffled(
    cards.filter((card) => {
      const item = progress[card.id];
      return item !== undefined && item.due > now;
    }),
  );
  return [...due, ...later].slice(0, Math.min(limit, cards.length));
}

export function requeue(queue: VocabCard[], index: number): { queue: VocabCard[]; index: number } {
  const next = queue.slice();
  const [current] = next.splice(index, 1);
  if (!current) return { queue, index };
  next.push(current);
  let nextIndex = index;
  if (next.length === 1 || nextIndex >= next.length - 1) nextIndex = 0;
  return { queue: next, index: nextIndex };
}

export function dropCurrent(queue: VocabCard[], index: number): { queue: VocabCard[]; index: number; done: boolean } {
  const next = queue.filter((_, i) => i !== index);
  if (next.length === 0) return { queue: next, index: 0, done: true };
  return { queue: next, index: index >= next.length ? 0 : index, done: false };
}
