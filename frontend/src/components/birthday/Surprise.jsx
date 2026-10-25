import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import config from "@/config";
import { bigCelebration } from "@/lib/fx";
import { SectionTitle } from "./SectionWrapper";

const t = config.text.surprise;

const paintCover = (canvas) => {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const g = ctx.createLinearGradient(0, 0, width, height);
  g.addColorStop(0, "#CDB6F3");
  g.addColorStop(1, "#F7B6CB");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  for (let i = 0; i < 40; i++) ctx.fillText("✦", (i * 53) % width, (i * 97) % height);
  ctx.fillStyle = "#5B3A55";
  ctx.font = "600 30px Fredoka, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(t.cover, width / 2, height / 2);
  return ctx;
};

export default function Surprise() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const moves = useRef(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => { ctxRef.current = paintCover(canvasRef.current); }, []);

  const checkCleared = () => {
    const c = canvasRef.current;
    const data = ctxRef.current.getImageData(0, 0, c.width, c.height).data;
    let clear = 0, total = 0;
    for (let i = 3; i < data.length; i += 160) { total++; if (data[i] === 0) clear++; }
    if (clear / total > 0.5) {
      setRevealed(true);
      bigCelebration();
    }
  };

  const scratch = (e) => {
    if (revealed || (e.buttons === 0 && e.pointerType === "mouse")) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = ctxRef.current;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 24, 0, Math.PI * 2);
    ctx.fill();
    if (++moves.current % 12 === 0) checkCleared();
  };

  return (
    <div className="flex w-full flex-col items-center">
      <SectionTitle title={t.title} subtitle={!revealed ? t.hint : null} />
      <div className="rounded-[2rem] bg-white p-3 shadow-soft">
        <div data-testid="scratch-card" className="relative aspect-square w-[78vw] max-w-sm overflow-hidden rounded-3xl">
          <img data-testid="surprise-image" src={config.surprise.src} alt={config.surprise.caption} className="h-full w-full object-cover" />
          <motion.canvas
            ref={canvasRef}
            data-testid="scratch-canvas"
            onPointerDown={scratch}
            onPointerMove={scratch}
            animate={{ opacity: revealed ? 0 : 1 }}
            transition={{ duration: 0.6 }}
            className={`absolute inset-0 h-full w-full touch-none ${revealed ? "pointer-events-none" : "cursor-crosshair"}`}
          />
        </div>
      </div>
      {revealed && (
        <motion.p data-testid="surprise-caption" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-6 text-center font-hand text-4xl text-plum">
          {config.surprise.caption}
        </motion.p>
      )}
    </div>
  );
}
