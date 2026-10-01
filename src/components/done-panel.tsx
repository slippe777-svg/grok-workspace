import { Link } from "@tanstack/react-router";
import { buttonClass } from "@/components/ui/button";
import { tone } from "@/lib/text";

export function DonePanel({
  know,
  total,
  onAgain,
}: {
  know: number;
  total: number;
  onAgain: () => void;
}) {
  const percent = total === 0 ? 0 : Math.round((know / total) * 100);
  return (
    <section className="mt-8 rounded-card bg-paper p-6 text-ink sm:p-8">
      <p className="text-sm text-ink-muted">Результат</p>
      <p className="mt-3 font-serif text-6xl leading-none tabular-nums">{percent}%</p>
      <p className="mt-3 text-ink-muted">
        {know} з {total}. {tone(percent)}
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <button type="button" className={buttonClass("ink", "sm:min-w-36")} onClick={onAgain}>
          Ще раз
        </button>
        <Link to="/" className={buttonClass("paper", "sm:min-w-36")}>
          До колод
        </Link>
      </div>
    </section>
  );
}
