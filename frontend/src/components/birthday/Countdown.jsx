import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import config from "@/config";

const { year, month, day, hour = 0 } = config.birthday;
const UNLOCK_AT = new Date(year, month - 1, day, hour, 0, 0).getTime();
const PREVIEW = new URLSearchParams(window.location.search).has("preview");

// Returns ms remaining until the birthday (0 once unlocked).
export const useBirthdayCountdown = () => {
  const calc = () => (PREVIEW ? 0 : Math.max(0, UNLOCK_AT - Date.now()));
  const [left, setLeft] = useState(calc);
  useEffect(() => {
    if (left === 0) return;
    const id = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [left === 0]); // eslint-disable-line react-hooks/exhaustive-deps
  return left;
};

const t = config.text.landing;

export const Countdown = ({ ms }) => {
  const s = Math.floor(ms / 1000);
  const parts = [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
  return (
    <div data-testid="birthday-countdown" className="mt-8 flex flex-col items-center">
      <p className="flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.16em] text-plum-soft">
        <Lock className="h-4 w-4" /> {t.lockedLine}
      </p>
      <div className="mt-4 flex gap-2.5 sm:gap-3">
        {parts.map((v, i) => (
          <div key={t.units[i]} className="flex w-[4.4rem] flex-col items-center rounded-2xl border border-white bg-white/80 py-3 shadow-soft backdrop-blur sm:w-20">
            <motion.span key={v} data-testid={`countdown-${t.units[i]}`} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-heading text-3xl font-semibold text-blush-500">
              {String(v).padStart(2, "0")}
            </motion.span>
            <span className="font-body text-xs font-semibold text-plum-soft">{t.units[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
