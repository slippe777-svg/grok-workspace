import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { applyGrade, type ProgressMap } from "@/lib/srs";
import type { CardProgress, CustomDeck, Direction, StudyFront, VocabCard } from "@/lib/types";

type Store = {
  progress: ProgressMap;
  customDecks: CustomDeck[];
  customCards: VocabCard[];
  lastStudyDay: string | null;
  streak: number;
  todayKey: string | null;
  todayCount: number;
  quizDirection: Direction;
  studyFront: StudyFront;
  autoSpeak: boolean;
  hydrated: boolean;
  grade: (id: string, knew: boolean) => void;
  addDeck: (deck: CustomDeck) => void;
  addCard: (card: VocabCard) => void;
  removeCard: (id: string) => void;
  removeDeck: (id: string) => void;
  resetDeck: (deckId: string, cardIds: string[]) => void;
  setQuizDirection: (direction: Direction) => void;
  setStudyFront: (front: StudyFront) => void;
  setAutoSpeak: (on: boolean) => void;
};

const memory = new Map<string, string>();

const safeStorage = {
  getItem: (name: string) => {
    if (typeof window === "undefined") return memory.get(name) ?? null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (typeof window === "undefined") {
      memory.set(name, value);
      return;
    }
    localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    if (typeof window === "undefined") {
      memory.delete(name);
      return;
    }
    localStorage.removeItem(name);
  },
};

function dayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function yesterdayKey(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return dayKey(date);
}

function touchStudy(state: Pick<Store, "lastStudyDay" | "streak" | "todayKey" | "todayCount">) {
  const today = dayKey();
  let streak = state.streak;
  if (state.lastStudyDay !== today) {
    streak = state.lastStudyDay === yesterdayKey() ? state.streak + 1 : 1;
  }
  const todayCount = state.todayKey === today ? state.todayCount + 1 : 1;
  return { lastStudyDay: today, streak, todayKey: today, todayCount };
}

function without(progress: ProgressMap, ids: Iterable<string>): ProgressMap {
  const next = { ...progress };
  for (const id of ids) delete next[id];
  return next;
}

export const useVocab = create<Store>()(
  persist(
    (set) => ({
      progress: {},
      customDecks: [],
      customCards: [],
      lastStudyDay: null,
      streak: 0,
      todayKey: null,
      todayCount: 0,
      quizDirection: "en-uk",
      studyFront: "en",
      autoSpeak: false,
      hydrated: false,
      grade: (id, knew) =>
        set((state) => {
          const prev: CardProgress | undefined = state.progress[id];
          return {
            ...touchStudy(state),
            progress: { ...state.progress, [id]: applyGrade(prev, knew) },
          };
        }),
      addDeck: (deck) => set((state) => ({ customDecks: [...state.customDecks, deck] })),
      addCard: (card) => set((state) => ({ customCards: [...state.customCards, card] })),
      removeCard: (id) =>
        set((state) => ({
          customCards: state.customCards.filter((card) => card.id !== id),
          progress: without(state.progress, [id]),
        })),
      removeDeck: (id) =>
        set((state) => {
          const ids = state.customCards.filter((card) => card.deckId === id).map((card) => card.id);
          return {
            customDecks: state.customDecks.filter((deck) => deck.id !== id),
            customCards: state.customCards.filter((card) => card.deckId !== id),
            progress: without(state.progress, ids),
          };
        }),
      resetDeck: (_deckId, cardIds) => set((state) => ({ progress: without(state.progress, cardIds) })),
      setQuizDirection: (quizDirection) => set({ quizDirection }),
      setStudyFront: (studyFront) => set({ studyFront }),
      setAutoSpeak: (autoSpeak) => set({ autoSpeak }),
    }),
    {
      name: "slovo-trainer-v1",
      skipHydration: true,
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({
        progress: state.progress,
        customDecks: state.customDecks,
        customCards: state.customCards,
        lastStudyDay: state.lastStudyDay,
        streak: state.streak,
        todayKey: state.todayKey,
        todayCount: state.todayCount,
        quizDirection: state.quizDirection,
        studyFront: state.studyFront,
        autoSpeak: state.autoSpeak,
      }),
    },
  ),
);
