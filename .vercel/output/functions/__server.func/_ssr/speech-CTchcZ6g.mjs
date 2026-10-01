import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as tone } from "./router-CJGEOnnp.mjs";
import { u as buttonClass } from "./shell-ZIvxgdSC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/speech-CTchcZ6g.js
var import_jsx_runtime = require_jsx_runtime();
function DonePanel({ know, total, onAgain }) {
	const percent = total === 0 ? 0 : Math.round(know / total * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8 rounded-card bg-paper p-6 text-ink sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink-muted",
				children: "Результат"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-serif text-6xl leading-none tabular-nums",
				children: [percent, "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-ink-muted",
				children: [
					know,
					" з ",
					total,
					". ",
					tone(percent)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: buttonClass("ink", "sm:min-w-36"),
					onClick: onAgain,
					children: "Ще раз"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: buttonClass("paper", "sm:min-w-36"),
					children: "До колод"
				})]
			})
		]
	});
}
var voiceToken = 0;
function pickEnglishVoice(synth) {
	const voices = synth.getVoices();
	return voices.find((voice) => voice.lang === "en-US") ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("en-us")) ?? voices.find((voice) => voice.lang === "en-GB") ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("en-gb")) ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ?? null;
}
function speakEnglish(text) {
	if (typeof window === "undefined" || !("speechSynthesis" in window) || !text.trim()) return;
	const synth = window.speechSynthesis;
	const token = ++voiceToken;
	const speakNow = () => {
		if (token !== voiceToken) return;
		try {
			synth.cancel();
			const utter = new SpeechSynthesisUtterance(text);
			const voice = pickEnglishVoice(synth);
			utter.lang = voice?.lang ?? "en-US";
			if (voice) utter.voice = voice;
			utter.rate = .92;
			synth.speak(utter);
			if (synth.paused) synth.resume();
		} catch {}
	};
	if (synth.getVoices().length > 0) {
		speakNow();
		return;
	}
	let done = false;
	const once = () => {
		if (done) return;
		done = true;
		synth.removeEventListener("voiceschanged", once);
		speakNow();
	};
	synth.addEventListener("voiceschanged", once);
	window.setTimeout(once, 200);
}
function stopSpeaking() {
	if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
	voiceToken += 1;
	try {
		window.speechSynthesis.cancel();
	} catch {}
}
//#endregion
export { speakEnglish as n, stopSpeaking as r, DonePanel as t };
