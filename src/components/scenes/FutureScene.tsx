import { motion } from "framer-motion";
import { DustParticles, Fog, MoonGlow, StarField } from "@/components/atmosphere/Atmosphere";

export const FutureScene = ({ onNext }: { onNext: () => void }) => (
  <section className="vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-final px-6 text-center">
    <StarField count={140} />
    <Fog />
    <DustParticles count={40} />
    <MoonGlow className="right-10 top-1/4" />
    <MoonGlow className="left-10 bottom-1/4" />

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.7 }}
      viewport={{ once: true }}
      transition={{ duration: 2 }}
      className="font-sans-soft relative z-10 text-xs uppercase tracking-[0.5em] text-moonlight/70"
    >
      in every lifetime
    </motion.p>

    <motion.h2
      initial={{ opacity: 0, y: 50, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
      viewport={{ once: true }}
      transition={{ duration: 2.4, delay: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="font-display relative z-10 mt-8 max-w-4xl text-5xl italic leading-tight text-starlight text-glow-moon md:text-7xl"
    >
      I Think I'd Find You<br />
      <span className="text-rose text-glow-rose">Again.</span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 2.6, duration: 1.6 }}
      className="font-script relative z-10 mt-10 max-w-xl text-2xl text-moonlight/90"
    >
      Across every universe, every version of me would still walk the long way home to you.
    </motion.p>

    <motion.button
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 3.6, duration: 1.4 }}
      onClick={onNext}
      className="pulse-glow relative z-10 mt-16 rounded-full bg-gradient-romance px-10 py-4 font-display text-lg text-primary-foreground"
    >
      One Last Thing →
    </motion.button>
  </section>
);
