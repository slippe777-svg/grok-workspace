import { Link } from "@tanstack/react-router";
import { buttonClass } from "@/components/ui/button";
import { plural } from "@/lib/text";
import { deckStats, isCaughtUp, nextDuePhrase } from "@/lib/srs";
import { useVocab } from "@/lib/store";
import { cardsForDeck } from "@/lib/vocab";
import type { Deck } from "@/lib/types";

export function DeckCard({ deck }: { deck: Deck }) {
  const progress = useVocab((state) => state.progress);
  const customCards = useVocab((state) => state.customCards);
  const cards = cardsForDeck(deck.id, customCards);
  const stats = deckStats(cards, progress);
  const caught = isCaughtUp(cards, progress);
  const next = caught ? nextDuePhrase(cards, progress) : null;
  const empty = cards.length === 0;
  const knownW = stats.total ? (stats.known / stats.total) * 100 : 0;
  const learnW = stats.total ? (stats.learning / stats.total) * 100 : 0;

  return (
    <article className="flex flex-col rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex h-6 items-center rounded-full bg-surface-2 px-2 text-xs text-muted">
          {deck.level}
        </span>
        <span className="text-xs tabular-nums text-muted">
          {stats.known}/{stats.total || 0}
        </span>
      </div>
      <h3 className="mt-3 font-serif text-2xl text-foreground">{deck.title}</h3>
      <p className="mt-1 text-sm text-muted">{deck.blurb}</p>
      <div
        className="mt-4 flex h-1.5 overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-valuenow={stats.known}
        aria-valuemin={0}
        aria-valuemax={stats.total || 0}
        aria-label={`Вивчено в колоді ${deck.title}`}
      >
        <span className="bar-fill bg-know" style={{ width: `${knownW}%` }} />
        <span className="bar-fill bg-learning" style={{ width: `${learnW}%` }} />
      </div>
      <p className="mt-3 text-sm text-muted">
        {empty
          ? "Поки немає слів"
          : caught && next
            ? next
            : `${stats.due} ${plural(stats.due, "картка", "картки", "карток")} зараз`}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link
          to={empty ? "/words/$deckId" : "/study/$deckId"}
          params={{ deckId: deck.id }}
          className={buttonClass("primary", "col-span-2")}
        >
          {empty ? "Додати слова" : caught ? "Повторити" : "Тренувати"}
        </Link>
        <Link to="/quiz/$deckId" params={{ deckId: deck.id }} className={buttonClass("ghost")}>
          Тест
        </Link>
        <Link to="/words/$deckId" params={{ deckId: deck.id }} className={buttonClass("ghost")}>
          Слова
        </Link>
      </div>
    </article>
  );
}
