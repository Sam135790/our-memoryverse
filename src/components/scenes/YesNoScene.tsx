import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DustParticles, Fog, StarField } from "@/components/atmosphere/Atmosphere";

export const YesNoScene = ({ onNext }: { onNext: () => void }) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [teaseCount, setTeaseCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const dodge = () => {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 200;
    setNoPos({ x, y });
    setTeaseCount(c => c + 1);
  };

  const onYes = () => {
    setShowPopup(true);
    setTimeout(() => onNext(), 2800);
  };

  const teaseText =
    teaseCount >= 6 ? "you literally can't 😭" :
    teaseCount >= 3 ? "stop trying 😤" :
    teaseCount >= 1 ? "nuh-uh 🙅" : "";

  return (
    <section className="vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-midnight px-6 text-center">
      <StarField count={60} />
      <Fog />
      <DustParticles count={25} />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="font-display relative z-10 max-w-2xl text-4xl text-starlight text-glow-moon md:text-5xl"
      >
        Do you still <span className="italic text-rose text-glow-rose">love me</span>… <br />
        after every storm?
      </motion.h2>

      <div className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-8">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="pulse-glow rounded-full bg-gradient-romance px-12 py-5 font-display text-2xl text-primary-foreground"
        >
          Yes 💖
        </motion.button>

        <motion.button
          onClick={dodge}
          onMouseEnter={dodge}
          animate={{ x: noPos.x, y: noPos.y }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
          className="rounded-full border border-moonlight/30 bg-background/40 px-10 py-5 font-display text-2xl text-moonlight backdrop-blur-md"
        >
          No
        </motion.button>
      </div>

      {teaseText && (
        <motion.p
          key={teaseCount}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          className="font-hand relative z-10 mt-10 text-2xl text-rose/90"
        >
          {teaseText}
        </motion.p>
      )}

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
              className="rounded-3xl border border-rose/30 bg-card/80 p-10 text-center shadow-glow-rose"
            >
              <p className="font-script text-4xl text-rose text-glow-rose md:text-5xl">
                I knew it. ❤️
              </p>
              <p className="font-display mt-4 text-lg italic text-moonlight/90">
                I love you too, always.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
