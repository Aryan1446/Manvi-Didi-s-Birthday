import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Heart, Star, Sparkles, Play, Pause } from "lucide-react";
import config from "@/config";

export const ProgressDots = ({ total, current }) => (
  <div data-testid="progress-dots" className="fixed left-1/2 top-4 z-40 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/70 px-3 py-2 shadow-soft backdrop-blur-md">
    {Array.from({ length: total }).map((_, i) => (
      <motion.span
        key={i}
        data-testid={`progress-dot-${i}`}
        animate={{ width: i === current ? 22 : 8, opacity: i <= current ? 1 : 0.45 }}
        className={`h-2 rounded-full ${i <= current ? "bg-blush-400" : "bg-lilac-300"}`}
      />
    ))}
  </div>
);

export const NextButton = ({ onClick }) => (
  <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
  <motion.button
    data-testid="next-section-button"
    onClick={onClick}
    initial={{ y: 40, opacity: 0 }}
    animate={{ y: 0, opacity: 1, transition: { delay: 0.6, type: "spring" } }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.92 }}
    className="flex items-center gap-1 rounded-full bg-blush-500 px-7 py-3.5 font-heading text-lg font-medium text-white shadow-pop"
  >
    {config.text.nav.next} <ChevronRight className="h-5 w-5" />
  </motion.button>
  </div>
);

export const MusicButton = ({ playing, onToggle }) => {
  const [showTitle, setShowTitle] = useState(true);
  useEffect(() => {
    if (!playing) return;
    setShowTitle(true);
    const t = setTimeout(() => setShowTitle(false), 4000);
    return () => clearTimeout(t);
  }, [playing]);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex items-center gap-2">
      <AnimatePresence>
        {showTitle && playing && (
          <motion.span
            data-testid="song-title"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="hidden rounded-full bg-white/85 px-3 py-1.5 font-body text-xs font-semibold text-plum shadow-soft backdrop-blur sm:block"
          >
            ♪ {config.song.title}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.button
        data-testid="music-toggle-button"
        aria-label={config.text.nav.music}
        title={config.song.title}
        onClick={onToggle}
        whileTap={{ scale: 0.88 }}
        className="relative h-14 w-14 rounded-full shadow-soft"
      >
        <span className={`vinyl absolute inset-0 rounded-full ${playing ? "vinyl-spin" : ""}`}>
          <span className="absolute inset-[34%] rounded-full bg-blush-300" />
          <span className="absolute inset-[46%] rounded-full bg-cream" />
        </span>
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-lilac-400 text-white shadow">
          {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </span>
      </motion.button>
    </div>
  );
};

const FLOATERS = Array.from({ length: 14 }).map((_, i) => ({
  Icon: [Heart, Star, Sparkles][i % 3],
  left: (i * 37) % 100,
  size: 14 + ((i * 7) % 18),
  delay: (i * 1.3) % 12,
  dur: 14 + ((i * 5) % 10),
  color: ["text-blush-300", "text-lilac-300", "text-butter"][i % 3],
}));

export const FloatingBg = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blush-200/60 blur-3xl" />
    <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-lilac-200/60 blur-3xl" />
    <div className="grain absolute inset-0" />
    {FLOATERS.map(({ Icon, left, size, delay, dur, color }, i) => (
      <Icon
        key={i}
        className={`floater absolute ${color}`}
        style={{ left: `${left}%`, width: size, height: size, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
        fill="currentColor"
      />
    ))}
  </div>
);

export const TapSparkles = () => {
  const [bursts, setBursts] = useState([]);
  useEffect(() => {
    const onDown = (e) => {
      const id = Date.now() + Math.random();
      setBursts((b) => [...b.slice(-6), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 900);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      {bursts.map((b) =>
        Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <motion.span
              key={`${b.id}-${i}`}
              initial={{ x: b.x - 6, y: b.y - 10, opacity: 1, scale: 0.4 }}
              animate={{ x: b.x - 6 + Math.cos(a) * 40, y: b.y - 10 + Math.sin(a) * 40 - 12, opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`absolute left-0 top-0 text-base ${i % 2 ? "text-lilac-400" : "text-blush-400"}`}
            >
              {i % 2 ? "✦" : "♥"}
            </motion.span>
          );
        })
      )}
    </div>
  );
};
