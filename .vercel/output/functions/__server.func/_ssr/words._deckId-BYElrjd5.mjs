import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Trash2 } from "../_libs/lucide-react.mjs";
import { a as useVocab, c as dueLabel, h as norm, n as Route } from "./router-CJGEOnnp.mjs";
import { a as Missing, c as Shell, d as cardsForDeck, f as cn, h as isCustomId, i as Button, m as getDeck, n as BackLink, o as POS_LABEL, r as Boot } from "./shell-ZIvxgdSC.mjs";
import { n as SelectField, t as Field } from "./field-CVwGHSwt.mjs";
import { t as Modal } from "./modal-xjSp8Hn5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/words._deckId-BYElrjd5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "Усі"
	},
	{
		id: "new",
		label: "Нові"
	},
	{
		id: "learn",
		label: "Вчу"
	},
	{
		id: "known",
		label: "Знаю"
	}
];
function WordsPage() {
	const { deckId } = Route.useParams();
	const hydrated = useVocab((state) => state.hydrated);
	const customDecks = useVocab((state) => state.customDecks);
	const customCards = useVocab((state) => state.customCards);
	const progress = useVocab((state) => state.progress);
	const addCard = useVocab((state) => state.addCard);
	const removeCard = useVocab((state) => state.removeCard);
	const removeDeck = useVocab((state) => state.removeDeck);
	const resetDeck = useVocab((state) => state.resetDeck);
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [en, setEn] = (0, import_react.useState)("");
	const [uk, setUk] = (0, import_react.useState)("");
	const [pos, setPos] = (0, import_react.useState)("noun");
	const [example, setExample] = (0, import_react.useState)("");
	const [exampleUk, setExampleUk] = (0, import_react.useState)("");
	const [more, setMore] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const deck = getDeck(deckId, customDecks);
	const cards = (0, import_react.useMemo)(() => cardsForDeck(deckId, customCards), [deckId, customCards]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boot, { title: "Слова" });
	if (!deck) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {});
	const filtered = cards.filter((card) => {
		const item = progress[card.id];
		if (filter === "new" && item) return false;
		if (filter === "learn" && (!item || item.box >= 3)) return false;
		if (filter === "known" && (!item || item.box < 3)) return false;
		return norm(`${card.en} ${card.uk}`).includes(norm(query));
	});
	const ordered = deckId === "mix" ? filtered.slice().sort((a, b) => a.en.localeCompare(b.en)) : filtered;
	function saveWord() {
		const word = en.trim().replace(/\s+/g, " ");
		const translation = uk.trim().replace(/\s+/g, " ");
		if (!word || !translation) {
			setError("Впишіть слово і переклад.");
			return;
		}
		if (cards.some((card) => norm(card.en) === norm(word))) {
			setError("Таке англійське слово в колоді вже є.");
			return;
		}
		const card = {
			id: `c-${crypto.randomUUID()}`,
			deckId,
			en: word,
			uk: translation,
			say: "",
			pos,
			example: example.trim(),
			exampleUk: exampleUk.trim(),
			alts: [],
			enAlts: []
		};
		addCard(card);
		setEn("");
		setUk("");
		setExample("");
		setExampleUk("");
		setError("");
	}
	const pendingCard = typeof confirm === "string" && confirm.startsWith("c-") ? confirm : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-4 font-serif text-4xl text-foreground",
			children: deckId === "mix" ? "Усі слова" : deck.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-muted",
			children: [
				deck.blurb,
				". ",
				cards.length,
				" у списку."
			]
		}),
		deckId !== "mix" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-6 flex flex-col gap-4 rounded-xl border border-border bg-surface p-5",
			onSubmit: (event) => {
				event.preventDefault();
				saveWord();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Англійською",
						name: "en",
						value: en,
						maxLength: 48,
						onChange: (event) => setEn(event.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Українською",
						name: "uk",
						value: uk,
						maxLength: 80,
						onChange: (event) => setUk(event.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					label: "Частина мови",
					name: "pos",
					value: pos,
					onChange: (event) => setPos(event.target.value),
					children: Object.keys(POS_LABEL).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: key,
						children: POS_LABEL[key]
					}, key))
				}),
				more ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Приклад англійською",
						name: "example",
						value: example,
						maxLength: 140,
						onChange: (event) => setExample(event.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Приклад українською",
						name: "example-uk",
						value: exampleUk,
						maxLength: 140,
						onChange: (event) => setExampleUk(event.target.value)
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "self-start text-sm text-muted hover:text-foreground",
					onClick: () => setMore(true),
					children: "Додати приклад"
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "text-sm text-miss",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "sm:self-start",
					children: "Додати слово"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: "Своє слово додається в конкретну колоду, не в загальний список."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Пошук",
				name: "search",
				value: query,
				placeholder: "Слово або переклад",
				onChange: (event) => setQuery(event.target.value)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": filter === item.id,
				onClick: () => setFilter(item.id),
				className: cn("btn h-11 rounded-sm px-3 text-sm", filter === item.id ? "bg-accent text-accent-fg" : "border border-border bg-surface text-muted"),
				children: item.label
			}, item.id))
		}),
		ordered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-muted",
			children: "Нічого не знайдено."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-border border-y border-border",
			children: ordered.map((card) => {
				const item = progress[card.id];
				const box = item?.box ?? 0;
				const owner = deckId === "mix" ? getDeck(card.deckId, customDecks) : null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-3 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-xl break-words text-foreground",
								children: card.en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted break-words",
								children: card.uk
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-subtle",
								children: [
									POS_LABEL[card.pos],
									owner ? ` · ${owner.title}` : "",
									" · ",
									dueLabel(item)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 flex gap-1",
								"aria-label": `крок ${box} з 4`,
								children: [
									1,
									2,
									3,
									4
								].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 w-3 rounded-full", step <= box ? "bg-know" : "bg-surface-2") }, step))
							})
						]
					}), isCustomId(card.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "w-11 px-0",
						"aria-label": `Видалити ${card.en}`,
						onClick: () => setConfirm(card.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							className: "size-4",
							"aria-hidden": "true"
						})
					}) : null]
				}, card.id);
			})
		}),
		deckId !== "mix" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "quiet",
				onClick: () => setConfirm("reset"),
				children: "Скинути прогрес"
			}), deck.builtin ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "quiet",
				className: "text-miss",
				onClick: () => setConfirm("delete"),
				children: "Видалити колоду"
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			open: confirm === "reset",
			title: "Скинути прогрес?",
			onClose: () => setConfirm(null),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Інтервали цієї колоди зітруться. Самі слова залишаться."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => setConfirm(null),
					children: "Скасувати"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						resetDeck(deckId, cards.map((card) => card.id));
						setConfirm(null);
					},
					children: "Скинути"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			open: confirm === "delete",
			title: "Видалити колоду?",
			onClose: () => setConfirm(null),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Колода і її слова зникнуть з цього пристрою."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => setConfirm(null),
					children: "Скасувати"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						removeDeck(deckId);
						setConfirm(null);
						navigate({ to: "/" });
					},
					children: "Видалити"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			open: Boolean(pendingCard),
			title: "Видалити слово?",
			onClose: () => setConfirm(null),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Його прогрес теж зітреться."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => setConfirm(null),
					children: "Скасувати"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						if (pendingCard) removeCard(pendingCard);
						setConfirm(null);
					},
					children: "Видалити"
				})]
			})]
		})
	] });
}
//#endregion
export { WordsPage as component };
