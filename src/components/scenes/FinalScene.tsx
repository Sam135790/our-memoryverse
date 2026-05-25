import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DustParticles, Fog, MoonGlow, Petals, StarField } from "@/components/atmosphere/Atmosphere";

const titles = ["Happy 2 Years…", "Of Togetherness…", "D Pondatti ❤️"];

export const FinalScene = ({ onReplay }: { onReplay: () => void }) => {
  const [step, setStep] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    if (step >= titles.length) return;
    const t = setTimeout(() => setStep(s => s + 1), 2800);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <section className="vignette film-grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-final px-6 py-20 text-center">
      <StarField count={200} />
      <Fog />
      <DustParticles count={50} />
      <Petals count={20} />
      <MoonGlow className="left-1/2 top-10 -translate-x-1/2" />

      {/* Constellation */}
      <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-40">
        <g stroke="hsl(var(--moonlight) / 0.4)" strokeWidth="0.5" fill="none">
          <path d="M 20% 30% L 30% 40% L 45% 35% L 55% 50% L 65% 45% L 75% 60%" />
          <path d="M 15% 70% L 28% 75% L 40% 68% L 52% 80%" />
        </g>
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {titles.slice(0, step).map((t, i) => (
          <motion.h2
            key={i}
            initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            transition={{ duration: 1.8, ease: [0.2, 0.7, 0.2, 1] }}
            className={`font-display text-5xl italic md:text-7xl ${
              i === 2 ? "text-rose text-glow-rose" : "text-starlight text-glow-moon"
            }`}
          >
            {t}
          </motion.h2>
        ))}
      </div>

      {step >= titles.length && (
        <>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 2 }}
            className="font-script relative z-10 mt-14 max-w-3xl text-2xl leading-relaxed text-moonlight/90 md:text-3xl"
          >
            And after every memory, every poem, every sleepless night, and every version of us… you are still my safest place.
          </motion.p>

          {/* Interactive star */}
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 1.6 }}
            onClick={() => setShowSecret(s => !s)}
            aria-label="A secret star"
            className="relative z-10 mt-14 grid h-20 w-20 place-items-center"
          >
            <span className="absolute inset-0 rounded-full bg-starlight/40 blur-2xl breathe" />
            <span className="absolute inset-3 rounded-full bg-moonlight shadow-glow-moon star-twinkle" />
            <span className="relative h-6 w-6 rounded-full bg-starlight shadow-glow-moon" />
          </motion.button>

          <AnimatePresence>
            {showSecret && (
              <motion.p
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="font-script relative z-10 mt-6 text-4xl text-rose text-glow-rose md:text-5xl"
              >
                I love you.
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1.4 }}
            onClick={onReplay}
            className="relative z-10 mt-14 rounded-full border border-rose/40 bg-background/30 px-10 py-4 font-display text-lg text-rose backdrop-blur-md transition hover:bg-rose/20"
          >
            Replay Our Universe
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 4, duration: 2 }}
            className="font-hand relative z-10 mt-10 text-lg text-moonlight/80"
          >
            Made with love, sleepless nights, and every piece of my heart.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 5, duration: 2 }}
            className="font-sans-soft relative z-10 mt-4 text-xs uppercase tracking-[0.5em] text-moonlight/60"
          >
            to be continued…
          </motion.p>
        </>
      )}
    </section>
  );
};
