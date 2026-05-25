import { motion } from "framer-motion";
import { DustParticles, Fog, MoonGlow, StarField } from "@/components/atmosphere/Atmosphere";

const memories = [
  "the way you say my name",
  "your sleepy 3 a.m. messages",
  "your laugh between tears",
  "your hand finding mine, every time",
  "the apologies we whispered",
  "the silences that healed us",
];

export const AfterglowScene = ({ onNext }: { onNext: () => void }) => (
  <section className="vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-midnight px-6 py-24 text-center">
    <StarField count={90} />
    <Fog />
    <DustParticles count={40} />
    <MoonGlow className="left-1/3 top-1/4" />

    <motion.h2
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
      viewport={{ once: true }}
      transition={{ duration: 2 }}
      className="font-display relative z-10 max-w-4xl text-4xl italic text-starlight text-glow-moon md:text-6xl"
    >
      And Somehow…<br />
      <span className="text-rose text-glow-rose">I Still Choose You.</span>
    </motion.h2>

    <div className="relative z-10 mt-16 grid max-w-3xl gap-4 md:grid-cols-2">
      {memories.map((m, i) => (
        <motion.p
          key={m}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.85, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.25, duration: 1.4 }}
          className="font-hand text-2xl text-moonlight/90"
        >
          · {m}
        </motion.p>
      ))}
    </div>

    <motion.button
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 2, duration: 1.4 }}
      onClick={onNext}
      className="relative z-10 mt-20 rounded-full border border-rose/40 bg-background/30 px-10 py-4 font-display text-lg text-rose backdrop-blur-md transition hover:bg-rose/20"
    >
      Enter the Poetry Archive
    </motion.button>
  </section>
);
