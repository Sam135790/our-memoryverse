import { motion } from "framer-motion";
import { Fog, Petals } from "@/components/atmosphere/Atmosphere";

/* ============== Shared parchment paper wrapper ============== */
const Paper = ({ children, warm = false }: { children: React.ReactNode; warm?: boolean }) => (
  <div className="vignette-warm relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[hsl(28_45%_18%)] via-[hsl(24_40%_12%)] to-[hsl(20_50%_8%)] px-4 py-16">
    <Fog tone="warm" />
    <Petals count={warm ? 26 : 14} />
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full"
           style={{ background: "radial-gradient(ellipse at center, hsl(32 80% 55% / 0.18) 0%, transparent 55%)" }} />
    </div>
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="paper-texture ink-fade-edges relative z-10 w-full max-w-3xl rounded-md p-10 md:p-16 shadow-deep"
      style={{ boxShadow: warm
        ? "0 30px 80px hsl(0 0% 0% / 0.6), 0 0 100px hsl(32 90% 55% / 0.25)"
        : "0 30px 80px hsl(0 0% 0% / 0.6), 0 0 60px hsl(32 70% 45% / 0.15)"
      }}
    >
      <div className="pointer-events-none absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rounded bg-[hsl(28_40%_30%/0.4)] blur-[2px]" />
      {children}
    </motion.div>
  </div>
);

/* ============== Candle (warm flicker) ============== */
const Candle = () => (
  <div className="pointer-events-none absolute -top-10 right-8 z-10">
    <div className="relative">
      <div className="h-8 w-2 rounded-sm bg-[hsl(30_30%_70%)]" />
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <div className="h-6 w-3 rounded-full bg-gradient-to-t from-[hsl(20_90%_55%)] via-[hsl(40_95%_65%)] to-[hsl(55_100%_85%)] candle-flicker shadow-glow-candle" />
      </div>
    </div>
  </div>
);

/* ============== Poetry Intro ============== */
export const PoetryIntroScene = ({ onNext }: { onNext: () => void }) => (
  <Paper>
    <Candle />
    <p className="font-hand text-center text-xl text-sepia md:text-2xl">
      Collected Across Two Years of Loving You
    </p>
    <h2 className="font-display mt-8 text-center text-4xl italic leading-tight text-ink md:text-6xl">
      Some Feelings Were Too Big<br />
      For Ordinary Words…
    </h2>
    <div className="mx-auto mt-10 h-px w-24 bg-sepia/40" />
    <p className="font-display mt-10 text-center text-lg italic text-sepia/90">
      What follows are pages I never sent. Until tonight.
    </p>
    <div className="mt-12 flex justify-center">
      <button
        onClick={onNext}
        className="font-display rounded-full border border-sepia/40 bg-[hsl(38_55%_82%)] px-8 py-3 text-ink/90 transition hover:bg-[hsl(38_55%_78%)] hover:shadow-glow-candle"
      >
        Turn the Page →
      </button>
    </div>
  </Paper>
);

/* ============== Poem 1 ============== */
const poem1 = [
  "That day, the moon started crying, realizing that someone was more beautiful than it…",
  "That day, the loyal sunflower betrayed the sun by turning its head towards her…",
  "That day, the sun blushed and hid behind the clouds, overwhelmed by her beauty…",
  "That day, the angels in heaven grew jealous of her beauty…",
  "That day, the flowers in the garden bowed to her beauty…",
  "That day, the earth felt privileged that her foot touched the ground…",
  "That day, the breeze felt lucky to have touched her…",
  "That day, the stars admired her shining eyes…",
  "That day, the whole universe paused for a second, admiring her beauty…",
  "That day, even the God who created her doubted himself, wondering how he had made such a wonderful creature…",
];

export const Poem1Scene = ({ onNext }: { onNext: () => void }) => (
  <Paper>
    <Candle />
    <h3 className="font-display text-center text-4xl italic text-ink md:text-5xl">That Day!</h3>
    <div className="mx-auto mt-4 h-px w-16 bg-sepia/40" />
    <div className="mt-10 space-y-5">
      {poem1.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ delay: Math.min(i * 0.15, 1.5), duration: 1.2 }}
          className="font-display text-lg leading-relaxed text-ink/90 md:text-xl"
        >
          {line}
        </motion.p>
      ))}
    </div>
    <PageNav onNext={onNext} />
  </Paper>
);

