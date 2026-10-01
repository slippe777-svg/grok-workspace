let voiceToken = 0;

function pickEnglishVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices();
  return (
    voices.find((voice) => voice.lang === "en-US") ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("en-us")) ??
    voices.find((voice) => voice.lang === "en-GB") ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("en-gb")) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ??
    null
  );
}

export function speakEnglish(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !text.trim()) return;
  const synth = window.speechSynthesis;
  const token = ++voiceToken;

  const speakNow = () => {
    if (token !== voiceToken) return;
    try {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voice = pickEnglishVoice(synth);
      utter.lang = voice?.lang ?? "en-US";
      if (voice) utter.voice = voice;
      utter.rate = 0.92;
      synth.speak(utter);
      if (synth.paused) synth.resume();
    } catch {
      /* synthesis is optional */
    }
  };

  if (synth.getVoices().length > 0) {
    speakNow();
    return;
  }

  let done = false;
  const once = () => {
    if (done) return;
    done = true;
    synth.removeEventListener("voiceschanged", once);
    speakNow();
  };
  synth.addEventListener("voiceschanged", once);
  window.setTimeout(once, 200);
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  voiceToken += 1;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
}
