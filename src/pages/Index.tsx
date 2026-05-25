import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAmbientPiano } from "@/hooks/useAmbientPiano";
import { AudioToggle } from "@/components/AudioToggle";
import { IntroScene } from "@/components/scenes/IntroScene";
import { EffortScene } from "@/components/scenes/EffortScene";
import { YesNoScene } from "@/components/scenes/YesNoScene";
import { PreparationScene } from "@/components/scenes/PreparationScene";
import { VoiceScene } from "@/components/scenes/VoiceScene";
import { VideoScene } from "@/components/scenes/VideoScene";
import { AfterglowScene } from "@/components/scenes/AfterglowScene";
import {
  PoetryIntroScene,
  Poem1Scene,
  Poem2Scene,
  Poem3Scene,
  Poem4Scene,
  ThankYouScene,
} from "@/components/scenes/PoetryScenes";
import { FutureScene } from "@/components/scenes/FutureScene";
import { MessageScene } from "@/components/scenes/MessageScene";
import { FinalScene } from "@/components/scenes/FinalScene";

const SCENE_KEYS = [
  "intro",
  "effort",
  "yesno",
  "prep",
  "voice",
  "video",
  "afterglow",
  "poetry-intro",
  "poem1",
  "poem2",
  "poem3",
  "poem4",
  "thanks",
  "future",
  "message",
  "final",
] as const;
type SceneKey = (typeof SCENE_KEYS)[number];

const Index = () => {
  const [scene, setScene] = useState<SceneKey>("intro");
  const piano = useAmbientPiano();

  const goto = useCallback((s: SceneKey) => {
    setScene(s);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (!piano.playing) piano.start();
  }, [piano]);

  const next = useCallback(() => {
    const i = SCENE_KEYS.indexOf(scene);
    if (i < SCENE_KEYS.length - 1) goto(SCENE_KEYS[i + 1]);
  }, [scene, goto]);

  const replay = useCallback(() => goto("intro"), [goto]);

  // start audio on first interaction anywhere
  useEffect(() => {
    const kick = () => { if (!piano.playing) piano.start(); };
    window.addEventListener("pointerdown", kick, { once: true });
    window.addEventListener("keydown", kick, { once: true });
    return () => {
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
    };
  }, [piano]);

  const render = () => {
    switch (scene) {
      case "intro":        return <IntroScene onNext={next} />;
      case "effort":       return <EffortScene onNext={next} />;
      case "yesno":        return <YesNoScene onNext={next} />;
      case "prep":         return <PreparationScene onNext={next} />;
      case "voice":        return <VoiceScene onNext={next} />;
      case "video":        return <VideoScene onNext={next} />;
      case "afterglow":    return <AfterglowScene onNext={next} />;
      case "poetry-intro": return <PoetryIntroScene onNext={next} />;
      case "poem1":        return <Poem1Scene onNext={next} />;
      case "poem2":        return <Poem2Scene onNext={next} />;
      case "poem3":        return <Poem3Scene onNext={next} />;
      case "poem4":        return <Poem4Scene onNext={next} />;
      case "thanks":       return <ThankYouScene onNext={next} />;
      case "future":       return <FutureScene onNext={next} />;
      case "message":      return <MessageScene onNext={next} />;
      case "final":        return <FinalScene onReplay={replay} />;
    }
  };

  return (
    <main className="film-grain relative min-h-screen w-full bg-background text-foreground">
      <AudioToggle muted={piano.muted} onToggle={piano.toggleMute} />
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {render()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default Index;