/* ============== Poem 2 (Tamil) ============== */
export const Poem2Scene = ({ onNext }: { onNext: () => void }) => (
  <Paper>
    <Candle />
    <div className="font-tamil space-y-6 text-center text-xl leading-loose text-ink/90 md:text-2xl">
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }}>
        என்னவளின் எண்ணங்களுக்குள் ஊடுருவிப் பார்த்தேன்...
      </motion.p>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 1.4 }}>
        அப்போதுதான் தெரிந்தது,
      </motion.p>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.6, duration: 1.4 }}>
        அவள் என்னைப்பற்றி மட்டும்தான்
      </motion.p>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.4, duration: 1.4 }} className="italic text-rose-deep">
        எண்ணிக்கொண்டிருக்கிறாள் என்று!
      </motion.p>
    </div>
    <PageNav onNext={onNext} />
  </Paper>
);

/* ============== Poem 3 (Tamil) ============== */
export const Poem3Scene = ({ onNext }: { onNext: () => void }) => (
  <Paper>
    <Candle />
    <div className="font-tamil space-y-6 text-center text-xl leading-loose text-ink/90 md:text-2xl">
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }}>
        உன் பார்வையில் மயங்கிய நான்,
      </motion.p>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 1.4 }}>
        சற்று ஓய்வெடுக்க உன் கன்னக்குழியை கேட்டேன்!
      </motion.p>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1.4 }}>
        நீயோ -- உன்
      </motion.p>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.2, duration: 1.4 }} className="italic text-rose-deep">
        இதய மாளிகையிலேயே எனக்கு இடம் கொடுத்துவிட்டாய்!
      </motion.p>
    </div>
    <PageNav onNext={onNext} />
  </Paper>
);

/* ============== Poem 4 — climax, extra warm ============== */
const poem4 = [
  "அவள் கன்னத்தில் வழுக்கி,",
  "அவள் இதழ்களில் ஓய்வெடுத்து,",
  "அவள் பற்களில் பயணம் செய்து,",
  "அவள் நாவினில் நழுவி உள்ளே சென்று...",
  "அவள் இதயத்தில் இடம் பிடிக்க,",
  "நான் முதல் அடி எடுத்து வைத்த நாள் இன்று!",
];

export const Poem4Scene = ({ onNext }: { onNext: () => void }) => (
  <Paper warm>
    <Candle />
    <h3 className="font-display text-center text-4xl italic text-ink text-glow-candle md:text-5xl">
      Exclusively For Today
    </h3>
    <div className="mx-auto mt-4 h-px w-20 bg-rose-deep/50" />
    <div className="font-tamil mt-12 space-y-7 text-center text-2xl leading-loose text-ink md:text-3xl">
      {poem4.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.6, duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
          className={i === poem4.length - 1 ? "italic text-rose-deep text-glow-candle" : ""}
        >
          {line}
        </motion.p>
      ))}
    </div>
    <PageNav onNext={onNext} label="Read what came after →" />
  </Paper>
);

/* ============== Thank You Page (Tamil) ============== */
export const ThankYouScene = ({ onNext }: { onNext: () => void }) => (
  <Paper warm>
    <Candle />
    <div className="font-tamil space-y-8 text-center text-2xl leading-loose text-ink md:text-3xl">
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.6 }}>
        தன்னால் கவிஞன் ஆனவனை விட,
      </motion.p>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1, duration: 1.6 }}>
        பெண்ணால் கவிஞன் ஆனவனே அதிகம்!
      </motion.p>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 2, duration: 1.6 }}>
        என்னை கவிஞன் ஆக்கிய உனக்கு...
      </motion.p>
      <motion.p initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 3, duration: 1.6 }} className="font-display text-5xl italic text-rose-deep text-glow-candle md:text-6xl">
        நன்றி!
      </motion.p>
    </div>
    <PageNav onNext={onNext} label="Continue →" />
  </Paper>
);

/* ============== Page nav button ============== */
const PageNav = ({ onNext, label = "Next Page →" }: { onNext: () => void; label?: string }) => (
  <div className="mt-14 flex justify-center">
    <button
      onClick={onNext}
      className="font-display rounded-full border border-sepia/50 bg-[hsl(38_55%_82%)] px-8 py-3 text-ink/90 transition hover:bg-[hsl(38_55%_78%)] hover:shadow-glow-candle"
    >
      {label}
    </button>
  </div>
);
