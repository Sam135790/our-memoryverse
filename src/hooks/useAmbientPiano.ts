import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Generative ambient piano-pad using Web Audio API.
 * No audio files needed. Soft, dreamy, looping forever.
 */
export function useAmbientPiano() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const stop = useCallback(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = null;
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.cancelScheduledValues(ctxRef.current.currentTime);
      masterRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 1.2);
    }
    setPlaying(false);
  }, []);

  const start = useCallback(async () => {
    if (playing) return;
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AC();
      const master = ctxRef.current.createGain();
      master.gain.value = 0;
      // soft lowpass for warmth
      const lp = ctxRef.current.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 1800;
      lp.Q.value = 0.4;
      // gentle reverb-ish via convolver-less feedback delay
      const delay = ctxRef.current.createDelay(4);
      delay.delayTime.value = 0.55;
      const fb = ctxRef.current.createGain();
      fb.gain.value = 0.35;
      const wet = ctxRef.current.createGain();
      wet.gain.value = 0.5;
      master.connect(lp);
      lp.connect(ctxRef.current.destination);
      lp.connect(delay);
      delay.connect(fb);
      fb.connect(delay);
      delay.connect(wet);
      wet.connect(ctxRef.current.destination);
      masterRef.current = master;
    }
    const ctx = ctxRef.current!;
    if (ctx.state === "suspended") await ctx.resume();
    const target = muted ? 0 : 0.18;
    masterRef.current!.gain.cancelScheduledValues(ctx.currentTime);
    masterRef.current!.gain.linearRampToValueAtTime(target, ctx.currentTime + 2.5);

    // A minor pentatonic-ish dreamy set (Hz)
    const notes = [220, 261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];

    const playNote = () => {
      if (!ctxRef.current || !masterRef.current) return;
      const c = ctxRef.current;
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const osc = c.createOscillator();
      const osc2 = c.createOscillator();
      const g = c.createGain();
      osc.type = "sine";
      osc2.type = "triangle";
      osc.frequency.value = freq;
      osc2.frequency.value = freq * 2.005;
      g.gain.value = 0;
      const now = c.currentTime;
      const dur = 4 + Math.random() * 3;
      const peak = 0.07 + Math.random() * 0.05;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(peak, now + 0.6);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(g); osc2.connect(g);
      g.connect(masterRef.current);
      osc.start(now); osc2.start(now);
      osc.stop(now + dur + 0.1); osc2.stop(now + dur + 0.1);
    };

    playNote();
    intervalRef.current = window.setInterval(playNote, 1900);
    setPlaying(true);
  }, [muted, playing]);

  const toggleMute = useCallback(() => {
    setMuted(m => {
      const next = !m;
      if (masterRef.current && ctxRef.current) {
        masterRef.current.gain.cancelScheduledValues(ctxRef.current.currentTime);
        masterRef.current.gain.linearRampToValueAtTime(next ? 0 : 0.18, ctxRef.current.currentTime + 0.8);
      }
      return next;
    });
  }, []);

  useEffect(() => () => stop(), [stop]);

  return { start, stop, toggleMute, playing, muted };
}
