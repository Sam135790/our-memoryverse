import { Volume2, VolumeX } from "lucide-react";

export const AudioToggle = ({ muted, onToggle }: { muted: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    aria-label={muted ? "Unmute ambient music" : "Mute ambient music"}
    className="fixed top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background/40 text-foreground/80 backdrop-blur-md transition hover:bg-background/70 hover:text-foreground"
  >
    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
  </button>
);
