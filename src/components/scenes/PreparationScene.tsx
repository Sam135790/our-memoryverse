import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DustParticles, Fog, StarField } from "@/components/atmosphere/Atmosphere";
import { Headphones } from "lucide-react";

export const PreparationScene = ({ onNext }: { onNext: () => void }) => {
  const [count, setCount] = useState<number | null>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (count === null) return;
    if (count <= 0) { onNext(); return; }
    const t = setTimeout(() => setCount(c => (c ?? 1) - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onNext]);

  return (
    <section className="vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-midnight px-6 text-center">
      <StarField count={70} />
      <Fog />
      <DustParticles count={30} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <Headphones className="h-14 w-14 text-rose breathe" strokeWidth={1.4} />
        <h2 className="font-display text-3xl text-starlight text-glow-moon md:text-5xl">
          Slow down. Breathe.
        </h2>
        <p className="font-script max-w-md text-2xl text-moonlight/90">
          Put on your headphones. Dim the lights.<br />
          What's coming next is only meant for you.
        </p>
      </motion.div>

      {count === null ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
          onClick={() => { setArmed(true); setCount(3); }}
          className="pulse-glow relative z-10 mt-14 rounded-full bg-gradient-romance px-10 py-4 font-display text-lg text-primary-foreground"
        >
          I'm Ready
        </motion.button>
      ) : (
        <motion.div
          key={count}
          initial={{ scale: 0.4, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0)" }}
          exit={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="font-display relative z-10 mt-14 text-9xl text-rose text-glow-rose"
        >
          {count > 0 ? count : "·"}
        </motion.div>
      )}

      {armed && (
        <p className="font-sans-soft absolute bottom-8 z-10 text-xs uppercase tracking-[0.4em] text-moonlight/50">
          opening the universe…
        </p>
      )}
    </section>
  );
};
