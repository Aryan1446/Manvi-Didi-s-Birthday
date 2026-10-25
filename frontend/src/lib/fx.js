import confetti from "canvas-confetti";

const colors = ["#F7B6CB", "#CDB6F3", "#FFE7A8", "#EE8FAE", "#AE8FE6", "#FFFFFF"];

export const burst = (opts = {}) =>
  confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors, scalar: 0.9, ...opts });

export const bigCelebration = () => {
  burst({ particleCount: 160, spread: 120 });
  setTimeout(() => burst({ angle: 60, origin: { x: 0, y: 0.7 }, spread: 70 }), 200);
  setTimeout(() => burst({ angle: 120, origin: { x: 1, y: 0.7 }, spread: 70 }), 350);
};
