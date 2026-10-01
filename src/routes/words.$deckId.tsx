import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { BackLink, Boot, Missing, Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/cn";
import { dueLabel } from "@/lib/srs";
import { useVocab } from "@/lib/store";
import { norm } from "@/lib/text";
import { MIX_ID, POS_LABEL, cardsForDeck, getDeck, isCustomId } from "@/lib/vocab";
import type { Pos, VocabCard } from "@/lib/types";

export const Route = createFileRoute("/words/$deckId")({ component: WordsPage });

type Filter = "all" | "new" | "learn" | "known";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Усі" },
  { id: "new", label: "Нові" },
  { id: "learn", label: "Вчу" },
  { id: "known", label: "Знаю" },
];

function WordsPage() {
  const { deckId } = Route.useParams();
  const hydrated = useVocab((state) => state.hydrated);
  const customDecks = useVocab((state) => state.customDecks);
  const customCards = useVocab((state) => state.customCards);
  const progress = useVocab((state) => state.progress);
  const addCard = useVocab((state) => state.addCard);
  const removeCard = useVocab((state) => state.removeCard);
  const removeDeck = useVocab((state) => state.removeDeck);
  const resetDeck = useVocab((state) => state.resetDeck);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [en, setEn] = useState("");
  const [uk, setUk] = useState("");
  const [pos, setPos] = useState<Pos>("noun");
  const [example, setExample] = useState("");
  const [exampleUk, setExampleUk] = useState("");
  const [more, setMore] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState<null | "reset" | "delete" | string>(null);

  const deck = getDeck(deckId, customDecks);
  const cards = useMemo(() => cardsForDeck(deckId, customCards), [deckId, customCards]);

  if (!hydrated) return <Boot title="Слова" />;
  if (!deck) return <Missing />;

  const filtered = cards.filter((card) => {
    const item = progress[card.id];
    if (filter === "new" && item) return false;
    if (filter === "learn" && (!item || item.box >= 3)) return false;
    if (filter === "known" && (!item || item.box < 3)) return false;
    const hay = norm(`${card.en} ${card.uk}`);
    return hay.includes(norm(query));
  });
  const ordered = deckId === MIX_ID ? filtered.slice().sort((a, b) => a.en.localeCompare(b.en)) : filtered;

  function saveWord() {
    const word = en.trim().replace(/\s+/g, " ");
    const translation = uk.trim().replace(/\s+/g, " ");
    if (!word || !translation) {
      setError("Впишіть слово і переклад.");
      return;
    }
    if (cards.some((card) => norm(card.en) === norm(word))) {
      setError("Таке англійське слово в колоді вже є.");
      return;
    }
    const card: VocabCard = {
      id: `c-${crypto.randomUUID()}`,
      deckId,
      en: word,
      uk: translation,
      say: "",
      pos,
      example: example.trim(),
      exampleUk: exampleUk.trim(),
      alts: [],
      enAlts: [],
    };
    addCard(card);
    setEn("");
    setUk("");
    setExample("");
    setExampleUk("");
    setError("");
  }

  const pendingCard = typeof confirm === "string" && confirm.startsWith("c-") ? confirm : null;

  return (
    <Shell>
      <BackLink />
      <h1 className="mt-4 font-serif text-4xl text-foreground">{deckId === MIX_ID ? "Усі слова" : deck.title}</h1>
      <p className="mt-2 text-muted">
        {deck.blurb}. {cards.length} у списку.
      </p>

      {deckId !== MIX_ID ? (
        <form
          className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-surface p-5"
          onSubmit={(event) => {
            event.preventDefault();
            saveWord();
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Англійською" name="en" value={en} maxLength={48} onChange={(event) => setEn(event.target.value)} />
            <Field
              label="Українською"
              name="uk"
              value={uk}
              maxLength={80}
              onChange={(event) => setUk(event.target.value)}
            />
          </div>
          <SelectField label="Частина мови" name="pos" value={pos} onChange={(event) => setPos(event.target.value as Pos)}>
            {(Object.keys(POS_LABEL) as Pos[]).map((key) => (
              <option key={key} value={key}>
                {POS_LABEL[key]}
              </option>
            ))}
          </SelectField>
          {more ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Приклад англійською"
                name="example"
                value={example}
                maxLength={140}
                onChange={(event) => setExample(event.target.value)}
              />
              <Field
                label="Приклад українською"
                name="example-uk"
                value={exampleUk}
                maxLength={140}
                onChange={(event) => setExampleUk(event.target.value)}
              />
            </div>
          ) : (
            <button type="button" className="self-start text-sm text-muted hover:text-foreground" onClick={() => setMore(true)}>
              Додати приклад
            </button>
          )}
          {error ? (
            <p role="alert" className="text-sm text-miss">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="sm:self-start">
            Додати слово
          </Button>
        </form>
      ) : (
        <p className="mt-4 text-sm text-muted">Своє слово додається в конкретну колоду, не в загальний список.</p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Field
          label="Пошук"
          name="search"
          value={query}
          placeholder="Слово або переклад"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              "btn h-11 rounded-sm px-3 text-sm",
              filter === item.id ? "bg-accent text-accent-fg" : "border border-border bg-surface text-muted",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {ordered.length === 0 ? (
        <p className="mt-8 text-muted">Нічого не знайдено.</p>
      ) : (
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {ordered.map((card) => {
            const item = progress[card.id];
            const box = item?.box ?? 0;
            const owner = deckId === MIX_ID ? getDeck(card.deckId, customDecks) : null;
            return (
              <li key={card.id} className="flex items-start gap-3 py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-xl break-words text-foreground">{card.en}</p>
                  <p className="text-muted break-words">{card.uk}</p>
                  <p className="mt-1 text-sm text-subtle">
                    {POS_LABEL[card.pos]}
                    {owner ? ` · ${owner.title}` : ""} · {dueLabel(item)}
                  </p>
                  <span className="mt-2 flex gap-1" aria-label={`крок ${box} з 4`}>
                    {[1, 2, 3, 4].map((step) => (
                      <span
                        key={step}
                        className={cn("h-1.5 w-3 rounded-full", step <= box ? "bg-know" : "bg-surface-2")}
                      />
                    ))}
                  </span>
                </div>
                {isCustomId(card.id) ? (
                  <Button
                    variant="ghost"
                    className="w-11 px-0"
                    aria-label={`Видалити ${card.en}`}
                    onClick={() => setConfirm(card.id)}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </Button>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      {deckId !== MIX_ID ? (
        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <Button variant="quiet" onClick={() => setConfirm("reset")}>
            Скинути прогрес
          </Button>
          {deck.builtin ? null : (
            <Button variant="quiet" className="text-miss" onClick={() => setConfirm("delete")}>
              Видалити колоду
            </Button>
          )}
        </div>
      ) : null}

      <Modal
        open={confirm === "reset"}
        title="Скинути прогрес?"
        onClose={() => setConfirm(null)}
      >
        <p className="text-muted">Інтервали цієї колоди зітруться. Самі слова залишаться.</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={() => setConfirm(null)}>
            Скасувати
          </Button>
          <Button
            onClick={() => {
              resetDeck(
                deckId,
                cards.map((card) => card.id),
              );
              setConfirm(null);
            }}
          >
            Скинути
          </Button>
        </div>
      </Modal>
      <Modal open={confirm === "delete"} title="Видалити колоду?" onClose={() => setConfirm(null)}>
        <p className="text-muted">Колода і її слова зникнуть з цього пристрою.</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={() => setConfirm(null)}>
            Скасувати
          </Button>
          <Button
            onClick={() => {
              removeDeck(deckId);
              setConfirm(null);
              void navigate({ to: "/" });
            }}
          >
            Видалити
          </Button>
        </div>
      </Modal>
      <Modal open={Boolean(pendingCard)} title="Видалити слово?" onClose={() => setConfirm(null)}>
        <p className="text-muted">Його прогрес теж зітреться.</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={() => setConfirm(null)}>
            Скасувати
          </Button>
          <Button
            onClick={() => {
              if (pendingCard) removeCard(pendingCard);
              setConfirm(null);
            }}
          >
            Видалити
          </Button>
        </div>
      </Modal>
    </Shell>
  );
}
