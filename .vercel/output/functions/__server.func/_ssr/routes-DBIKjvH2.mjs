import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useVocab, g as plural, l as isCaughtUp, o as deckStats, u as nextDuePhrase } from "./router-CJGEOnnp.mjs";
import { c as Shell, d as cardsForDeck, i as Button, m as getDeck, r as Boot, t as BUILTIN_DECKS, u as buttonClass } from "./shell-ZIvxgdSC.mjs";
import { t as Field } from "./field-CVwGHSwt.mjs";
import { t as Modal } from "./modal-xjSp8Hn5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DBIKjvH2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeckCard({ deck }) {
	const progress = useVocab((state) => state.progress);
	const customCards = useVocab((state) => state.customCards);
	const cards = cardsForDeck(deck.id, customCards);
	const stats = deckStats(cards, progress);
	const caught = isCaughtUp(cards, progress);
	const next = caught ? nextDuePhrase(cards, progress) : null;
	const empty = cards.length === 0;
	const knownW = stats.total ? stats.known / stats.total * 100 : 0;
	const learnW = stats.total ? stats.learning / stats.total * 100 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col rounded-xl border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex h-6 items-center rounded-full bg-surface-2 px-2 text-xs text-muted",
					children: deck.level
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs tabular-nums text-muted",
					children: [
						stats.known,
						"/",
						stats.total || 0
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-serif text-2xl text-foreground",
				children: deck.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: deck.blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex h-1.5 overflow-hidden rounded-full bg-surface-2",
				role: "progressbar",
				"aria-valuenow": stats.known,
				"aria-valuemin": 0,
				"aria-valuemax": stats.total || 0,
				"aria-label": `Вивчено в колоді ${deck.title}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bar-fill bg-know",
					style: { width: `${knownW}%` }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bar-fill bg-learning",
					style: { width: `${learnW}%` }
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: empty ? "Поки немає слів" : caught && next ? next : `${stats.due} ${plural(stats.due, "картка", "картки", "карток")} зараз`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: empty ? "/words/$deckId" : "/study/$deckId",
						params: { deckId: deck.id },
						className: buttonClass("primary", "col-span-2"),
						children: empty ? "Додати слова" : caught ? "Повторити" : "Тренувати"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/quiz/$deckId",
						params: { deckId: deck.id },
						className: buttonClass("ghost"),
						children: "Тест"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/words/$deckId",
						params: { deckId: deck.id },
						className: buttonClass("ghost"),
						children: "Слова"
					})
				]
			})
		]
	});
}
function Home() {
	const hydrated = useVocab((state) => state.hydrated);
	const streak = useVocab((state) => state.streak);
	const todayCount = useVocab((state) => state.todayCount);
	const customDecks = useVocab((state) => state.customDecks);
	const customCards = useVocab((state) => state.customCards);
	const progress = useVocab((state) => state.progress);
	const addDeck = useVocab((state) => state.addDeck);
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [blurb, setBlurb] = (0, import_react.useState)("");
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boot, {});
	const all = cardsForDeck("mix", customCards);
	const stats = deckStats(all, progress);
	const mine = customDecks.map((deck) => getDeck(deck.id, customDecks)).filter((deck) => deck !== null);
	function createDeck() {
		const title = name.trim().replace(/\s+/g, " ");
		if (title.length < 2) return;
		const id = `d-${crypto.randomUUID()}`;
		addDeck({
			id,
			title,
			blurb: blurb.trim().replace(/\s+/g, " ") || "Власні слова"
		});
		setName("");
		setBlurb("");
		setOpen(false);
		navigate({
			to: "/words/$deckId",
			params: { deckId: id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		width: "wide",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Тренажер слів"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-serif text-5xl text-foreground",
					children: "Слово"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2 sm:min-w-64",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: plural(streak, "день поспіль", "дні поспіль", "днів поспіль"),
						value: streak
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "сьогодні",
						value: todayCount
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted",
				children: "Картки з інтервальним повторенням: слово, переклад і приклад. Те, що пам’ятаєте, повертається рідше."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-card bg-paper p-6 text-ink sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink-muted",
						children: "Сесія"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-serif text-3xl",
						children: "Змішані картки"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-ink-muted",
						children: "До дванадцяти слів, які час повторити, з усієї бібліотеки."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-ink-muted",
						children: [
							stats.total,
							" ",
							plural(stats.total, "слово", "слова", "слів"),
							stats.due > 0 ? ` · ${stats.due} ${plural(stats.due, "слово чекає", "слова чекають", "слів чекають")}` : " · усе за розкладом"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-2 sm:flex-row sm:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/study/$deckId",
								params: { deckId: "mix" },
								className: buttonClass("ink", "sm:min-w-40"),
								children: stats.due > 0 ? "Тренувати" : "Повторити"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/quiz/$deckId",
								params: { deckId: "mix" },
								className: buttonClass("paper", "sm:min-w-40"),
								children: "Тест"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/words/$deckId",
								params: { deckId: "mix" },
								className: "inline-flex h-11 items-center px-1 text-sm text-ink-muted hover:text-ink",
								children: "Усі слова"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl text-foreground",
					children: "Колоди"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => setOpen(true),
					children: "Нова колода"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				children: BUILTIN_DECKS.map((deck) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckCard, { deck }, deck.id))
			}),
			mine.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-serif text-2xl text-foreground",
				children: "Мої колоди"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				children: mine.map((deck) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckCard, { deck }, deck.id))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-subtle",
				children: "Прогрес лишається на цьому пристрої."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open,
				title: "Нова колода",
				onClose: () => setOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-4",
					onSubmit: (event) => {
						event.preventDefault();
						createDeck();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Назва",
							name: "deck-name",
							value: name,
							maxLength: 40,
							autoFocus: true,
							onChange: (event) => setName(event.target.value),
							placeholder: "Наприклад, кухня"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Коротко",
							name: "deck-blurb",
							value: blurb,
							maxLength: 80,
							onChange: (event) => setBlurb(event.target.value),
							placeholder: "Необов’язково"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 sm:flex-row sm:justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => setOpen(false),
								children: "Скасувати"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: name.trim().length < 2,
								children: "Створити"
							})]
						})
					]
				})
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-surface px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-serif text-2xl leading-tight tabular-nums text-foreground",
			children: value
		})]
	});
}
//#endregion
export { Home as component };
