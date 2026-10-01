import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { DonePanel } from "@/components/done-panel";
import { BackLink, Boot, Missing, Segmented, Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { fieldClass } from "@/components/ui/field";
import { cn } from "@/lib/cn";
import { speakEnglish } from "@/lib/speech";
import { quizQueue } from "@/lib/srs";
import { useVocab } from "@/lib/store";
import { matchesAnswer } from "@/lib/text";
import { answerOf, cardsForDeck, expectedAnswers, getDeck, promptOf } from "@/lib/vocab";
import type { Direction, VocabCard } from "@/lib/types";

export const Route = createFileRoute("/quiz/$deckId")({ component: QuizPage });

function QuizPage() {
  const { deckId } = Route.useParams();
  const hydrated = useVocab((state) => state.hydrated);
  const customDecks = useVocab((state) => state.customDecks);
  const direction = useVocab((state) => state.quizDirection);
  const setDirection = useVocab((state) => state.setQuizDirection);
  const grade = useVocab((state) => state.grade);

  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState<"boot" | "run" | "empty" | "done">("boot");
  const [queue, setQueue] = useState<VocabCard[]>([]);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "no">("idle");
  const [asked, setAsked] = useState<Direction>("en-uk");
  const [correct, setCorrect] = useState(0);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!hydrated) return;
    const state = useVocab.getState();
    const cards = cardsForDeck(deckId, state.customCards);
    if (cards.length === 0) {
      setQueue([]);
      setPhase("empty");
      return;
    }
    setQueue(quizQueue(cards, state.progress, 10));
    setIndex(0);
    setValue("");
    setStatus("idle");
    setCorrect(0);
    setPhase("run");
  }, [hydrated, deckId, run]);

  const card = queue[index];

  useEffect(() => {
    if (phase === "run") inputRef.current?.focus();
  }, [phase, index, status]);

  if (!hydrated) return <Boot title="Тест" />;
  const deck = getDeck(deckId, customDecks);
  if (!deck) return <Missing />;

  const shownDirection = status === "idle" ? direction : asked;
  const prompt = card ? promptOf(card, shownDirection) : "";
  const progress = queue.length === 0 ? 0 : ((index + (status === "idle" ? 0 : 1)) / queue.length) * 100;

  function check() {
    if (!card || status !== "idle") return;
    const ok = matchesAnswer(expectedAnswers(card, direction), value);
    setAsked(direction);
    setStatus(ok ? "ok" : "no");
    if (!ok) setShake(true);
    grade(card.id, ok);
    if (ok) setCorrect((count) => count + 1);
  }

  function next() {
    if (index + 1 >= queue.length) {
      setPhase("done");
      return;
    }
    setIndex((current) => current + 1);
    setValue("");
    setStatus("idle");
    setShake(false);
  }

  return (
    <Shell width="study">
      <BackLink />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-serif text-3xl text-foreground">{deck.title}</h1>
        {phase === "run" ? (
          <Segmented<Direction>
            label="Напрям тесту"
            value={direction}
            onChange={setDirection}
            options={[
              { value: "en-uk", label: "EN → UA" },
              { value: "uk-en", label: "UA → EN" },
            ]}
          />
        ) : null}
      </div>

      {phase === "empty" ? <p className="mt-8 text-muted">Спочатку додайте слова в колоду.</p> : null}

      {phase === "done" ? (
        <DonePanel know={correct} total={queue.length} onAgain={() => setRun((value) => value + 1)} />
      ) : null}

      {phase === "run" && card ? (
        <>
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
            <div className="bar-fill h-full bg-accent" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-sm tabular-nums text-muted">
            {index + 1} / {queue.length}
          </p>
          <div className="mt-3 rounded-card bg-paper p-6 text-ink">
            <p className="font-serif text-4xl leading-tight break-words">{prompt}</p>
            {shownDirection === "en-uk" && card.say ? (
              <p className="mt-3 text-sm text-ink-muted">[{card.say}]</p>
            ) : null}
            {status !== "idle" && card.example ? (
              <div className="mt-6 border-t border-line pt-4">
                <p>“{card.example}”</p>
                <p className="mt-1 text-sm text-ink-muted">{card.exampleUk}</p>
              </div>
            ) : null}
          </div>
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (status === "idle") check();
              else next();
            }}
          >
            <label className="text-sm text-muted" htmlFor="answer">
              {shownDirection === "en-uk" ? "Переклад українською" : "Слово англійською"}
            </label>
            <input
              id="answer"
              ref={inputRef}
              value={value}
              disabled={status !== "idle"}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              onChange={(event) => setValue(event.target.value)}
              onAnimationEnd={() => setShake(false)}
              className={cn(
                fieldClass,
                shake && "shake",
                status === "ok" && "border-know-text",
                status === "no" && "border-miss",
              )}
            />
            {status === "ok" ? <p className="text-sm text-know-text">Так. {answerOf(card, asked)}</p> : null}
            {status === "no" ? (
              <p className="text-sm text-muted">
                Правильна відповідь: <span className="text-foreground">{answerOf(card, asked)}</span>
              </p>
            ) : null}
            <div className="flex gap-2">
              {shownDirection === "en-uk" ? (
                <Button variant="ghost" onClick={() => speakEnglish(card.en)} aria-label="Озвучити">
                  Озвучити
                </Button>
              ) : null}
              <Button type="submit" className="flex-1" disabled={status === "idle" && value.trim().length === 0}>
                {status === "idle" ? "Перевірити" : "Далі"}
              </Button>
            </div>
          </form>
        </>
      ) : null}
    </Shell>
  );
}
