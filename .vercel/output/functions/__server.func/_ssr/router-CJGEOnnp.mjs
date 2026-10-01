import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CJGEOnnp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function plural(n, one, few, many) {
	const abs = Math.abs(n) % 100;
	const last = abs % 10;
	if (abs > 10 && abs < 20) return many;
	if (last > 1 && last < 5) return few;
	if (last === 1) return one;
	return many;
}
function norm(value) {
	return value.toLowerCase().replace(/[’ʼ`']/g, "").replace(/[.,!?;:()«»"“”]/g, " ").replace(/[-—–]/g, " ").replace(/\s+/g, " ").trim();
}
function matchesAnswer(expected, typed) {
	const value = norm(typed);
	if (!value) return false;
	return expected.some((item) => norm(item) === value);
}
function tone(percent) {
	if (percent >= 90) return "Майже без помилок.";
	if (percent >= 70) return "Більшість відповідей точні.";
	if (percent >= 40) return "Є що закріпити.";
	return "Варто повернутися до карток.";
}
var MIN10 = 6e5;
var DAY = 864e5;
function applyGrade(prev, knew, now = Date.now()) {
	const base = prev ?? {
		box: 0,
		due: 0,
		seen: 0,
		correct: 0,
		intervalDays: 0
	};
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
		correct: base.correct + (knew ? 1 : 0)
	};
}
function deckStats(cards, progress, now = Date.now()) {
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
	return {
		fresh,
		learning,
		known,
		due,
		total: cards.length
	};
}
function isCaughtUp(cards, progress, now = Date.now()) {
	if (cards.length === 0) return false;
	return cards.every((card) => {
		const item = progress[card.id];
		return item !== void 0 && item.due > now;
	});
}
function formatGap(ms) {
	const mins = Math.max(1, Math.round(ms / 6e4));
	if (mins < 60) return `через ${mins} ${plural(mins, "хвилину", "хвилини", "хвилин")}`;
	const hours = Math.max(1, Math.round(mins / 60));
	if (hours < 36) return `через ${hours} ${plural(hours, "годину", "години", "годин")}`;
	const days = Math.max(1, Math.round(hours / 24));
	return `через ${days} ${plural(days, "день", "дні", "днів")}`;
}
function nextDuePhrase(cards, progress, now = Date.now()) {
	let min = Infinity;
	for (const card of cards) {
		const item = progress[card.id];
		if (!item || item.due <= now) return null;
		if (item.due < min) min = item.due;
	}
	if (!Number.isFinite(min)) return null;
	return `наступне ${formatGap(min - now)}`;
}
function dueLabel(item, now = Date.now()) {
	if (!item) return "нове";
	if (item.due <= now) return "пора повторити";
	return formatGap(item.due - now);
}
function shuffled(list) {
	const copy = list.slice();
	for (let i = copy.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		const a = copy[i];
		const b = copy[j];
		if (a === void 0 || b === void 0) continue;
		copy[i] = b;
		copy[j] = a;
	}
	return copy;
}
function sessionQueue(cards, progress, limit = 12, mix = false) {
	const now = Date.now();
	const due = cards.filter((card) => {
		const item = progress[card.id];
		return !item || item.due <= now;
	});
	const orderedDue = mix ? shuffled(due) : due.slice().sort((a, b) => {
		const box = (progress[a.id]?.box ?? 0) - (progress[b.id]?.box ?? 0);
		if (box !== 0) return box;
		return (progress[a.id]?.due ?? 0) - (progress[b.id]?.due ?? 0);
	});
	if (orderedDue.length >= limit) return orderedDue.slice(0, limit);
	if (orderedDue.length > 0) return orderedDue;
	if (mix) return shuffled(cards).slice(0, Math.min(limit, cards.length));
	return cards.slice().sort((a, b) => (progress[a.id]?.due ?? 0) - (progress[b.id]?.due ?? 0)).slice(0, Math.min(limit, cards.length));
}
function quizQueue(cards, progress, limit = 10) {
	const now = Date.now();
	const due = shuffled(cards.filter((card) => {
		const item = progress[card.id];
		return !item || item.due <= now;
	}));
	const later = shuffled(cards.filter((card) => {
		const item = progress[card.id];
		return item !== void 0 && item.due > now;
	}));
	return [...due, ...later].slice(0, Math.min(limit, cards.length));
}
function requeue(queue, index) {
	const next = queue.slice();
	const [current] = next.splice(index, 1);
	if (!current) return {
		queue,
		index
	};
	next.push(current);
	let nextIndex = index;
	if (next.length === 1 || nextIndex >= next.length - 1) nextIndex = 0;
	return {
		queue: next,
		index: nextIndex
	};
}
function dropCurrent(queue, index) {
	const next = queue.filter((_, i) => i !== index);
	if (next.length === 0) return {
		queue: next,
		index: 0,
		done: true
	};
	return {
		queue: next,
		index: index >= next.length ? 0 : index,
		done: false
	};
}
var memory = /* @__PURE__ */ new Map();
var safeStorage = {
	getItem: (name) => {
		if (typeof window === "undefined") return memory.get(name) ?? null;
		return localStorage.getItem(name);
	},
	setItem: (name, value) => {
		if (typeof window === "undefined") {
			memory.set(name, value);
			return;
		}
		localStorage.setItem(name, value);
	},
	removeItem: (name) => {
		if (typeof window === "undefined") {
			memory.delete(name);
			return;
		}
		localStorage.removeItem(name);
	}
};
function dayKey(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function yesterdayKey() {
	const date = /* @__PURE__ */ new Date();
	date.setDate(date.getDate() - 1);
	return dayKey(date);
}
function touchStudy(state) {
	const today = dayKey();
	let streak = state.streak;
	if (state.lastStudyDay !== today) streak = state.lastStudyDay === yesterdayKey() ? state.streak + 1 : 1;
	const todayCount = state.todayKey === today ? state.todayCount + 1 : 1;
	return {
		lastStudyDay: today,
		streak,
		todayKey: today,
		todayCount
	};
}
function without(progress, ids) {
	const next = { ...progress };
	for (const id of ids) delete next[id];
	return next;
}
var useVocab = create()(persist((set) => ({
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
	grade: (id, knew) => set((state) => {
		const prev = state.progress[id];
		return {
			...touchStudy(state),
			progress: {
				...state.progress,
				[id]: applyGrade(prev, knew)
			}
		};
	}),
	addDeck: (deck) => set((state) => ({ customDecks: [...state.customDecks, deck] })),
	addCard: (card) => set((state) => ({ customCards: [...state.customCards, card] })),
	removeCard: (id) => set((state) => ({
		customCards: state.customCards.filter((card) => card.id !== id),
		progress: without(state.progress, [id])
	})),
	removeDeck: (id) => set((state) => {
		const ids = state.customCards.filter((card) => card.deckId === id).map((card) => card.id);
		return {
			customDecks: state.customDecks.filter((deck) => deck.id !== id),
			customCards: state.customCards.filter((card) => card.deckId !== id),
			progress: without(state.progress, ids)
		};
	}),
	resetDeck: (_deckId, cardIds) => set((state) => ({ progress: without(state.progress, cardIds) })),
	setQuizDirection: (quizDirection) => set({ quizDirection }),
	setStudyFront: (studyFront) => set({ studyFront }),
	setAutoSpeak: (autoSpeak) => set({ autoSpeak })
}), {
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
		autoSpeak: state.autoSpeak
	})
}));
var styles_default = "/assets/styles-DcK7Rffh.css";
var APP_NAME = "Слово";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Тренажер англійських слів: картки, тест і інтервальне повторення."
			},
			{
				name: "theme-color",
				content: "#0c0c0e"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "uk",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreHydrator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function StoreHydrator() {
	(0, import_react.useEffect)(() => {
		let live = true;
		Promise.resolve(useVocab.persist.rehydrate()).finally(() => {
			if (live) useVocab.setState({ hydrated: true });
		});
		return () => {
			live = false;
		};
	}, []);
	return null;
}
var $$splitComponentImporter$3 = () => import("./routes-DBIKjvH2.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./quiz._deckId-Dcqajtg2.mjs");
var Route$2 = createFileRoute("/quiz/$deckId")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./study._deckId-D-sO2fPt.mjs");
var Route$1 = createFileRoute("/study/$deckId")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./words._deckId-BYElrjd5.mjs");
var Route = createFileRoute("/words/$deckId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	QuizDeckIdRoute: Route$2.update({
		id: "/quiz/$deckId",
		path: "/quiz/$deckId",
		getParentRoute: () => Route$4
	}),
	StudyDeckIdRoute: Route$1.update({
		id: "/study/$deckId",
		path: "/study/$deckId",
		getParentRoute: () => Route$4
	}),
	WordsDeckIdRoute: Route.update({
		id: "/words/$deckId",
		path: "/words/$deckId",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { tone as _, useVocab as a, dueLabel as c, quizQueue as d, requeue as f, plural as g, norm as h, Route$2 as i, isCaughtUp as l, matchesAnswer as m, Route as n, deckStats as o, sessionQueue as p, Route$1 as r, dropCurrent as s, router_exports as t, nextDuePhrase as u };
