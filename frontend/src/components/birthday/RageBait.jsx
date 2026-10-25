import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, AlertTriangle } from "lucide-react";
import config from "@/config";
import { SectionTitle, Portal } from "./SectionWrapper";
import { useRunaway } from "./useRunaway";

const t = config.text.rage;
const card = "relative rounded-3xl border border-white bg-white/80 p-5 shadow-soft backdrop-blur";
const pill = "rounded-full px-5 py-2.5 font-heading text-base font-medium shadow-pop";

const YoungAgain = ({ bait }) => {
  const { pos, done, dodge } = useRunaway({ x: 50, y: 50 }, 6);
  const [said, setSaid] = useState(false);
  const click = () => { if (done && !said) { setSaid(true); bait(); } };
  return (
    <div className={`${card} h-40 overflow-hidden`}>
      <motion.button
        data-testid="rage-young-button"
        onPointerEnter={dodge}
        onPointerDown={dodge}
        onClick={click}
        animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{ x: "-50%", y: "-50%" }}
        className={`${pill} absolute whitespace-nowrap ${said ? "bg-lilac-400 text-white" : "bg-blush-300 text-plum"}`}
      >
        {said ? t.young.final : t.young.button}
      </motion.button>
    </div>
  );
};

const SeeAge = ({ bait }) => {
  const [state, setState] = useState("idle");
  const go = () => {
    if (state === "loading") return;
    setState("loading");
    bait();
    setTimeout(() => setState("error"), 4000);
  };
  return (
    <div className={`${card} flex h-40 flex-col items-center justify-center gap-3`}>
      <button data-testid="rage-age-button" onClick={go} className={`${pill} bg-lilac-300 text-plum`}>{t.age.button}</button>
      {state === "loading" && (
        <p data-testid="rage-age-loading" className="flex items-center gap-2 font-body font-semibold text-plum-soft">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-blush-400 border-t-transparent" />
          {t.age.loading}<span className="dots" />
        </p>
      )}
      {state === "error" && <motion.p data-testid="rage-age-error" initial={{ x: -8 }} animate={{ x: [8, -6, 4, 0] }} className="font-mono text-sm font-bold text-blush-500">{t.age.error}</motion.p>}
    </div>
  );
};

