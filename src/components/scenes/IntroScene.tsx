import { motion } from "framer-motion";
import { DustParticles, Fog, MoonGlow, StarField } from "@/components/atmosphere/Atmosphere";
import { Heart } from "lucide-react";

export const IntroScene = ({ onNext }: { onNext: () => void }) => (
  <section className="vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-midnight px-6 text-center">
    <StarField count={120} />
    <Fog />
    <DustParticles count={50} />
    <MoonGlow className="left-1/2 top-10 -translate-x-1/2" />

    <motion.h1
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 2.4, ease: [0.2, 0.7, 0.2, 1] }}
      className="font-display relative z-10 text-5xl leading-tight text-starlight text-glow-moon md:text-7xl lg:text-8xl"
    >
      A Universe
      <br />
      <span className="italic text-rose text-glow-rose">Made For You</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 2 }}
      className="font-script relative z-10 mt-8 text-3xl text-moonlight/90 md:text-4xl"
    >
      My Love <Heart className="inline h-7 w-7 fill-rose text-rose" />
    </motion.p>

    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 4, duration: 1.4 }}
      onClick={onNext}
      className="pulse-glow relative z-10 mt-16 rounded-full border border-rose/50 bg-gradient-romance px-10 py-4 font-display text-lg tracking-wide text-primary-foreground transition hover:scale-105"
    >
      Begin Our Story
    </motion.button>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ delay: 5.5, duration: 2 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans-soft text-xs uppercase tracking-[0.4em] text-moonlight/60"
    >
      best experienced with sound · headphones recommended
    </motion.p>
  </section>
);
