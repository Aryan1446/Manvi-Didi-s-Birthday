import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import config from "@/config";
import { SectionTitle, Portal } from "./SectionWrapper";

const t = config.text.gallery;
const photos = config.photos;
const ROT = [-4, 3, -2, 5, -3, 2, -5, 4];
const TAPE = ["bg-lilac-200/80", "bg-blush-200/80", "bg-butter/80"];

const Polaroid = ({ p, i, onOpen }) => {
  const controls = useAnimationControls();
  const r = ROT[i % ROT.length];
  const tap = () => {
    controls.start({ rotate: [r, -8, 8, -4, r], transition: { duration: 0.4 } });
    setTimeout(() => onOpen(i), 380);
  };
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
      <motion.button
        data-testid={`polaroid-${i}`}
        onClick={tap}
        initial={{ rotate: r }}
        animate={controls}
        whileHover={{ scale: 1.04 }}
        className="relative w-full bg-white p-2.5 pb-3 text-left shadow-soft"
      >
        <span className={`absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-4deg] ${TAPE[i % 3]}`} />
        <img src={p.src} alt={p.caption} loading="lazy" decoding="async" className="aspect-square w-full bg-blush-100 object-cover" />
        <p className="mt-2 truncate text-center font-hand text-xl text-plum">{p.caption}</p>
      </motion.button>
    </motion.div>
  );
};

const Lightbox = ({ index, setIndex }) => {
  const [dir, setDir] = useState(1);
  const go = useCallback((d) => { setDir(d); setIndex((i) => (i + d + photos.length) % photos.length); }, [setIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, setIndex]);

  const p = photos[index];
  const arrow = "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-plum shadow-soft";

  return (
    <motion.div data-testid="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIndex(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-plum/50 px-4 backdrop-blur-md">
      <button data-testid="lightbox-close-button" aria-label={t.close} onClick={() => setIndex(null)} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-plum shadow-soft"><X className="h-5 w-5" /></button>
      <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <button data-testid="lightbox-prev-button" aria-label={t.prev} onClick={() => go(-1)} className={`${arrow} -left-2 sm:-left-16`}><ChevronLeft /></button>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => { if (info.offset.x < -70) go(1); else if (info.offset.x > 70) go(-1); }}
            initial={{ x: dir * 120, opacity: 0, rotate: dir * 6 }}
            animate={{ x: 0, opacity: 1, rotate: index % 2 ? 1.5 : -1.5 }}
            exit={{ x: dir * -120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="cursor-grab touch-pan-y bg-white p-3 pb-5 shadow-soft active:cursor-grabbing"
          >
            <img src={p.src} alt={p.caption} draggable={false} className="aspect-square w-full bg-blush-100 object-cover" />
            <p data-testid="lightbox-caption" className="mt-3 text-center font-hand text-3xl text-plum">{p.caption}</p>
            <p className="text-center font-body text-xs font-semibold text-plum-soft">{index + 1} / {photos.length}</p>
          </motion.div>
        </AnimatePresence>
        <button data-testid="lightbox-next-button" aria-label={t.next} onClick={() => go(1)} className={`${arrow} -right-2 sm:-right-16`}><ChevronRight /></button>
      </div>
    </motion.div>
  );
};

export default function Gallery() {
  const [index, setIndex] = useState(null);
  return (
    <div className="w-full">
      <SectionTitle title={t.title} subtitle={t.subtitle} />
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        {photos.map((p, i) => <Polaroid key={i} p={p} i={i} onOpen={setIndex} />)}
      </div>
      <Portal><AnimatePresence>{index !== null && <Lightbox index={index} setIndex={setIndex} />}</AnimatePresence></Portal>
    </div>
  );
}
