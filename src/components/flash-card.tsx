import { Volume2 } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { POS_LABEL } from "@/lib/vocab";
import type { StudyFront, VocabCard } from "@/lib/types";

export function FlashCard({
  card,
  front,
  flipped,
  onFlip,
  onSpeak,
}: {
  card: VocabCard;
  front: StudyFront;
  flipped: boolean;
  onFlip: () => void;
  onSpeak: () => void;
}) {
  const faceWord = front === "en" ? card.en : card.uk;
  const backWord = front === "en" ? card.uk : card.en;
  const frontIsEnglish = front === "en";

  return (
    <div className="card-scene">
      <div className={cn("card-inner min-h-80 sm:min-h-96", flipped && "is-flipped")}>
        <CardSide
          side="front"
          hidden={flipped}
          label={`Показати переклад: ${faceWord}`}
          onFlip={onFlip}
        >
          <span className="text-sm text-ink-muted">{POS_LABEL[card.pos]}</span>
          <WordLine word={faceWord} speak={frontIsEnglish} say={frontIsEnglish ? card.say : ""} onSpeak={onSpeak} />
          <span className="mt-auto pt-6 text-sm text-ink-muted">Натисніть, щоб перевернути</span>
        </CardSide>
        <CardSide
          side="back"
          hidden={!flipped}
          label={`Сховати переклад: ${backWord}`}
          onFlip={onFlip}
        >
          <span className="text-sm text-ink-muted">переклад</span>
          <WordLine word={backWord} speak={!frontIsEnglish} say={!frontIsEnglish ? card.say : ""} onSpeak={onSpeak} />
          {card.example ? (
            <span className="mt-6 block border-t border-line pt-4">
              <span className="block text-ink">“{card.example}”</span>
              <span className="mt-1 block text-sm text-ink-muted">{card.exampleUk}</span>
            </span>
          ) : null}
        </CardSide>
      </div>
      <p className="sr-only" aria-live="polite">
        {flipped ? backWord : faceWord}
      </p>
    </div>
  );
}

function CardSide({
  side,
  hidden,
  label,
  onFlip,
  children,
}: {
  side: "front" | "back";
  hidden: boolean;
  label: string;
  onFlip: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "card-face paper-shadow overflow-hidden rounded-card border border-line bg-paper text-ink",
        side === "back" && "back",
      )}
      aria-hidden={hidden}
    >
      <button
        type="button"
        className="absolute inset-0 z-0"
        tabIndex={hidden ? -1 : 0}
        onClick={onFlip}
        aria-label={label}
      />
      <div className="pointer-events-none relative z-10 flex h-full flex-col overflow-auto p-6">{children}</div>
    </div>
  );
}

function WordLine({
  word,
  speak,
  say,
  onSpeak,
}: {
  word: string;
  speak: boolean;
  say: string;
  onSpeak: () => void;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-start gap-3">
        <span className="min-w-0 flex-1 font-serif text-4xl leading-tight break-words text-ink sm:text-5xl">{word}</span>
        {speak ? (
          <button
            type="button"
            data-speak="true"
            className="btn pointer-events-auto mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink"
            aria-label={`Озвучити ${word}`}
            onClick={(event) => {
              event.stopPropagation();
              onSpeak();
            }}
          >
            <Volume2 className="size-5" aria-hidden="true" />
          </button>
        ) : null}
      </div>
      {say ? <span className="mt-3 block text-sm text-ink-muted">[{say}]</span> : null}
    </div>
  );
}
