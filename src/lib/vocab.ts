import type { CustomDeck, Deck, Direction, Pos, VocabCard } from "@/lib/types";

export const MIX_ID = "mix";

export const POS_LABEL: Record<Pos, string> = {
  noun: "іменник",
  verb: "дієслово",
  adj: "прикметник",
  adv: "прислівник",
  phrase: "фраза",
};

export const BUILTIN_DECKS: Deck[] = [
  {
    id: "daily",
    title: "Повсякденне",
    blurb: "Вітання, дім, час",
    level: "A1",
    builtin: true,
  },
  {
    id: "travel",
    title: "Подорож",
    blurb: "Аеропорт, дорога, готель",
    level: "A1",
    builtin: true,
  },
  {
    id: "food",
    title: "Їжа",
    blurb: "Кафе, продукти, замовлення",
    level: "A1",
    builtin: true,
  },
  {
    id: "work",
    title: "Робота",
    blurb: "Офіс, строки, люди",
    level: "A2",
    builtin: true,
  },
  {
    id: "verbs",
    title: "Дієслова",
    blurb: "Дії, без яких нікуди",
    level: "A1",
    builtin: true,
  },
  {
    id: "traits",
    title: "Описи",
    blurb: "Якості та стани",
    level: "A1",
    builtin: true,
  },
];

const MIX_DECK: Deck = {
  id: MIX_ID,
  title: "Змішана",
  blurb: "Слова з усіх колод",
  level: "усі",
  builtin: true,
};

