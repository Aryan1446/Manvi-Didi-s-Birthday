import { useState } from "react";

// Moves an absolutely-positioned element to random % positions inside its container.
export const useRunaway = (start = { x: 50, y: 50 }, maxDodges = 5) => {
  const [pos, setPos] = useState(start);
  const [dodges, setDodges] = useState(0);
  const done = dodges >= maxDodges;

  const dodge = (e) => {
    if (done) return false;
    if (e?.preventDefault && e.pointerType === "touch") e.preventDefault();
    setPos((p) => {
      let x, y;
      do {
        x = 12 + Math.random() * 76;
        y = 15 + Math.random() * 70;
      } while (Math.abs(x - p.x) < 20 && Math.abs(y - p.y) < 20);
      return { x, y };
    });
    setDodges((d) => d + 1);
    return true;
  };

  return { pos, dodges, done, dodge };
};
