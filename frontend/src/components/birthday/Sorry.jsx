import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import config from "@/config";
import { bigCelebration } from "@/lib/fx";
import { useRunaway } from "./useRunaway";
import { Portal } from "./SectionWrapper";

const t = config.text.sorry;
const HEARTS = Array.from({ length: 28 }).map((_, i) => ({ left: (i * 41) % 100, delay: (i % 10) * 0.35, size: 16 + (i % 4) * 8, dur: 3 + (i % 5) * 0.6 }));

const HeartRain = () => (
  <div aria-hidden data-testid="heart-rain" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
    {HEARTS.map((h, i) => (
      <motion.span key={i} className={`absolute -top-10 ${i % 2 ? "text-blush-400" : "text-lilac-400"}`} style={{ left: `${h.left}%` }} animate={{ y: ["0vh", "110vh"], rotate: [0, i % 2 ? 40 : -40] }} transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: "linear" }}>
        <Heart style={{ width: h.size, height: h.size }} fill="currentColor" />
      </motion.span>
    ))}
  </div>
);

export default function Sorry({ onRestart }) {
  const [forgiven, setForgiven] = useState(false);
  const { pos, dodges, done, dodge } = useRunaway({ x: 70, y: 50 }, 6);

  const forgive = () => {
    if (forgiven) return;
    setForgiven(true);
    bigCelebration();
  };

  return (
    <div className="flex w-full flex-col items-center text-center">
      {forgiven && <Portal><HeartRain /></Portal>}
      <motion.div animate={{ rotate: [-6, 6, -6], y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }} className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-blush-200 shadow-soft">
        <span className="text-7xl" role="img" aria-label="teddy">{t.emoji}</span>
        <Heart className="absolute -right-1 top-3 h-8 w-8 text-blush-500" fill="currentColor" />
      </motion.div>
      <h2 className="font-heading text-3xl font-semibold text-plum sm:text-4xl">{t.line1}</h2>
      <p data-testid="sorry-confession" className="mt-3 max-w-md font-body text-lg font-semibold text-plum-soft md:text-xl">{t.line2}</p>

      {forgiven ? (
        <motion.p data-testid="sorry-thanks" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.6 } }} className="relative z-40 mt-10 font-heading text-4xl font-semibold text-blush-500 sm:text-5xl">
          {t.thanks}
        </motion.p>
      ) : null}
      {forgiven ? (
        <motion.button
          data-testid="sorry-replay-button"
          onClick={onRestart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.8 } }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="relative z-40 mt-8 flex items-center gap-2 rounded-full bg-lilac-400 px-8 py-4 font-heading text-xl text-white shadow-pop"
        >
          <RotateCcw className="h-5 w-5" /> {t.replay}
        </motion.button>
      ) : (
        <div className="relative mt-8 h-44 w-full max-w-md">
          <motion.button data-testid="sorry-forgive-button" onClick={forgive} whileTap={{ scale: 0.9 }} style={{ x: "-50%", y: "-50%" }} animate={{ scale: 1 + dodges * 0.08 }} className="absolute left-[30%] top-1/2 rounded-full bg-blush-500 px-8 py-4 font-heading text-xl text-white shadow-pop">
            {t.forgive}
          </motion.button>
          {!done && (
            <motion.button
              data-testid="sorry-no-button"
              onPointerEnter={dodge}
              onPointerDown={dodge}
              animate={{ left: `${pos.x}%`, top: `${pos.y}%`, scale: 1 - dodges * 0.14 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              style={{ x: "-50%", y: "-50%" }}
              className="absolute rounded-full bg-lilac-200 px-6 py-3 font-heading text-lg text-plum shadow-pop"
            >
              {t.no}
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}