function slug(en: string): string {
  return en
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function c(
  deckId: string,
  en: string,
  uk: string,
  say: string,
  pos: Pos,
  example: string,
  exampleUk: string,
  alts: string[] = [],
  enAlts: string[] = [],
): VocabCard {
  return {
    id: `${deckId}:${slug(en)}`,
    deckId,
    en,
    uk,
    say,
    pos,
    example,
    exampleUk,
    alts,
    enAlts,
  };
}

export const BUILTIN_CARDS: VocabCard[] = [
  c("daily", "hello", "привіт", "хелоу", "phrase", "Hello!", "Привіт!", ["хай"], ["hi"]),
  c("daily", "please", "будь ласка", "пліз", "phrase", "Please sit down.", "Сідайте, будь ласка."),
  c(
    "daily",
    "thank you",
    "дякую",
    "сенк ю",
    "phrase",
    "Thank you for your help.",
    "Дякую за допомогу.",
    ["спасибі"],
    ["thanks"],
  ),
  c(
    "daily",
    "sorry",
    "вибачте",
    "сорі",
    "phrase",
    "Sorry for the delay.",
    "Вибачте за затримку.",
    ["вибач", "пробачте"],
  ),
  c("daily", "water", "вода", "вотер", "noun", "A glass of water, please.", "Склянку води, будь ласка."),
  c("daily", "friend", "друг", "френд", "noun", "She is my friend.", "Вона моя подруга.", ["подруга"]),
  c("daily", "home", "дім", "хоум", "noun", "I'm going home.", "Я йду додому.", ["додому", "хата"]),
  c("daily", "family", "родина", "фемілі", "noun", "My family is small.", "Моя родина невелика.", ["сім'я"]),
  c("daily", "morning", "ранок", "морнінґ", "noun", "Good morning.", "Доброго ранку."),
  c("daily", "evening", "вечір", "івнінґ", "noun", "See you in the evening.", "Побачимось увечері."),
  c("daily", "today", "сьогодні", "тудей", "adv", "Today is Monday.", "Сьогодні понеділок."),
  c("daily", "tomorrow", "завтра", "тумороу", "adv", "We leave tomorrow.", "Ми їдемо завтра."),

  c("travel", "airport", "аеропорт", "еапорт", "noun", "The airport is crowded.", "В аеропорту людно."),
  c("travel", "ticket", "квиток", "тікіт", "noun", "I need a ticket.", "Мені потрібен квиток."),
  c("travel", "passport", "паспорт", "паспорт", "noun", "Here is my passport.", "Ось мій паспорт."),
  c("travel", "hotel", "готель", "хоутел", "noun", "The hotel is near the station.", "Готель біля вокзалу."),
  c(
    "travel",
    "train",
    "поїзд",
    "трейн",
    "noun",
    "The train leaves at six.",
    "Поїзд відходить о шостій.",
    ["потяг"],
  ),
  c("travel", "bus", "автобус", "бас", "noun", "We took the bus.", "Ми поїхали автобусом."),
  c("travel", "luggage", "багаж", "лагідж", "noun", "Where is my luggage?", "Де мій багаж?"),
  c("travel", "map", "карта", "меп", "noun", "This map is clear.", "Ця карта зрозуміла.", ["мапа"]),
  c("travel", "taxi", "таксі", "таксі", "noun", "Let's take a taxi.", "Візьмімо таксі."),
  c("travel", "left", "ліворуч", "лефт", "adv", "Turn left.", "Поверніть ліворуч.", ["наліво"]),
  c(
    "travel",
    "right",
    "праворуч",
    "райт",
    "adv",
    "The museum is on the right.",
    "Музей праворуч.",
    ["направо"],
  ),
  c(
    "travel",
    "delay",
    "затримка",
    "ділей",
    "noun",
    "The flight has a delay.",
    "Рейс затримується.",
    ["запізнення"],
  ),

  c("food", "breakfast", "сніданок", "брекфаст", "noun", "Breakfast is at eight.", "Сніданок о восьмій."),
  c("food", "lunch", "обід", "ланч", "noun", "Lunch is ready.", "Обід готовий."),
  c("food", "dinner", "вечеря", "дінер", "noun", "Dinner is on the table.", "Вечеря на столі."),
  c("food", "bread", "хліб", "бред", "noun", "Fresh bread.", "Свіжий хліб."),
  c("food", "coffee", "кава", "кофі", "noun", "I drink coffee in the morning.", "Вранці я п'ю каву."),
  c("food", "tea", "чай", "ті", "noun", "Would you like tea?", "Хочете чаю?"),
  c("food", "juice", "сік", "джус", "noun", "Orange juice, please.", "Апельсиновий сік, будь ласка."),
  c("food", "menu", "меню", "меню", "noun", "Can I see the menu?", "Можна меню?"),
  c("food", "bill", "рахунок", "біл", "noun", "The bill, please.", "Рахунок, будь ласка.", ["чек"]),
  c(
    "food",
    "delicious",
    "смачний",
    "ділішес",
    "adj",
    "This soup is delicious.",
    "Цей суп смачний.",
    ["смачна", "смачне", "смачно"],
  ),
  c("food", "hungry", "голодний", "ханґрі", "adj", "I'm hungry.", "Я голодний.", ["голодна"]),
  c("food", "chicken", "курка", "чікін", "noun", "Grilled chicken, please.", "Курку на грилі, будь ласка."),

  c(
    "work",
    "meeting",
    "нарада",
    "мітінґ",
    "noun",
    "The meeting starts at nine.",
    "Нарада починається о дев'ятій.",
    ["зустріч"],
  ),
  c("work", "office", "офіс", "офіс", "noun", "I work in an office.", "Я працюю в офісі."),
  c(
    "work",
    "deadline",
    "крайній термін",
    "дедлайн",
    "noun",
    "The deadline is Friday.",
    "Крайній термін — п'ятниця.",
    ["дедлайн"],
  ),
  c(
    "work",
    "email",
    "електронна пошта",
    "імейл",
    "noun",
    "I sent an email.",
    "Я надіслав електронного листа.",
    ["імейл", "електронний лист"],
  ),
  c("work", "colleague", "колега", "коліґ", "noun", "My colleague is away today.", "Колега сьогодні відсутній."),
  c("work", "project", "проєкт", "проджект", "noun", "The project is new.", "Проєкт новий.", ["проект"]),
  c("work", "schedule", "розклад", "скеджул", "noun", "Check the schedule.", "Перевірте розклад.", ["графік"]),
  c(
    "work",
    "salary",
    "зарплата",
    "селері",
    "noun",
    "Salary is paid monthly.",
    "Зарплату платять щомісяця.",
    ["зарплатня"],
  ),
  c("work", "task", "завдання", "таск", "noun", "This task is urgent.", "Це завдання термінове.", ["задача"]),
  c("work", "report", "звіт", "ріпорт", "noun", "I wrote a short report.", "Я написав короткий звіт."),
  c("work", "interview", "співбесіда", "інтерв'ю", "noun", "The interview went well.", "Співбесіда минула добре."),
  c("work", "client", "клієнт", "клайєнт", "noun", "The client called.", "Клієнт зателефонував."),

  c(
    "verbs",
    "go",
    "іти, їхати",
    "ґоу",
    "verb",
    "I go home by bus.",
    "Я їду додому автобусом.",
    ["іти", "їхати", "йти", "ходити"],
  ),
  c("verbs", "have", "мати", "хев", "verb", "We have time.", "У нас є час."),
  c(
    "verbs",
    "make",
    "робити",
    "мейк",
    "verb",
    "She makes breakfast.",
    "Вона готує сніданок.",
    ["зробити", "готувати"],
  ),
  c("verbs", "know", "знати", "ноу", "verb", "I know the answer.", "Я знаю відповідь."),
  c("verbs", "want", "хотіти", "вонт", "verb", "I want tea.", "Я хочу чаю.", ["хочу"]),
  c("verbs", "need", "потребувати", "нід", "verb", "I need help.", "Мені потрібна допомога.", ["треба"]),
  c("verbs", "think", "думати", "сінк", "verb", "I think so.", "Я так думаю.", ["гадати"]),
  c("verbs", "see", "бачити", "сі", "verb", "I see the station.", "Я бачу вокзал.", ["побачити"]),
  c(
    "verbs",
    "come",
    "приходити",
    "кам",
    "verb",
    "Come in, please.",
    "Заходьте, будь ласка.",
    ["прийти", "приходити"],
  ),
  c("verbs", "take", "брати", "тейк", "verb", "Take an umbrella.", "Візьміть парасольку.", ["взяти"]),
  c("verbs", "give", "давати", "ґів", "verb", "Give me a minute.", "Дайте мені хвилину.", ["дати"]),
  c(
    "verbs",
    "speak",
    "говорити",
    "спік",
    "verb",
    "Do you speak English?",
    "Ви розмовляєте англійською?",
    ["розмовляти"],
  ),

  c(
    "traits",
    "good",
    "хороший",
    "ґуд",
    "adj",
    "This is a good plan.",
    "Це хороший план.",
    ["добрий", "хороша", "хороше"],
  ),
  c(
    "traits",
    "bad",
    "поганий",
    "бед",
    "adj",
    "Bad weather today.",
    "Сьогодні погана погода.",
    ["погана", "погане"],
  ),
  c("traits", "big", "великий", "біґ", "adj", "A big city.", "Велике місто.", ["велика", "велике"]),
  c(
    "traits",
    "small",
    "маленький",
    "смол",
    "adj",
    "A small cafe.",
    "Маленьке кафе.",
    ["маленька", "маленьке", "малий"],
  ),
  c("traits", "new", "новий", "нью", "adj", "A new word.", "Нове слово.", ["нова", "нове"]),
  c(
    "traits",
    "easy",
    "легкий",
    "ізі",
    "adj",
    "This exercise is easy.",
    "Ця вправа легка.",
    ["легка", "легке", "легко"],
  ),
  c(
    "traits",
    "difficult",
    "складний",
    "діфікелт",
    "adj",
    "A difficult question.",
    "Складне запитання.",
    ["складна", "складне", "важкий"],
  ),
  c(
    "traits",
    "important",
    "важливий",
    "імпортнт",
    "adj",
    "An important letter.",
    "Важливий лист.",
    ["важлива", "важливе"],
  ),
  c(
    "traits",
    "beautiful",
    "гарний",
    "б'ютіфул",
    "adj",
    "A beautiful evening.",
    "Гарний вечір.",
    ["красивий", "гарна", "красива"],
  ),
  c("traits", "fast", "швидкий", "фаст", "adj", "A fast train.", "Швидкий поїзд.", ["швидка", "швидке"]),
  c("traits", "happy", "щасливий", "хепі", "adj", "I am happy.", "Я щасливий.", ["щаслива", "радісний"]),
  c("traits", "ready", "готовий", "реді", "adj", "I am ready.", "Я готовий.", ["готова", "готово"]),
];

function withArrays(card: VocabCard): VocabCard {
  return {
    ...card,
    say: card.say ?? "",
    example: card.example ?? "",
    exampleUk: card.exampleUk ?? "",
    alts: card.alts ?? [],
    enAlts: card.enAlts ?? [],
    pos: card.pos ?? "noun",
  };
}

export function isCustomId(id: string): boolean {
  return id.startsWith("c-");
}

export function getDeck(id: string, custom: CustomDeck[]): Deck | null {
  if (id === MIX_ID) return MIX_DECK;
  const built = BUILTIN_DECKS.find((deck) => deck.id === id);
  if (built) return built;
  const own = custom.find((deck) => deck.id === id);
  if (!own) return null;
  return { id: own.id, title: own.title, blurb: own.blurb, level: "своє", builtin: false };
}

export function cardsForDeck(id: string, custom: VocabCard[]): VocabCard[] {
  const own = custom.map(withArrays);
  if (id === MIX_ID) return [...BUILTIN_CARDS, ...own];
  return [...BUILTIN_CARDS.filter((card) => card.deckId === id), ...own.filter((card) => card.deckId === id)];
}

export function expectedAnswers(card: VocabCard, direction: Direction): string[] {
  if (direction === "en-uk") return [card.uk, ...card.alts];
  return [card.en, ...card.enAlts];
}

export function promptOf(card: VocabCard, direction: Direction): string {
  return direction === "en-uk" ? card.en : card.uk;
}

export function answerOf(card: VocabCard, direction: Direction): string {
  return direction === "en-uk" ? card.uk : card.en;
}
