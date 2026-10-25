import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export const SectionWrapper = ({ children, testId }) => (
  <motion.section
    data-testid={testId}
    initial={{ opacity: 0, y: 50, scale: 0.94 }}
    animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 140, damping: 14, mass: 0.9 } }}
    exit={{ opacity: 0, y: -40, scale: 0.97, transition: { duration: 0.28 } }}
    className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col items-center justify-center px-5 pb-32 pt-16"
  >
    {children}
  </motion.section>
);

export const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-8 text-center">
    <h2 className="font-heading text-4xl font-semibold text-plum sm:text-5xl">{title}</h2>
    {subtitle && <p className="mt-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-plum-soft">{subtitle}</p>}
  </div>
);

// Overlays render at <body> so the section's transform doesn't trap position: fixed.
export const Portal = ({ children }) => createPortal(children, document.body);
