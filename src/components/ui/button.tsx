import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "quiet" | "ink" | "paper";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:bg-paper",
  ghost: "border border-border bg-surface text-foreground hover:bg-surface-2",
  quiet: "bg-transparent text-muted hover:text-foreground",
  ink: "bg-ink text-paper hover:bg-ink/90",
  paper: "border border-line bg-transparent text-ink hover:bg-line",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(
    "btn inline-flex h-11 items-center justify-center gap-2 rounded-sm px-4 text-sm font-medium disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    className,
  );
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />;
}
