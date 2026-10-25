import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import config from "@/config";
import { burst } from "@/lib/fx";

const { typed, typedSub } = config.text.welcome;
const full = typed + "\n" + typedSub;

export default function Welcome() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= full.length) {
      burst({ particleCount: 80 });
      return;
    }
    const t = setTimeout(() => setCount((c) => c + 1), count === typed.length ? 500 : 60);
    return () => clearTimeout(t);
  }, [count]);

  const shown = full.slice(0, count);
  const [main, sub = null] = shown.split("\n");
  const caret = <span className="caret ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 rounded bg-blush-400" />;

  return (
    <div className="text-center">
      <motion.div animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="mb-8 flex justify-center gap-3">
        {["bg-blush-300", "bg-lilac-300", "bg-butter"].map((c, i) => (
          <span key={c} className="flex flex-col items-center" style={{ marginTop: i === 1 ? -16 : 0 }}>
            <span className={`h-16 w-12 rounded-[50%] ${c} shadow-soft`} />
            <span className="h-10 w-px bg-plum-soft/50" />
          </span>
        ))}
      </motion.div>
      <h1 data-testid="welcome-typed-text" className="min-h-[2.4em] font-heading text-4xl font-semibold leading-tight text-plum sm:text-5xl lg:text-6xl">
        {main}
        {sub === null && caret}
      </h1>
      <p data-testid="welcome-typed-sub" className="mt-4 min-h-[1.6em] font-body text-lg font-semibold text-plum-soft md:text-xl">
        {sub}
        {sub !== null && caret}
      </p>
    </div>
  );
}
