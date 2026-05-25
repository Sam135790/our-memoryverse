import { motion } from "framer-motion";
import { DustParticles, Fog, StarField } from "@/components/atmosphere/Atmosphere";

const lines = ["14 Nights.", "336 Hours.", "All For You."];

export const EffortScene = ({ onNext }: { onNext: () => void }) => (
  <section className="vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-midnight px-6 text-center">
    <StarField count={70} />
    <Fog />
    <DustParticles count={30} />

    <div className="relative z-10 space-y-6">
      {lines.map((line, i) => (
        <motion.h2
          key={line}
          initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: i * 1.4, duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
          className={`font-display text-5xl md:text-7xl ${i === 2 ? "italic text-rose text-glow-rose" : "text-starlight text-glow-moon"}`}
        >
          {line}
        </motion.h2>
      ))}
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.85 }}
      transition={{ delay: 5, duration: 2 }}
      className="font-script relative z-10 mt-12 max-w-md text-xl text-moonlight/90"
    >
      Two weeks of sleepless love, poured into every pixel — just for you.
    </motion.p>

    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 6.5, duration: 1.5 }}
      onClick={onNext}
      className="relative z-10 mt-14 rounded-full border border-moonlight/40 bg-background/30 px-8 py-3 font-display tracking-wide text-moonlight backdrop-blur-md transition hover:border-rose/60 hover:text-rose"
    >
      Continue →
    </motion.button>
  </section>
);
