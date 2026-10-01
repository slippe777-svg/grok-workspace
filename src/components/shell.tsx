import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/ui/button";

const widths = {
  wide: "max-w-5xl",
  base: "max-w-3xl",
  study: "max-w-xl",
} as const;

export function Shell({
  children,
  width = "base",
}: {
  children: ReactNode;
  width?: keyof typeof widths;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className={cn("safe-pad mx-auto w-full", widths[width])}>{children}</div>
    </div>
  );
}

export function BackLink() {
  return (
    <Link to="/" className="inline-flex h-11 items-center gap-2 text-sm text-muted hover:text-foreground">
      <ArrowLeft className="size-4" aria-hidden="true" />
      Колоди
    </Link>
  );
}

export function Missing() {
  return (
    <Shell width="study">
      <h1 className="font-serif text-3xl text-foreground">Колоду не знайдено</h1>
      <p className="mt-2 text-muted">Можливо, її вже видалено.</p>
      <Link to="/" className={buttonClass("primary", "mt-6")}>
        На головну
      </Link>
    </Shell>
  );
}

export function Boot({ title = "Слово" }: { title?: string }) {
  return (
    <Shell>
      <p className="text-sm text-muted">Тренажер слів</p>
      <h1 className="mt-1 font-serif text-5xl text-foreground">{title}</h1>
    </Shell>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex max-w-full flex-wrap rounded-md border border-border bg-surface p-1">
      {options.map((option) => {
        const on = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(option.value)}
            className={cn(
              "btn h-11 rounded-sm px-3 text-sm",
              on ? "bg-accent text-accent-fg" : "text-muted hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
