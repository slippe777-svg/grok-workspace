import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export const fieldClass =
  "h-11 w-full rounded-sm border border-border bg-background px-3 text-base text-foreground outline-none placeholder:text-subtle focus-visible:border-accent";

export function Field({
  label,
  id,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  const fieldId = id ?? props.name ?? label;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm text-muted">
        {label}
      </label>
      <input id={fieldId} className={fieldClass} {...props} />
    </div>
  );
}

export function SelectField({
  label,
  id,
  children,
  ...props
}: { label: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  const fieldId = id ?? props.name ?? label;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm text-muted">
        {label}
      </label>
      <select id={fieldId} className={fieldClass} {...props}>
        {children}
      </select>
    </div>
  );
}
