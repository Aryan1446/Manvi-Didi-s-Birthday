import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import config from "@/config";
import { bigCelebration } from "@/lib/fx";
import { Countdown, useBirthdayCountdown } from "./Countdown";

const t = config.text.landing;

export default function Landing({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const left = useBirthdayCountdown();
  const locked = left > 0;
  const wasLocked = useRef(locked);
  const [justUnlocked, setJustUnlocked] = useState(false);

  useEffect(() => {
    if (wasLocked.current && !locked) {
      setJustUnlocked(true);
      bigCelebration();
    }
    wasLocked.current = locked;
  }, [locked]);

  const open = () => {
    if (opening || locked) return;
    setOpening(true);
    bigCelebration();
    onOpen();
  };

  return (
    <div className="flex flex-col items-center text-center">
      <motion.button
        data-testid="gift-box"
        onClick={open}
        aria-label={t.button}
        animate={opening ? { scale: 1.1 } : { rotate: [0, -7, 7, -5, 5, 0] }}
        transition={opening ? { duration: 0.3 } : { duration: 0.9, repeat: Infinity, repeatDelay: 1.2 }}
        className="relative mb-10 h-44 w-44 sm:h-52 sm:w-52"
      >
        <motion.div
          animate={opening ? { y: -120, rotate: -25, opacity: 0 } : { y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute left-[-6%] top-[14%] z-20 h-[24%] w-[112%] rounded-2xl bg-blush-400 shadow-soft"
        >
          <span className="absolute left-1/2 top-0 h-full w-[18%] -translate-x-1/2 bg-lilac-300" />
          <span className="absolute -top-9 left-1/2 flex -translate-x-1/2 gap-1">
            <span className="h-9 w-12 -rotate-12 rounded-full border-[7px] border-lilac-300" />
            <span className="h-9 w-12 rotate-12 rounded-full border-[7px] border-lilac-300" />
          </span>
        </motion.div>
        <div className="absolute bottom-0 left-0 h-[64%] w-full overflow-hidden rounded-3xl bg-blush-300 shadow-soft">
          <span className="absolute left-1/2 top-0 h-full w-[18%] -translate-x-1/2 bg-lilac-300" />
          <span className="absolute left-[12%] top-[30%] text-2xl text-white/80">✦</span>
          <span className="absolute bottom-[18%] right-[12%] text-xl text-white/80">♥</span>
        </div>
      </motion.button>

      <p className="font-hand text-3xl text-blush-500">{t.line1}</p>
      <h1 data-testid="landing-title" className="mt-1 max-w-md font-heading text-4xl font-semibold leading-tight text-plum sm:text-5xl lg:text-6xl">
        {t.line2}
      </h1>

      {locked ? <Countdown ms={left} /> : (
      <>
      {justUnlocked && <motion.p data-testid="gift-unlocked-text" initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="mt-6 font-hand text-3xl text-blush-500">{t.unlocked}</motion.p>}
      <motion.button
        data-testid="open-gift-button"
        onClick={open}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ y: { repeat: Infinity, duration: 1.6 } }}
        className="mt-10 rounded-full bg-blush-500 px-10 py-4 font-heading text-xl font-medium text-white shadow-pop"
      >
        {t.button}
      </motion.button>
      <p className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-plum-soft">{t.hint}</p>
      </>
      )}
    </div>
  );
}
