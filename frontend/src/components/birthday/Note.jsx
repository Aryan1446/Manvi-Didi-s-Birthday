import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import config from "@/config";
import { SectionTitle } from "./SectionWrapper";

const t = config.text.note;

const Envelope = ({ onOpen, opening }) => (
  <motion.button
    data-testid="envelope"
    onClick={onOpen}
    animate={opening ? { y: 40, opacity: 0, transition: { delay: 0.6 } } : { rotate: [0, -2, 2, 0] }}
    transition={opening ? {} : { repeat: Infinity, duration: 2.4 }}
    className="relative h-48 w-72 [perspective:800px] sm:h-56 sm:w-80"
  >
    <div className="absolute inset-0 rounded-2xl bg-blush-300 shadow-soft" />
    <div className="env-pocket absolute inset-0 rounded-2xl bg-blush-200" />
    <motion.div
      animate={{ rotateX: opening ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ transformOrigin: "top" }}
      className="env-flap absolute inset-x-0 top-0 h-[58%] bg-blush-400"
    />
    {!opening && (
      <span className="absolute left-1/2 top-[52%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lilac-400 shadow-soft">
        <Heart className="h-5 w-5 text-white" fill="currentColor" />
      </span>
    )}
  </motion.button>
);

const RisingHearts = () => (
  <span aria-hidden className="pointer-events-none absolute -top-2 right-0 h-16 w-16">
    {[0, 1, 2, 3].map((i) => (
      <motion.span
        key={i}
        className="absolute bottom-0 text-blush-400"
        style={{ left: i * 12 }}
        animate={{ y: [0, -50], opacity: [0, 1, 0], scale: [0.6, 1.1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.5 }}
      >
        <Heart className="h-4 w-4" fill="currentColor" />
      </motion.span>
    ))}
  </span>
);

export default function Note() {
  const [opening, setOpening] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => setShowLetter(true), 900);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <SectionTitle title={t.title} subtitle={!showLetter ? t.tapHint : null} />
      <AnimatePresence mode="wait">
        {!showLetter ? (
          <motion.div key="env" exit={{ opacity: 0 }}><Envelope onOpen={open} opening={opening} /></motion.div>
        ) : (
          <motion.div
            key="letter"
            data-testid="note-letter"
            initial={{ y: 80, opacity: 0, rotate: -4, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, rotate: -1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.45 }}
            className="paper relative w-full max-w-md rounded-2xl bg-cream px-7 py-8 shadow-soft sm:px-10"
          >
            <p data-testid="note-text" className="whitespace-pre-line font-hand text-3xl leading-[1.35] text-plum">{config.note.text}</p>
            <p data-testid="note-signature" className="relative mt-8 inline-block w-full pr-16 text-right font-hand text-3xl font-bold text-blush-500">
              {config.note.signature}
              <RisingHearts />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
