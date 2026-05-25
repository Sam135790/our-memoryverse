import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DustParticles, Fog, StarField } from "@/components/atmosphere/Atmosphere";

/**
 * Fullscreen cinematic "film" page.
 * Since no real video is available, we render a sequence of poetic
 * fullscreen frames that fade through with film-grain & vignette,
 * giving the felt-experience of a memory reel.
 */
const frames = [
  { text: "the first message…", sub: "two years ago today" },
  { text: "your laugh, recorded in my memory", sub: "" },
  { text: "the night we fought…", sub: "and stayed anyway" },
  { text: "the breakups that never broke us", sub: "" },
  { text: "every quiet 'I love you'", sub: "" },
  { text: "every silence that meant 'I'm still here'", sub: "" },
  { text: "every version of us", sub: "all leading here" },
];

export const VideoScene = ({ onNext }: { onNext: () => void }) => {
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setShowTitle(false), 3200);
    return () => clearTimeout(t);
  }, [started]);

  useEffect(() => {
    if (!started || showTitle) return;
    if (idx >= frames.length) {
      const t = setTimeout(onNext, 2000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIdx(i => i + 1), 3400);
    return () => clearTimeout(t);
  }, [started, showTitle, idx, onNext]);

  return (
    <section className="vignette film-grain fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-black px-6 text-center">
      <StarField count={50} />
      <Fog />
      <DustParticles count={20} />

      {!started ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }} className="relative z-10 flex flex-col items-center gap-10">
          <h2 className="font-display text-5xl italic text-starlight text-glow-moon md:text-7xl">
            A Film Made From Us
          </h2>
          <p className="font-script max-w-lg text-2xl text-moonlight/85">
            Two years, distilled into a few breaths of light.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setStarted(true)}
            className="pulse-glow rounded-full bg-gradient-romance px-12 py-4 font-display text-lg text-primary-foreground"
          >
            Play the Film
          </motion.button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {showTitle ? (
            <motion.h2
              key="title"
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0)" }}
              exit={{ opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 1.4 }}
              className="font-display relative z-10 text-6xl italic text-rose text-glow-rose md:text-8xl"
            >
              Us.
            </motion.h2>
          ) : idx < frames.length ? (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(12px)" }}
              transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
              className="relative z-10 max-w-3xl"
            >
              <p className="font-display text-3xl italic text-starlight text-glow-moon md:text-5xl">
                {frames[idx].text}
              </p>
              {frames[idx].sub && (
                <p className="font-hand mt-6 text-2xl text-rose/90">{frames[idx].sub}</p>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.8 }}
              className="font-script relative z-10 text-3xl text-moonlight/90"
            >
              … and the film keeps writing itself.
            </motion.p>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};
