import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Wind } from "lucide-react";
import config from "@/config";
import { bigCelebration, burst } from "@/lib/fx";
import { SectionTitle, Portal } from "./SectionWrapper";

const t = config.text.cake;
const N = Math.max(1, config.candleCount);
const candleColors = ["bg-lilac-300", "bg-blush-300", "bg-butter"];

const Candle = ({ lit, i }) => (
  <div data-testid={`candle-${i}`} data-lit={lit} className="relative flex flex-col items-center">
    <div className="relative h-8 w-4">
      <AnimatePresence>
        {lit ? (
          <motion.div key="flame" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0, opacity: 0 }} className="flame absolute bottom-0 left-1/2 h-7 w-4" />
        ) : (
          <motion.div key="smoke" className="absolute bottom-0 left-0">
            {[0, 1, 2].map((k) => (
              <motion.span key={k} initial={{ opacity: 0.7, y: 0, scale: 0.5 }} animate={{ opacity: 0, y: -50, x: (k - 1) * 10, scale: 1.6 }} transition={{ duration: 1.6, delay: k * 0.15 }} className="absolute h-4 w-4 rounded-full bg-plum-soft/30" />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <div className={`candle-stripes h-12 w-3.5 rounded-t-sm ${candleColors[i % 3]}`} />
  </div>
);

const CakeArt = ({ lit }) => (
  <div data-testid="cake" className="relative flex flex-col items-center">
    <div className="z-10 -mb-1 flex gap-3 sm:gap-4">
      {lit.map((l, i) => <Candle key={i} lit={l} i={i} />)}
    </div>
    <div className="relative h-16 w-56 rounded-t-3xl bg-cream shadow-soft sm:w-64">
      <div className="drips absolute inset-x-0 top-0 h-7 rounded-t-3xl bg-blush-300" />
      <div className="absolute inset-x-6 bottom-3 flex justify-between text-xs text-lilac-400"><span>●</span><span>●</span><span>●</span><span>●</span></div>
    </div>
    <div className="relative h-20 w-72 rounded-t-2xl bg-lilac-200 shadow-soft sm:w-80">
      <div className="drips absolute inset-x-0 top-0 h-6 bg-cream" />
      <div className="absolute inset-x-8 bottom-4 flex justify-between text-blush-400"><span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span></div>
    </div>
    <div className="h-4 w-80 rounded-full bg-white shadow-soft sm:w-96" />
  </div>
);

export default function Cake() {
  const [lit, setLit] = useState(() => Array(N).fill(true));
  const [phase, setPhase] = useState("wish"); // wish | popup | relit | done
  const [mic, setMic] = useState("idle"); // idle | listening | denied
  const phaseRef = useRef(phase);
  const lastBlow = useRef(0);
  const micRef = useRef(null);
  phaseRef.current = phase;

  const blowOne = useCallback(() => {
    if (!["wish", "relit"].includes(phaseRef.current)) return;
    setLit((prev) => {
      const on = prev.map((l, i) => (l ? i : -1)).filter((i) => i >= 0);
      if (!on.length) return prev;
      const next = [...prev];
      next[on[Math.floor(Math.random() * on.length)]] = false;
      return next;
    });
  }, []);

  useEffect(() => {
    if (lit.some(Boolean)) return;
    if (phase === "wish") {
      setPhase("popup");
      bigCelebration();
    }
    if (phase === "relit") {
      setPhase("done");
      burst({ particleCount: 150 });
    }
  }, [lit, phase]);

  useEffect(() => {
    if (phase !== "popup") return;
    const tm = setTimeout(() => {
      setLit((p) => p.map((_, i) => i === Math.floor(N / 2)));
      setPhase("relit");
    }, 3000);
    return () => clearTimeout(tm);
  }, [phase]);

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const data = new Uint8Array(analyser.fftSize);
      const loop = () => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += ((data[i] - 128) / 128) ** 2;
        const rms = Math.sqrt(sum / data.length);
        const now = performance.now();
        if (rms > 0.15 && now - lastBlow.current > 250) {
          lastBlow.current = now;
          blowOne();
        }
        micRef.current.raf = requestAnimationFrame(loop);
      };
      micRef.current = { stream, ctx };
      loop();
      setMic("listening");
    } catch {
      setMic("denied");
    }
  };

  useEffect(() => () => {
    const m = micRef.current;
    if (!m) return;
    cancelAnimationFrame(m.raf);
    m.stream.getTracks().forEach((tr) => tr.stop());
    m.ctx.close();
  }, []);

  const canBlow = phase === "wish" || phase === "relit";

  return (
    <div className="flex w-full flex-col items-center">
      <SectionTitle title={t.title} />
      <CakeArt lit={lit} />

      <div className="mt-10 flex min-h-[120px] flex-col items-center gap-3 text-center">
        <AnimatePresence mode="wait">
          {phase === "relit" && (
            <motion.p key="relit" data-testid="cake-relight-message" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1, rotate: [-3, 3, 0] }} className="font-heading text-2xl font-medium text-blush-500">{t.relight}</motion.p>
          )}
          {phase === "done" && (
            <motion.p key="done" data-testid="cake-done-message" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-heading text-2xl font-medium text-plum">{t.done}</motion.p>
          )}
        </AnimatePresence>

        {canBlow && mic === "idle" && (
          <>
            <motion.button data-testid="cake-mic-button" whileTap={{ scale: 0.92 }} onClick={startMic} className="flex items-center gap-2 rounded-full bg-lilac-400 px-7 py-3.5 font-heading text-lg text-white shadow-pop">
              <Mic className="h-5 w-5" /> {t.micButton}
            </motion.button>
            <button data-testid="cake-tap-small-button" onClick={blowOne} className="font-body text-sm font-semibold text-plum-soft underline decoration-blush-300 decoration-2 underline-offset-4">{t.tapSmall}</button>
          </>
        )}
        {canBlow && mic === "listening" && (
          <>
            <p data-testid="cake-mic-listening" className="flex items-center gap-2 font-body font-semibold text-lilac-500"><span className="h-2.5 w-2.5 animate-ping rounded-full bg-blush-400" />{t.micListening}</p>
            <button data-testid="cake-tap-small-button" onClick={blowOne} className="font-body text-sm font-semibold text-plum-soft underline decoration-blush-300 decoration-2 underline-offset-4">{t.tapSmall}</button>
          </>
        )}
        {canBlow && mic === "denied" && (
          <>
            <p className="font-body text-sm font-semibold text-plum-soft">{t.micDenied}</p>
            <motion.button data-testid="cake-tap-to-blow-button" whileTap={{ scale: 0.88 }} onClick={blowOne} className="flex items-center gap-3 rounded-full bg-blush-500 px-12 py-5 font-heading text-2xl text-white shadow-pop">
              <Wind className="h-7 w-7" /> {t.tapButton}
            </motion.button>
          </>
        )}
      </div>

      <Portal><AnimatePresence>
        {phase === "popup" && (
          <motion.div data-testid="cake-birthday-popup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-plum/30 px-6 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.4, rotate: -8 }} animate={{ scale: 1, rotate: 0, transition: { type: "spring", bounce: 0.6 } }} exit={{ scale: 0.6 }} className="rounded-[2rem] bg-cream px-10 py-10 text-center shadow-soft">
              <p className="font-heading text-5xl font-semibold text-blush-500 sm:text-6xl">{t.popupTitle}</p>
              <p className="mt-3 font-body font-semibold text-plum-soft">{t.popupSub}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence></Portal>
    </div>
  );
}
