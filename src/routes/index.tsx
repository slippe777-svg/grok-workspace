import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { DeckCard } from "@/components/deck-card";
import { Boot, Shell } from "@/components/shell";
import { Button, buttonClass } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Modal } from "@/components/ui/modal";
import { plural } from "@/lib/text";
import { deckStats } from "@/lib/srs";
import { useVocab } from "@/lib/store";
import { BUILTIN_DECKS, MIX_ID, cardsForDeck, getDeck } from "@/lib/vocab";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const hydrated = useVocab((state) => state.hydrated);
  const streak = useVocab((state) => state.streak);
  const todayCount = useVocab((state) => state.todayCount);
  const customDecks = useVocab((state) => state.customDecks);
  const customCards = useVocab((state) => state.customCards);
  const progress = useVocab((state) => state.progress);
  const addDeck = useVocab((state) => state.addDeck);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [blurb, setBlurb] = useState("");

  if (!hydrated) return <Boot />;

  const all = cardsForDeck(MIX_ID, customCards);
  const stats = deckStats(all, progress);
  const mine = customDecks
    .map((deck) => getDeck(deck.id, customDecks))
    .filter((deck): deck is NonNullable<typeof deck> => deck !== null);

  function createDeck() {
    const title = name.trim().replace(/\s+/g, " ");
    if (title.length < 2) return;
    const id = `d-${crypto.randomUUID()}`;
    addDeck({
      id,
      title,
      blurb: blurb.trim().replace(/\s+/g, " ") || "Власні слова",
    });
    setName("");
    setBlurb("");
    setOpen(false);
    void navigate({ to: "/words/$deckId", params: { deckId: id } });
  }

  return (
    <Shell width="wide">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted">Тренажер слів</p>
          <h1 className="mt-1 font-serif text-5xl text-foreground">Слово</h1>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:min-w-64">
          <Stat
            label={plural(streak, "день поспіль", "дні поспіль", "днів поспіль")}
            value={streak}
          />
          <Stat label="сьогодні" value={todayCount} />
        </div>
      </header>
      <p className="mt-4 max-w-2xl text-muted">
        Картки з інтервальним повторенням: слово, переклад і приклад. Те, що пам’ятаєте, повертається рідше.
      </p>

      <section className="mt-8 rounded-card bg-paper p-6 text-ink sm:p-8">
        <p className="text-sm text-ink-muted">Сесія</p>
        <h2 className="mt-2 font-serif text-3xl">Змішані картки</h2>
        <p className="mt-2 max-w-xl text-ink-muted">
          До дванадцяти слів, які час повторити, з усієї бібліотеки.
        </p>
        <p className="mt-3 text-sm text-ink-muted">
          {stats.total} {plural(stats.total, "слово", "слова", "слів")}
          {stats.due > 0
            ? ` · ${stats.due} ${plural(stats.due, "слово чекає", "слова чекають", "слів чекають")}`
            : " · усе за розкладом"}
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link to="/study/$deckId" params={{ deckId: MIX_ID }} className={buttonClass("ink", "sm:min-w-40")}>
            {stats.due > 0 ? "Тренувати" : "Повторити"}
          </Link>
          <Link to="/quiz/$deckId" params={{ deckId: MIX_ID }} className={buttonClass("paper", "sm:min-w-40")}>
            Тест
          </Link>
          <Link
            to="/words/$deckId"
            params={{ deckId: MIX_ID }}
            className="inline-flex h-11 items-center px-1 text-sm text-ink-muted hover:text-ink"
          >
            Усі слова
          </Link>
        </div>
      </section>

      <div className="mt-10 flex items-end justify-between gap-3">
        <h2 className="font-serif text-2xl text-foreground">Колоди</h2>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          Нова колода
        </Button>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {BUILTIN_DECKS.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>

      {mine.length > 0 ? (
        <>
          <h2 className="mt-10 font-serif text-2xl text-foreground">Мої колоди</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {mine.map((deck) => (
              <DeckCard key={deck.id} deck={deck} />
            ))}
          </div>
        </>
      ) : null}

      <p className="mt-10 text-sm text-subtle">Прогрес лишається на цьому пристрої.</p>

      <Modal open={open} title="Нова колода" onClose={() => setOpen(false)}>
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            createDeck();
          }}
        >
          <Field
            label="Назва"
            name="deck-name"
            value={name}
            maxLength={40}
            autoFocus
            onChange={(event) => setName(event.target.value)}
            placeholder="Наприклад, кухня"
          />
          <Field
            label="Коротко"
            name="deck-blurb"
            value={blurb}
            maxLength={80}
            onChange={(event) => setBlurb(event.target.value)}
            placeholder="Необов’язково"
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Скасувати
            </Button>
            <Button type="submit" disabled={name.trim().length < 2}>
              Створити
            </Button>
          </div>
        </form>
      </Modal>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2">
      <div className="text-xs text-muted">{label}</div>
      <div className="font-serif text-2xl leading-tight tabular-nums text-foreground">{value}</div>
    </div>
  );
}
