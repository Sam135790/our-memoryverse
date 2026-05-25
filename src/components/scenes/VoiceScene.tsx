import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DustParticles, Fog, StarField } from "@/components/atmosphere/Atmosphere";
import { Mic } from "lucide-react";

type SR = typeof window extends { webkitSpeechRecognition: infer T } ? T : unknown;

export const VoiceScene = ({ onNext }: { onNext: () => void }) => {
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const recRef = useRef<unknown>(null);

  const tryUnlock = (text: string) => {
    const t = text.toLowerCase();
    // accept many variants & names — any speech unlocks after a beat
    if (t.length > 0) {
      setUnlocked(true);
      setTimeout(() => onNext(), 2200);
    }
  };

  const start = () => {
    setListening(true);
    const w = window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) {
      // graceful fallback
      setTimeout(() => { setHeard("…"); tryUnlock("you"); }, 1500);
      return;
    }
    const rec = new Ctor() as { lang: string; continuous: boolean; interimResults: boolean; onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onerror: () => void; onend: () => void; start: () => void; stop: () => void };
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = true;
    rec.onresult = (e) => {
      const txt = Array.from(e.results).map(r => r[0].transcript).join(" ");
      setHeard(txt);
      if (txt.trim().length > 1) tryUnlock(txt);
    };
    rec.onerror = () => { setListening(false); };
    rec.onend = () => { setListening(false); };
    recRef.current = rec;
    rec.start();
  };

  useEffect(() => () => {
    const r = recRef.current as { stop?: () => void } | null;
    r?.stop?.();
  }, []);

  return (
    <section className="vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-midnight px-6 text-center">
      <StarField count={90} />
      <Fog />
      <DustParticles count={35} />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6 }}
        className="font-display relative z-10 text-5xl italic text-starlight text-glow-moon md:text-7xl"
      >
        Say My Name…
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.4, duration: 1.8 }}
        className="font-script relative z-10 mt-6 max-w-md text-2xl text-moonlight/90"
      >
        Whisper the name your heart already knows.
      </motion.p>

      <motion.button
        onClick={start}
        whileTap={{ scale: 0.95 }}
        className={`relative z-10 mt-14 grid h-32 w-32 place-items-center rounded-full bg-gradient-romance text-primary-foreground transition ${listening ? "pulse-glow" : "shadow-glow-rose"}`}
        aria-label="Activate microphone"
      >
        {listening && (
          <>
            <span className="absolute inset-0 rounded-full bg-rose/30 animate-ping" />
            <span className="absolute -inset-3 rounded-full border border-rose/40 breathe" />
          </>
        )}
        <Mic className="relative h-12 w-12" strokeWidth={1.5} />
      </motion.button>

      <p className="font-hand relative z-10 mt-8 min-h-[2rem] text-2xl text-rose">
        {heard}
      </p>

      {unlocked && (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="font-display relative z-10 mt-4 text-xl italic text-moonlight/90"
        >
          Yes… that's me. Opening the film…
        </motion.p>
      )}

      <button
        onClick={() => { setUnlocked(true); setTimeout(onNext, 1200); }}
        className="font-sans-soft absolute bottom-6 z-10 text-xs uppercase tracking-[0.3em] text-moonlight/40 hover:text-moonlight/80"
      >
        skip
      </button>
    </section>
  );
};
