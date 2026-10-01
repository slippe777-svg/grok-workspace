import { Link, createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DonePanel } from "@/components/done-panel";
import { FlashCard } from "@/components/flash-card";
import { BackLink, Boot, Missing, Segmented, Shell } from "@/components/shell";
import { Button, buttonClass } from "@/components/ui/button";
import { speakEnglish } from "@/lib/speech";
import { dropCurrent, isCaughtUp, requeue, sessionQueue } from "@/lib/srs";
import { useVocab } from "@/lib/store";
import { MIX_ID, cardsForDeck, getDeck } from "@/lib/vocab";
import type { StudyFront, VocabCard } from "@/lib/types";

export const Route = createFileRoute("/study/$deckId")({ component: StudyPage });

function StudyPage() {
  const { deckId } = Route.useParams();
  const hydrated = useVocab((state) => state.hydrated);
  const customDecks = useVocab((state) => state.customDecks);
  const studyFront = useVocab((state) => state.studyFront);
  const setStudyFront = useVocab((state) => state.setStudyFront);
  const grade = useVocab((state) => state.grade);

  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState<"boot" | "run" | "empty" | "done">("boot");
  const [queue, setQueue] = useState<VocabCard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [voluntary, setVoluntary] = useState(false);
  const [stats, setStats] = useState({ know: 0, again: 0 });

  const flippedRef = useRef(false);
  const apiRef = useRef({ flip: () => {}, again: () => {}, know: () => {} });
  flippedRef.current = flipped;

  useEffect(() => {
    if (!hydrated) return;
    const state = useVocab.getState();
    const cards = cardsForDeck(deckId, state.customCards);
    if (cards.length === 0) {
      setQueue([]);
      setPhase("empty");
      setVoluntary(false);
      return;
    }
    const next = sessionQueue(cards, state.progress, 12, deckId === MIX_ID);
    setQueue(next);
    setIndex(0);
    setFlipped(false);
    setStats({ know: 0, again: 0 });
    setVoluntary(isCaughtUp(cards, state.progress));
    setPhase("run");
  }, [hydrated, deckId, run]);

  const card = queue[index];

  function gradeAgain() {
    if (!card || !flippedRef.current || phase !== "run") return;
    grade(card.id, false);
    setStats((current) => ({ ...current, again: current.again + 1 }));
    const moved = requeue(queue, index);
    setQueue(moved.queue);
    setIndex(moved.index);
    setFlipped(false);
  }

  function gradeKnow() {
    if (!card || !flippedRef.current || phase !== "run") return;
    grade(card.id, true);
    setStats((current) => ({ ...current, know: current.know + 1 }));
    const dropped = dropCurrent(queue, index);
    setQueue(dropped.queue);
    setIndex(dropped.index);
    setFlipped(false);
    if (dropped.done) setPhase("done");
  }

  apiRef.current = {
    flip: () => setFlipped((value) => !value),
    again: gradeAgain,
    know: gradeKnow,
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if ((event.target as HTMLElement | null)?.closest("[data-speak]")) return;
      if (event.key === " ") {
        event.preventDefault();
        apiRef.current.flip();
      } else if (event.key === "ArrowLeft" || event.key === "1") {
        apiRef.current.again();
      } else if (event.key === "ArrowRight" || event.key === "2") {
        apiRef.current.know();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!hydrated) return <Boot title="Картки" />;
  const deck = getDeck(deckId, customDecks);
  if (!deck) return <Missing />;

  const attempts = stats.know + stats.again;

  return (
    <Shell width="study">
      <div className="flex items-center justify-between gap-3">
        <BackLink />
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-foreground">{deck.title}</h1>
          {phase === "run" ? (
            <p className="mt-1 text-sm tabular-nums text-muted">залишилось {queue.length}</p>
          ) : null}
        </div>
        {phase === "run" ? (
          <Segmented<StudyFront>
            label="Лицьова сторона картки"
            value={studyFront}
            onChange={setStudyFront}
            options={[
              { value: "en", label: "Англійська" },
              { value: "uk", label: "Українська" },
            ]}
          />
        ) : null}
      </div>

      {phase === "empty" ? (
        <div className="mt-8">
          <p className="text-muted">У цій колоді ще немає слів.</p>
          <Link to="/words/$deckId" params={{ deckId }} className={buttonClass("primary", "mt-6")}>
            Додати слово
          </Link>
        </div>
      ) : null}

      {phase === "done" ? (
        <DonePanel know={stats.know} total={attempts} onAgain={() => setRun((value) => value + 1)} />
      ) : null}

      {phase === "run" && card ? (
        <>
          {voluntary ? (
            <p className="mt-4 text-sm text-muted">Дострокове повторення. Відповіді зсунуть наступну дату.</p>
          ) : null}
          <div className="mt-4">
            <FlashCard
              key={`${card.id}:${stats.know}:${stats.again}`}
              card={card}
              front={studyFront}
              flipped={flipped}
              onFlip={() => setFlipped((value) => !value)}
              onSpeak={() => speakEnglish(card.en)}
            />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {flipped ? (
              <>
                <Button variant="ghost" onClick={gradeAgain}>
                  Не пам’ятаю
                </Button>
                <Button onClick={gradeKnow}>
                  <Check className="size-4" aria-hidden="true" />
                  Знаю
                </Button>
              </>
            ) : (
              <Button className="sm:col-span-2" onClick={() => setFlipped(true)}>
                Показати переклад
              </Button>
            )}
          </div>
          <p className="mt-3 text-center text-sm text-subtle">Пробіл — перевернути · ← не пам’ятаю · → знаю</p>
        </>
      ) : null}
    </Shell>
  );
}
