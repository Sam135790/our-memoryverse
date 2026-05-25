import { useMemo } from "react";

/* ===== Floating dust particles ===== */
export const DustParticles = ({ count = 40, color = "moon" }: { count?: number; color?: "moon" | "rose" | "candle" }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 18,
        size: 1 + Math.random() * 3,
        duration: 14 + Math.random() * 14,
        opacity: 0.25 + Math.random() * 0.55,
      })),
    [count],
  );
  const bg =
    color === "rose" ? "hsl(var(--rose) / 0.75)" :
    color === "candle" ? "hsl(var(--candle) / 0.8)" :
    "hsl(var(--moonlight) / 0.7)";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute rounded-full drift-up"
          style={{
            left: `${p.left}%`,
            bottom: `-10px`,
            width: p.size,
            height: p.size,
            background: bg,
            boxShadow: `0 0 ${p.size * 4}px ${bg}`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ===== Starfield ===== */
export const StarField = ({ count = 80 }: { count?: number }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 4,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map(s => (
        <span
          key={s.id}
          className="absolute rounded-full bg-starlight star-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: `0 0 ${s.size * 3}px hsl(var(--starlight))`,
          }}
        />
      ))}
    </div>
  );
};

/* ===== Cinematic fog ===== */
export const Fog = ({ tone = "midnight" }: { tone?: "midnight" | "warm" }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      className="absolute -inset-20 opacity-50 mix-blend-screen float-slower"
      style={{
        background:
          tone === "warm"
            ? "radial-gradient(ellipse at 30% 60%, hsl(32 60% 50% / 0.25), transparent 60%), radial-gradient(ellipse at 70% 30%, hsl(20 50% 40% / 0.2), transparent 65%)"
            : "radial-gradient(ellipse at 30% 60%, hsl(270 50% 50% / 0.25), transparent 60%), radial-gradient(ellipse at 70% 30%, hsl(220 60% 45% / 0.25), transparent 65%)",
        filter: "blur(40px)",
      }}
    />
  </div>
);

/* ===== Moon glow ===== */
export const MoonGlow = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none absolute ${className}`}>
    <div className="h-72 w-72 rounded-full bg-moonlight/30 blur-3xl breathe" />
  </div>
);

/* ===== Drifting petals (warm) ===== */
export const Petals = ({ count = 18 }: { count?: number }) => {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 16,
        duration: 14 + Math.random() * 12,
        size: 6 + Math.random() * 10,
        rot: Math.random() * 360,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map(p => (
        <span
          key={p.id}
          className="absolute drift-up"
          style={{
            left: `${p.left}%`,
            bottom: "-20px",
            width: p.size,
            height: p.size * 1.4,
            background: "radial-gradient(ellipse at 30% 30%, hsl(350 80% 75%), hsl(348 60% 55%))",
            borderRadius: "60% 30% 60% 30%",
            transform: `rotate(${p.rot}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0.85,
            boxShadow: "0 0 10px hsl(350 80% 70% / 0.5)",
          }}
        />
      ))}
    </div>
  );
};
