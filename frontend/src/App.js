import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "@/App.css";
import config from "@/config";
import { SectionWrapper } from "@/components/birthday/SectionWrapper";
import { ProgressDots, NextButton, MusicButton, FloatingBg, TapSparkles } from "@/components/birthday/Chrome";
import Landing from "@/components/birthday/Landing";
import Welcome from "@/components/birthday/Welcome";
import Cake from "@/components/birthday/Cake";
import Gallery from "@/components/birthday/Gallery";
import Note from "@/components/birthday/Note";
import RageBait from "@/components/birthday/RageBait";
import Surprise from "@/components/birthday/Surprise";
import Sorry from "@/components/birthday/Sorry";

const SECTIONS = [
  ["landing", Landing], ["welcome", Welcome], ["cake", Cake], ["gallery", Gallery],
  ["note", Note], ["rage", RageBait], ["surprise", Surprise], ["sorry", Sorry],
];

export default function App() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = new Audio(config.song.src);
    a.loop = true;
    a.addEventListener("play", () => setPlaying(true));
    a.addEventListener("pause", () => setPlaying(false));
    audioRef.current = a;
    return () => a.pause();
  }, []);

  const toggleMusic = () => {
    const a = audioRef.current;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  const open = () => {
    audioRef.current.play().catch(() => {});
    setTimeout(() => setStep(1), 1100);
  };

  const restart = () => {
    const a = audioRef.current;
    a.pause();
    a.currentTime = 0;
    setStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = () => {
    setStep((s) => Math.min(s + 1, SECTIONS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [key, Comp] = SECTIONS[step];

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-cream font-body text-plum">
      <FloatingBg />
      <TapSparkles />
      <ProgressDots total={SECTIONS.length} current={step} />
      <AnimatePresence mode="wait">
        <SectionWrapper key={key} testId={`section-${key}`}>
          <Comp onOpen={open} onRestart={restart} />
        </SectionWrapper>
      </AnimatePresence>
      {step > 0 && step < SECTIONS.length - 1 && <NextButton onClick={next} />}
      {step > 0 && <MusicButton playing={playing} onToggle={toggleMusic} />}
    </div>
  );
}
