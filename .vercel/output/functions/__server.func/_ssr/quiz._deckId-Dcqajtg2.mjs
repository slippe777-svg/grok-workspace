import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useVocab, d as quizQueue, i as Route$2, m as matchesAnswer } from "./router-CJGEOnnp.mjs";
import { a as Missing, c as Shell, d as cardsForDeck, f as cn, g as promptOf, i as Button, l as answerOf, m as getDeck, n as BackLink, p as expectedAnswers, r as Boot, s as Segmented } from "./shell-ZIvxgdSC.mjs";
import { r as fieldClass } from "./field-CVwGHSwt.mjs";
import { n as speakEnglish, t as DonePanel } from "./speech-CTchcZ6g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz._deckId-Dcqajtg2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuizPage() {
	const { deckId } = Route$2.useParams();
	const hydrated = useVocab((state) => state.hydrated);
	const customDecks = useVocab((state) => state.customDecks);
	const direction = useVocab((state) => state.quizDirection);
	const setDirection = useVocab((state) => state.setQuizDirection);
	const grade = useVocab((state) => state.grade);
	const [run, setRun] = (0, import_react.useState)(0);
	const [phase, setPhase] = (0, import_react.useState)("boot");
	const [queue, setQueue] = (0, import_react.useState)([]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [value, setValue] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [asked, setAsked] = (0, import_react.useState)("en-uk");
	const [correct, setCorrect] = (0, import_react.useState)(0);
	const [shake, setShake] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const state = useVocab.getState();
		const cards = cardsForDeck(deckId, state.customCards);
		if (cards.length === 0) {
			setQueue([]);
			setPhase("empty");
			return;
		}
		setQueue(quizQueue(cards, state.progress, 10));
		setIndex(0);
		setValue("");
		setStatus("idle");
		setCorrect(0);
		setPhase("run");
	}, [
		hydrated,
		deckId,
		run
	]);
	const card = queue[index];
	(0, import_react.useEffect)(() => {
		if (phase === "run") inputRef.current?.focus();
	}, [
		phase,
		index,
		status
	]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boot, { title: "Тест" });
	const deck = getDeck(deckId, customDecks);
	if (!deck) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {});
	const shownDirection = status === "idle" ? direction : asked;
	const prompt = card ? promptOf(card, shownDirection) : "";
	const progress = queue.length === 0 ? 0 : (index + (status === "idle" ? 0 : 1)) / queue.length * 100;
	function check() {
		if (!card || status !== "idle") return;
		const ok = matchesAnswer(expectedAnswers(card, direction), value);
		setAsked(direction);
		setStatus(ok ? "ok" : "no");
		if (!ok) setShake(true);
		grade(card.id, ok);
		if (ok) setCorrect((count) => count + 1);
		if (direction === "uk-en") speakEnglish(card.en);
	}
	function next() {
		if (index + 1 >= queue.length) {
			setPhase("done");
			return;
		}
		setIndex((current) => current + 1);
		setValue("");
		setStatus("idle");
		setShake(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		width: "study",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl text-foreground",
					children: deck.title
				}), phase === "run" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					label: "Напрям тесту",
					value: direction,
					onChange: setDirection,
					options: [{
						value: "en-uk",
						label: "EN → UA"
					}, {
						value: "uk-en",
						label: "UA → EN"
					}]
				}) : null]
			}),
			phase === "empty" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-muted",
				children: "Спочатку додайте слова в колоду."
			}) : null,
			phase === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonePanel, {
				know: correct,
				total: queue.length,
				onAgain: () => setRun((value) => value + 1)
			}) : null,
			phase === "run" && card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 h-1 overflow-hidden rounded-full bg-surface-2",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bar-fill h-full bg-accent",
						style: { width: `${progress}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm tabular-nums text-muted",
					children: [
						index + 1,
						" / ",
						queue.length
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-card bg-paper p-6 text-ink",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-4xl leading-tight break-words",
							children: prompt
						}),
						shownDirection === "en-uk" && card.say ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-ink-muted",
							children: [
								"[",
								card.say,
								"]"
							]
						}) : null,
						status !== "idle" && card.example ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 border-t border-line pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"“",
								card.example,
								"”"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-ink-muted",
								children: card.exampleUk
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 flex flex-col gap-3",
					onSubmit: (event) => {
						event.preventDefault();
						if (status === "idle") check();
						else next();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm text-muted",
							htmlFor: "answer",
							children: shownDirection === "en-uk" ? "Переклад українською" : "Слово англійською"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "answer",
							ref: inputRef,
							value,
							disabled: status !== "idle",
							autoComplete: "off",
							autoCapitalize: "off",
							spellCheck: false,
							onChange: (event) => setValue(event.target.value),
							onAnimationEnd: () => setShake(false),
							className: cn(fieldClass, shake && "shake", status === "ok" && "border-know-text", status === "no" && "border-miss")
						}),
						status === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-know-text",
							children: ["Так. ", answerOf(card, asked)]
						}) : null,
						status === "no" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: ["Правильна відповідь: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: answerOf(card, asked)
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [shownDirection === "en-uk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => speakEnglish(card.en),
								"aria-label": "Озвучити",
								children: "Озвучити"
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "flex-1",
								disabled: status === "idle" && value.trim().length === 0,
								children: status === "idle" ? "Перевірити" : "Далі"
							})]
						})
					]
				})
			] }) : null
		]
	});
}
//#endregion
export { QuizPage as component };