const Sibling = ({ bait }) => {
  const { pos, dodges, done, dodge } = useRunaway({ x: 70, y: 70 }, 5);
  const [answered, setAnswered] = useState(false);
  const yes = () => { if (!answered) { setAnswered(true); bait(); } };
  return (
    <div className={`${card} h-56 overflow-hidden sm:col-span-2`}>
      <p className="text-center font-heading text-xl font-medium text-plum">{t.sibling.question}</p>
      {answered ? (
        <motion.p data-testid="rage-sibling-answer" initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="mt-10 text-center font-heading text-2xl text-blush-500">{t.sibling.answer}</motion.p>
      ) : (
        <>
          <motion.button data-testid="rage-sibling-yes" onClick={yes} style={{ x: "-50%", y: "-50%" }} animate={{ scale: 1 + dodges * 0.16 }} className={`${pill} absolute left-[28%] top-[62%] bg-blush-500 text-white`}>{t.sibling.yes}</motion.button>
          {!done && (
            <motion.button
              data-testid="rage-sibling-no"
              onPointerEnter={dodge}
              onPointerDown={dodge}
              animate={{ left: `${pos.x}%`, top: `${pos.y}%`, scale: 1 - dodges * 0.17 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              style={{ x: "-50%", y: "-50%" }}
        className={`${pill} absolute bg-lilac-200 text-plum`}
            >
              {t.sibling.no}
            </motion.button>
          )}
        </>
      )}
    </div>
  );
};

const ClaimGift = ({ bait }) => {
  const [state, setState] = useState("idle");
  const go = () => {
    if (state !== "idle") return;
    setState("loading");
    bait();
    setTimeout(() => setState("done"), 5000);
  };
  return (
    <div className={`${card} flex h-40 flex-col items-center justify-center gap-3`}>
      {state === "idle" && <button data-testid="rage-gift-button" onClick={go} className={`${pill} bg-butter text-plum`}>{t.gift.button}</button>}
      {state === "loading" && (
        <div className="w-full">
          <div className="h-4 w-full overflow-hidden rounded-full bg-lilac-100">
            <motion.div initial={{ width: "0%" }} animate={{ width: "99%" }} transition={{ duration: 2.2, ease: "easeOut" }} className="h-full rounded-full bg-blush-400" />
          </div>
          <p data-testid="rage-gift-progress" className="mt-2 text-center font-heading text-lg text-plum">99%</p>
        </div>
      )}
      {state === "done" && <motion.p data-testid="rage-gift-final" initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="text-center font-heading text-xl text-blush-500">{t.gift.final}</motion.p>}
    </div>
  );
};

const DoNotPress = ({ bait }) => {
  const [stage, setStage] = useState(null);
  const press = () => {
    setStage("playing");
    bait();
    setTimeout(() => setStage("kidding"), 2500);
  };
  return (
    <div className={`${card} flex h-40 items-center justify-center`}>
      <motion.button data-testid="rage-danger-button" onClick={press} whileTap={{ scale: 0.9 }} animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="rounded-full bg-red-500 px-8 py-4 font-heading text-lg font-semibold text-white shadow-[0_6px_0_0_#b91c1c]">
        {t.danger.button}
      </motion.button>
      <Portal><AnimatePresence>
        {stage && (
          <motion.div data-testid="rage-danger-alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-plum/30 px-6 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.7, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-xs rounded-2xl bg-white p-6 text-center shadow-soft">
              <AlertTriangle className="mx-auto h-9 w-9 text-red-500" />
              <p className="mt-2 font-heading text-lg font-semibold text-plum">{t.danger.alertTitle}</p>
              {stage === "playing" ? (
                <>
                  <p className="mt-1 font-body font-semibold text-plum-soft">{t.danger.alert}</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-lilac-100"><motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.4 }} className="h-full bg-red-400" /></div>
                </>
              ) : (
                <>
                  <p data-testid="rage-danger-kidding" className="mt-1 font-heading text-2xl text-blush-500">{t.danger.kidding}</p>
                  <button data-testid="rage-danger-ok" onClick={() => setStage(null)} className={`${pill} mt-4 bg-lilac-300 text-plum`}>{t.danger.ok}</button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence></Portal>
    </div>
  );
};

const Stars = () => {
  const [open, setOpen] = useState(null);
  const [seen, setSeen] = useState([]);
  const tap = (i) => { setOpen(i); setSeen((s) => (s.includes(i) ? s : [...s, i])); };
  return (
    <div className={`${card} sm:col-span-2`}>
      <p className="text-center font-heading text-xl font-medium text-plum">{t.starsTitle}</p>
      <div className="mt-4 flex justify-center gap-5">
        {t.stars.map((_, i) => (
          <motion.button key={i} data-testid={`heart-star-${i}`} onClick={() => tap(i)} whileTap={{ scale: 1.4, rotate: 30 }} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }} aria-label="star">
            <Star className={`h-10 w-10 ${seen.includes(i) ? "text-blush-400" : "text-butter"}`} fill="currentColor" strokeWidth={1.2} />
          </motion.button>
        ))}
      </div>
      <div className="relative mt-4 flex min-h-[56px] items-center justify-center">
        <AnimatePresence mode="wait">
          {open !== null && (
            <motion.div key={open} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative text-center">
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <motion.span key={k} initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }} animate={{ opacity: 0, x: Math.cos(k) * 70, y: -30 - (k % 3) * 18, scale: 1.2 }} transition={{ duration: 1 }} className="absolute left-1/2 top-0 text-blush-400">
                  <Heart className="h-4 w-4" fill="currentColor" />
                </motion.span>
              ))}
              <p data-testid="heart-star-line" className="font-hand text-3xl text-plum">{t.stars[open]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function RageBait() {
  const [count, setCount] = useState(0);
  const bait = () => setCount((c) => c + 1);
  return (
    <div className="w-full">
      <SectionTitle title={t.title} subtitle={t.subtitle} />
      <motion.div data-testid="rage-counter" key={count} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="mx-auto mb-6 w-fit rounded-full bg-lilac-200 px-5 py-2 font-heading text-base text-plum shadow-soft">
        {t.counter} <span className="font-semibold text-blush-500">{count}</span>
      </motion.div>
      <div className="grid gap-4 sm:grid-cols-2">
        <YoungAgain bait={bait} />
        <SeeAge bait={bait} />
        <Sibling bait={bait} />
        <ClaimGift bait={bait} />
        <DoNotPress bait={bait} />
        <Stars />
      </div>
    </div>
  );
}
