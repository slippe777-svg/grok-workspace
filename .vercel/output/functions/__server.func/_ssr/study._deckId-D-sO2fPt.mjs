import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Check, t as Volume2 } from "../_libs/lucide-react.mjs";
import { a as useVocab, f as requeue, l as isCaughtUp, p as sessionQueue, r as Route$1, s as dropCurrent } from "./router-CJGEOnnp.mjs";
import { a as Missing, c as Shell, d as cardsForDeck, f as cn, i as Button, m as getDeck, n as BackLink, o as POS_LABEL, r as Boot, s as Segmented, u as buttonClass } from "./shell-ZIvxgdSC.mjs";
import { n as speakEnglish, r as stopSpeaking, t as DonePanel } from "./speech-CTchcZ6g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/study._deckId-D-sO2fPt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FlashCard({ card, front, flipped, onFlip, onSpeak }) {
	const faceWord = front === "en" ? card.en : card.uk;
	const backWord = front === "en" ? card.uk : card.en;
	const frontIsEnglish = front === "en";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-scene",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("card-inner min-h-80 sm:min-h-96", flipped && "is-flipped"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardSide, {
				side: "front",
				hidden: flipped,
				label: `Показати переклад: ${faceWord}`,
				onFlip,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-ink-muted",
						children: POS_LABEL[card.pos]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordLine, {
						word: faceWord,
						speak: frontIsEnglish,
						say: frontIsEnglish ? card.say : "",
						onSpeak
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-auto pt-6 text-sm text-ink-muted",
						children: "Натисніть, щоб перевернути"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardSide, {
				side: "back",
				hidden: !flipped,
				label: `Сховати переклад: ${backWord}`,
				onFlip,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-ink-muted",
						children: "переклад"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordLine, {
						word: backWord,
						speak: !frontIsEnglish,
						say: !frontIsEnglish ? card.say : "",
						onSpeak
					}),
					card.example ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-6 block border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-ink",
							children: [
								"“",
								card.example,
								"”"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-ink-muted",
							children: card.exampleUk
						})]
					}) : null
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "sr-only",
			"aria-live": "polite",
			children: flipped ? backWord : faceWord
		})]
	});
}
function CardSide({ side, hidden, label, onFlip, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("card-face paper-shadow overflow-hidden rounded-card border border-line bg-paper text-ink", side === "back" && "back"),
		"aria-hidden": hidden,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 z-0",
			tabIndex: hidden ? -1 : 0,
			onClick: onFlip,
			"aria-label": label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none relative z-10 flex h-full flex-col overflow-auto p-6",
			children
		})]
	});
}
function WordLine({ word, speak, say, onSpeak }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1 font-serif text-4xl leading-tight break-words text-ink sm:text-5xl",
				children: word
			}), speak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"data-speak": "true",
				className: "btn pointer-events-auto mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink",
				"aria-label": `Озвучити ${word}`,
				onClick: (event) => {
					event.stopPropagation();
					onSpeak();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
					className: "size-5",
					"aria-hidden": "true"
				})
			}) : null]
		}), say ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mt-3 block text-sm text-ink-muted",
			children: [
				"[",
				say,
				"]"
			]
		}) : null]
	});
}
function StudyPage() {
	const { deckId } = Route$1.useParams();
	const hydrated = useVocab((state) => state.hydrated);
	const customDecks = useVocab((state) => state.customDecks);
	const studyFront = useVocab((state) => state.studyFront);
	const setStudyFront = useVocab((state) => state.setStudyFront);
	const grade = useVocab((state) => state.grade);
	const [run, setRun] = (0, import_react.useState)(0);
	const [phase, setPhase] = (0, import_react.useState)("boot");
	const [queue, setQueue] = (0, import_react.useState)([]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [flipped, setFlipped] = (0, import_react.useState)(false);
	const [voluntary, setVoluntary] = (0, import_react.useState)(false);
	const [stats, setStats] = (0, import_react.useState)({
		know: 0,
		again: 0
	});
	const flippedRef = (0, import_react.useRef)(false);
	const apiRef = (0, import_react.useRef)({
		flip: () => {},
		again: () => {},
		know: () => {}
	});
	flippedRef.current = flipped;
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const state = useVocab.getState();
		const cards = cardsForDeck(deckId, state.customCards);
		if (cards.length === 0) {
			setQueue([]);
			setPhase("empty");
			setVoluntary(false);
			return;
		}
		const next = sessionQueue(cards, state.progress, 12, deckId === "mix");
		setQueue(next);
		setIndex(0);
		setFlipped(false);
		setStats({
			know: 0,
			again: 0
		});
		setVoluntary(isCaughtUp(cards, state.progress));
		setPhase("run");
	}, [
		hydrated,
		deckId,
		run
	]);
	const card = queue[index];
	(0, import_react.useEffect)(() => {
		if (!card || phase !== "run") return;
		speakEnglish(card.en);
		return () => stopSpeaking();
	}, [
		card,
		phase,
		stats.know,
		stats.again
	]);
	function gradeAgain() {
		if (!card || !flippedRef.current || phase !== "run") return;
		grade(card.id, false);
		setStats((current) => ({
			...current,
			again: current.again + 1
		}));
		const moved = requeue(queue, index);
		setQueue(moved.queue);
		setIndex(moved.index);
		setFlipped(false);
	}
	function gradeKnow() {
		if (!card || !flippedRef.current || phase !== "run") return;
		grade(card.id, true);
		setStats((current) => ({
			...current,
			know: current.know + 1
		}));
		const dropped = dropCurrent(queue, index);
		setQueue(dropped.queue);
		setIndex(dropped.index);
		setFlipped(false);
		if (dropped.done) setPhase("done");
	}
	apiRef.current = {
		flip: () => setFlipped((value) => !value),
		again: gradeAgain,
		know: gradeKnow
	};
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const tag = event.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
			if (event.target?.closest("[data-speak]")) return;
			if (event.key === " ") {
				event.preventDefault();
				apiRef.current.flip();
			} else if (event.key === "ArrowLeft" || event.key === "1") apiRef.current.again();
			else if (event.key === "ArrowRight" || event.key === "2") apiRef.current.know();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boot, { title: "Картки" });
	const deck = getDeck(deckId, customDecks);
	if (!deck) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {});
	const attempts = stats.know + stats.again;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		width: "study",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl text-foreground",
					children: deck.title
				}), phase === "run" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm tabular-nums text-muted",
					children: ["залишилось ", queue.length]
				}) : null] }), phase === "run" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					label: "Лицьова сторона картки",
					value: studyFront,
					onChange: setStudyFront,
					options: [{
						value: "en",
						label: "Англійська"
					}, {
						value: "uk",
						label: "Українська"
					}]
				}) : null]
			}),
			phase === "empty" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: "У цій колоді ще немає слів."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/words/$deckId",
					params: { deckId },
					className: buttonClass("primary", "mt-6"),
					children: "Додати слово"
				})]
			}) : null,
			phase === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonePanel, {
				know: stats.know,
				total: attempts,
				onAgain: () => setRun((value) => value + 1)
			}) : null,
			phase === "run" && card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				voluntary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Дострокове повторення. Відповіді зсунуть наступну дату."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlashCard, {
						card,
						front: studyFront,
						flipped,
						onFlip: () => setFlipped((value) => !value),
						onSpeak: () => speakEnglish(card.en)
					}, `${card.id}:${stats.know}:${stats.again}`)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2",
					children: flipped ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: gradeAgain,
						children: "Не пам’ятаю"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: gradeKnow,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-4",
							"aria-hidden": "true"
						}), "Знаю"]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "sm:col-span-2",
						onClick: () => setFlipped(true),
						children: "Показати переклад"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-sm text-subtle",
					children: "Пробіл — перевернути · ← не пам’ятаю · → знаю"
				})
			] }) : null
		]
	});
}
//#endregion
export { StudyPage as component };
