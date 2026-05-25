import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { DustParticles, Fog, StarField } from "@/components/atmosphere/Atmosphere";

export const VideoScene = ({ onNext }: { onNext: () => void }) => {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Fallback to move to the next scene automatically when the video finishes playing
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleVideoEnd = () => {
      // Exit fullscreen safely when done
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => console.log(err));
      }
      onNext();
    };

    videoElement.addEventListener("ended", handleVideoEnd);
    return () => {
      videoElement.removeEventListener("ended", handleVideoEnd);
    };
  }, [onNext]);

  const handlePlayFilm = async () => {
    setStarted(true);

    // Request full screen on the entire section container (fits laptop perfectly)
    if (sectionRef.current) {
      try {
        if (sectionRef.current.requestFullscreen) {
          await sectionRef.current.requestFullscreen();
        } else if ((sectionRef.current as any).webkitRequestFullscreen) {
          /* Safari/iOS support */
          await (sectionRef.current as any).webkitRequestFullscreen();
        }
      } catch (error) {
        console.error("Fullscreen request denied by browser permissions:", error);
      }
    }

    // Trigger video playback immediately
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked or video error: ", err);
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="vignette film-grain fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-black px-6 text-center select-none"
    >
      {/* Keeping your beautiful ambient atmospheric effects layering on top of/behind video */}
      <StarField count={50} />
      <Fog />
      <DustParticles count={20} />

      {!started ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.6 }} 
          className="relative z-10 flex flex-col items-center gap-10"
        >
          <h2 className="font-display text-5xl italic text-starlight text-glow-moon md:text-7xl">
            A Film Made From Us
          </h2>
          <p className="font-script max-w-lg text-2xl text-moonlight/85">
            Two years, distilled into a few breaths of light.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handlePlayFilm}
            className="pulse-glow rounded-full bg-gradient-romance px-12 py-4 font-display text-lg text-primary-foreground cursor-pointer"
          >
            Play the Film
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 w-full h-full z-0 flex items-center justify-center bg-black"
        >
          {/* Native HTML5 Video element configured to span the entire screen layout */}
          <video
            ref={videoRef}
            className="w-full h-full object-contain pointer-events-auto"
            playsInline
            controls /* Adds play/pause and scrub bars. Remove this attribute if you want it purely cinematic without controls */
          >
            {/* REPLACE THE URL BELOW WITH YOUR ACTUAL VIDEO LINK */}
            <source src="/our-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Quick exit option overlayed in case she needs to bypass it */}
          <button 
            onClick={() => {
              if (document.fullscreenElement) document.exitFullscreen();
              onNext();
            }}
            className="absolute bottom-6 right-6 z-50 text-white/40 hover:text-white text-xs tracking-widest uppercase transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            Skip Video ✕
          </button>
        </motion.div>
      )}
    </section>
  );
};
