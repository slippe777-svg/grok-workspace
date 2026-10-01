import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-CVwGHSwt.js
var import_jsx_runtime = require_jsx_runtime();
var fieldClass = "h-11 w-full rounded-sm border border-border bg-background px-3 text-base text-foreground outline-none placeholder:text-subtle focus-visible:border-accent";
function Field({ label, id, ...props }) {
	const fieldId = id ?? props.name ?? label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: fieldId,
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id: fieldId,
			className: fieldClass,
			...props
		})]
	});
}
function SelectField({ label, id, children, ...props }) {
	const fieldId = id ?? props.name ?? label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: fieldId,
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			id: fieldId,
			className: fieldClass,
			...props,
			children
		})]
	});
}
//#endregion
export { SelectField as n, fieldClass as r, Field as t };
