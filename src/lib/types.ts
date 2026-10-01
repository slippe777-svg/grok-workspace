export type Pos = "noun" | "verb" | "adj" | "adv" | "phrase";

export type Direction = "en-uk" | "uk-en";

export type StudyFront = "en" | "uk";

export type VocabCard = {
  id: string;
  deckId: string;
  en: string;
  uk: string;
  say: string;
  pos: Pos;
  example: string;
  exampleUk: string;
  alts: string[];
  enAlts: string[];
};

export type Deck = {
  id: string;
  title: string;
  blurb: string;
  level: string;
  builtin: boolean;
};

export type CustomDeck = {
  id: string;
  title: string;
  blurb: string;
};

export type CardProgress = {
  box: number;
  due: number;
  seen: number;
  correct: number;
  intervalDays: number;
};
