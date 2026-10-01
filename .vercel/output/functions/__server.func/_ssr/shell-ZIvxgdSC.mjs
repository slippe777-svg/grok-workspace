import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-ZIvxgdSC.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var variants = {
	primary: "bg-accent text-accent-fg hover:bg-paper",
	ghost: "border border-border bg-surface text-foreground hover:bg-surface-2",
	quiet: "bg-transparent text-muted hover:text-foreground",
	ink: "bg-ink text-paper hover:bg-ink/90",
	paper: "border border-line bg-transparent text-ink hover:bg-line"
};
function buttonClass(variant = "primary", className) {
	return cn("btn inline-flex h-11 items-center justify-center gap-2 rounded-sm px-4 text-sm font-medium disabled:pointer-events-none disabled:opacity-40", variants[variant], className);
}
function Button({ variant = "primary", className, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: buttonClass(variant, className),
		...props
	});
}
var POS_LABEL = {
	noun: "іменник",
	verb: "дієслово",
	adj: "прикметник",
	adv: "прислівник",
	phrase: "фраза"
};
var BUILTIN_DECKS = [
	{
		id: "daily",
		title: "Повсякденне",
		blurb: "Вітання, дім, час",
		level: "A1",
		builtin: true
	},
	{
		id: "travel",
		title: "Подорож",
		blurb: "Аеропорт, дорога, готель",
		level: "A1",
		builtin: true
	},
	{
		id: "food",
		title: "Їжа",
		blurb: "Кафе, продукти, замовлення",
		level: "A1",
		builtin: true
	},
	{
		id: "work",
		title: "Робота",
		blurb: "Офіс, строки, люди",
		level: "A2",
		builtin: true
	},
	{
		id: "verbs",
		title: "Дієслова",
		blurb: "Дії, без яких нікуди",
		level: "A1",
		builtin: true
	},
	{
		id: "traits",
		title: "Описи",
		blurb: "Якості та стани",
		level: "A1",
		builtin: true
	}
];
var MIX_DECK = {
	id: "mix",
	title: "Змішана",
	blurb: "Слова з усіх колод",
	level: "усі",
	builtin: true
};
function slug(en) {
	return en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function c(deckId, en, uk, say, pos, example, exampleUk, alts = [], enAlts = []) {
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
		enAlts
	};
}
var BUILTIN_CARDS = [
	c("daily", "hello", "привіт", "хелоу", "phrase", "Hello!", "Привіт!", ["хай"], ["hi"]),
	c("daily", "please", "будь ласка", "пліз", "phrase", "Please sit down.", "Сідайте, будь ласка."),
	c("daily", "thank you", "дякую", "сенк ю", "phrase", "Thank you for your help.", "Дякую за допомогу.", ["спасибі"], ["thanks"]),
	c("daily", "sorry", "вибачте", "сорі", "phrase", "Sorry for the delay.", "Вибачте за затримку.", ["вибач", "пробачте"]),
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
	c("travel", "train", "поїзд", "трейн", "noun", "The train leaves at six.", "Поїзд відходить о шостій.", ["потяг"]),
	c("travel", "bus", "автобус", "бас", "noun", "We took the bus.", "Ми поїхали автобусом."),
	c("travel", "luggage", "багаж", "лагідж", "noun", "Where is my luggage?", "Де мій багаж?"),
	c("travel", "map", "карта", "меп", "noun", "This map is clear.", "Ця карта зрозуміла.", ["мапа"]),
	c("travel", "taxi", "таксі", "таксі", "noun", "Let's take a taxi.", "Візьмімо таксі."),
	c("travel", "left", "ліворуч", "лефт", "adv", "Turn left.", "Поверніть ліворуч.", ["наліво"]),
	c("travel", "right", "праворуч", "райт", "adv", "The museum is on the right.", "Музей праворуч.", ["направо"]),
	c("travel", "delay", "затримка", "ділей", "noun", "The flight has a delay.", "Рейс затримується.", ["запізнення"]),
	c("food", "breakfast", "сніданок", "брекфаст", "noun", "Breakfast is at eight.", "Сніданок о восьмій."),
	c("food", "lunch", "обід", "ланч", "noun", "Lunch is ready.", "Обід готовий."),
	c("food", "dinner", "вечеря", "дінер", "noun", "Dinner is on the table.", "Вечеря на столі."),
	c("food", "bread", "хліб", "бред", "noun", "Fresh bread.", "Свіжий хліб."),
	c("food", "coffee", "кава", "кофі", "noun", "I drink coffee in the morning.", "Вранці я п'ю каву."),
	c("food", "tea", "чай", "ті", "noun", "Would you like tea?", "Хочете чаю?"),
	c("food", "juice", "сік", "джус", "noun", "Orange juice, please.", "Апельсиновий сік, будь ласка."),
	c("food", "menu", "меню", "меню", "noun", "Can I see the menu?", "Можна меню?"),
	c("food", "bill", "рахунок", "біл", "noun", "The bill, please.", "Рахунок, будь ласка.", ["чек"]),
	c("food", "delicious", "смачний", "ділішес", "adj", "This soup is delicious.", "Цей суп смачний.", [
		"смачна",
		"смачне",
		"смачно"
	]),
	c("food", "hungry", "голодний", "ханґрі", "adj", "I'm hungry.", "Я голодний.", ["голодна"]),
	c("food", "chicken", "курка", "чікін", "noun", "Grilled chicken, please.", "Курку на грилі, будь ласка."),
	c("work", "meeting", "нарада", "мітінґ", "noun", "The meeting starts at nine.", "Нарада починається о дев'ятій.", ["зустріч"]),
	c("work", "office", "офіс", "офіс", "noun", "I work in an office.", "Я працюю в офісі."),
	c("work", "deadline", "крайній термін", "дедлайн", "noun", "The deadline is Friday.", "Крайній термін — п'ятниця.", ["дедлайн"]),
	c("work", "email", "електронна пошта", "імейл", "noun", "I sent an email.", "Я надіслав електронного листа.", ["імейл", "електронний лист"]),
	c("work", "colleague", "колега", "коліґ", "noun", "My colleague is away today.", "Колега сьогодні відсутній."),
	c("work", "project", "проєкт", "проджект", "noun", "The project is new.", "Проєкт новий.", ["проект"]),
	c("work", "schedule", "розклад", "скеджул", "noun", "Check the schedule.", "Перевірте розклад.", ["графік"]),
	c("work", "salary", "зарплата", "селері", "noun", "Salary is paid monthly.", "Зарплату платять щомісяця.", ["зарплатня"]),
	c("work", "task", "завдання", "таск", "noun", "This task is urgent.", "Це завдання термінове.", ["задача"]),
	c("work", "report", "звіт", "ріпорт", "noun", "I wrote a short report.", "Я написав короткий звіт."),
	c("work", "interview", "співбесіда", "інтерв'ю", "noun", "The interview went well.", "Співбесіда минула добре."),
	c("work", "client", "клієнт", "клайєнт", "noun", "The client called.", "Клієнт зателефонував."),
	c("verbs", "go", "іти, їхати", "ґоу", "verb", "I go home by bus.", "Я їду додому автобусом.", [
		"іти",
		"їхати",
		"йти",
		"ходити"
	]),
	c("verbs", "have", "мати", "хев", "verb", "We have time.", "У нас є час."),
	c("verbs", "make", "робити", "мейк", "verb", "She makes breakfast.", "Вона готує сніданок.", ["зробити", "готувати"]),
	c("verbs", "know", "знати", "ноу", "verb", "I know the answer.", "Я знаю відповідь."),
	c("verbs", "want", "хотіти", "вонт", "verb", "I want tea.", "Я хочу чаю.", ["хочу"]),
	c("verbs", "need", "потребувати", "нід", "verb", "I need help.", "Мені потрібна допомога.", ["треба"]),
	c("verbs", "think", "думати", "сінк", "verb", "I think so.", "Я так думаю.", ["гадати"]),
	c("verbs", "see", "бачити", "сі", "verb", "I see the station.", "Я бачу вокзал.", ["побачити"]),
	c("verbs", "come", "приходити", "кам", "verb", "Come in, please.", "Заходьте, будь ласка.", ["прийти", "приходити"]),
	c("verbs", "take", "брати", "тейк", "verb", "Take an umbrella.", "Візьміть парасольку.", ["взяти"]),
	c("verbs", "give", "давати", "ґів", "verb", "Give me a minute.", "Дайте мені хвилину.", ["дати"]),
	c("verbs", "speak", "говорити", "спік", "verb", "Do you speak English?", "Ви розмовляєте англійською?", ["розмовляти"]),
	c("traits", "good", "хороший", "ґуд", "adj", "This is a good plan.", "Це хороший план.", [
		"добрий",
		"хороша",
		"хороше"
	]),
	c("traits", "bad", "поганий", "бед", "adj", "Bad weather today.", "Сьогодні погана погода.", ["погана", "погане"]),
	c("traits", "big", "великий", "біґ", "adj", "A big city.", "Велике місто.", ["велика", "велике"]),
	c("traits", "small", "маленький", "смол", "adj", "A small cafe.", "Маленьке кафе.", [
		"маленька",
		"маленьке",
		"малий"
	]),
	c("traits", "new", "новий", "нью", "adj", "A new word.", "Нове слово.", ["нова", "нове"]),
	c("traits", "easy", "легкий", "ізі", "adj", "This exercise is easy.", "Ця вправа легка.", [
		"легка",
		"легке",
		"легко"
	]),
	c("traits", "difficult", "складний", "діфікелт", "adj", "A difficult question.", "Складне запитання.", [
		"складна",
		"складне",
		"важкий"
	]),
	c("traits", "important", "важливий", "імпортнт", "adj", "An important letter.", "Важливий лист.", ["важлива", "важливе"]),
	c("traits", "beautiful", "гарний", "б'ютіфул", "adj", "A beautiful evening.", "Гарний вечір.", [
		"красивий",
		"гарна",
		"красива"
	]),
	c("traits", "fast", "швидкий", "фаст", "adj", "A fast train.", "Швидкий поїзд.", ["швидка", "швидке"]),
	c("traits", "happy", "щасливий", "хепі", "adj", "I am happy.", "Я щасливий.", ["щаслива", "радісний"]),
	c("traits", "ready", "готовий", "реді", "adj", "I am ready.", "Я готовий.", ["готова", "готово"])
];
function withArrays(card) {
	return {
		...card,
		say: card.say ?? "",
		example: card.example ?? "",
		exampleUk: card.exampleUk ?? "",
		alts: card.alts ?? [],
		enAlts: card.enAlts ?? [],
		pos: card.pos ?? "noun"
	};
}
function isCustomId(id) {
	return id.startsWith("c-");
}
function getDeck(id, custom) {
	if (id === "mix") return MIX_DECK;
	const built = BUILTIN_DECKS.find((deck) => deck.id === id);
	if (built) return built;
	const own = custom.find((deck) => deck.id === id);
	if (!own) return null;
	return {
		id: own.id,
		title: own.title,
		blurb: own.blurb,
		level: "своє",
		builtin: false
	};
}
function cardsForDeck(id, custom) {
	const own = custom.map(withArrays);
	if (id === "mix") return [...BUILTIN_CARDS, ...own];
	return [...BUILTIN_CARDS.filter((card) => card.deckId === id), ...own.filter((card) => card.deckId === id)];
}
function expectedAnswers(card, direction) {
	if (direction === "en-uk") return [card.uk, ...card.alts];
	return [card.en, ...card.enAlts];
}
function promptOf(card, direction) {
	return direction === "en-uk" ? card.en : card.uk;
}
function answerOf(card, direction) {
	return direction === "en-uk" ? card.uk : card.en;
}
var widths = {
	wide: "max-w-5xl",
	base: "max-w-3xl",
	study: "max-w-xl"
};
function Shell({ children, width = "base" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("safe-pad mx-auto w-full", widths[width]),
			children
		})
	});
}
function BackLink() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "inline-flex h-11 items-center gap-2 text-sm text-muted hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
			className: "size-4",
			"aria-hidden": "true"
		}), "Колоди"]
	});
}
function Missing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		width: "study",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl text-foreground",
				children: "Колоду не знайдено"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Можливо, її вже видалено."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: buttonClass("primary", "mt-6"),
				children: "На головну"
			})
		]
	});
}
function Boot({ title = "Слово" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Тренажер слів"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "mt-1 font-serif text-5xl text-foreground",
		children: title
	})] });
}
function Segmented({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"aria-label": label,
		className: "inline-flex max-w-full flex-wrap rounded-md border border-border bg-surface p-1",
		children: options.map((option) => {
			const on = option.value === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": on,
				onClick: () => onChange(option.value),
				className: cn("btn h-11 rounded-sm px-3 text-sm", on ? "bg-accent text-accent-fg" : "text-muted hover:text-foreground"),
				children: option.label
			}, option.value);
		})
	});
}
//#endregion
export { Missing as a, Shell as c, cardsForDeck as d, cn as f, promptOf as g, isCustomId as h, Button as i, answerOf as l, getDeck as m, BackLink as n, POS_LABEL as o, expectedAnswers as p, Boot as r, Segmented as s, BUILTIN_DECKS as t, buttonClass as u };
