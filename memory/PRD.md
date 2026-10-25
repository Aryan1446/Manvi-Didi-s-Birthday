# PRD — Manvi Didi Birthday Site
Original ask: cute, mobile-first, frontend-only (React + Tailwind + Framer Motion + canvas-confetti) single-page birthday flow for "Manvi Didi" with placeholder mode; all content in src/config.js.
## Implemented (2026-10-25)
- 8 sections via one SectionWrapper (spring fade/slide): Landing gift (confetti + music start), Welcome typewriter, Cake (mic blow via Web Audio + tap fallback, smoke, popup, relight twist), Polaroid gallery + swipe/arrow/keyboard lightbox (lazy images), Envelope note (Caveat, rising hearts), Rage-bait corner (runaway 21 btn, endless age loader, sibling Yes/No, 99% gift, Do NOT press alert, counter, heart stars), Scratch-card surprise, Sorry page (runaway No, heart rain).
- Global: dot progress, Next button, spinning vinyl music toggle, tap sparkles, floating hearts/stars.
- Placeholders: public/assets/song.mp3 (silent), photos/photo1-8.jpg, surprise.jpg.
- (2026-10-25) "Watch it again" replay button on Sorry page after forgiving: stops/rewinds music and returns to Landing.
- (2026-10-25) Birthday countdown on Landing: gift locked until 27 Oct 2026 00:00 (device local time), set in config.birthday; auto-unlocks with confetti + "It's time!"; `?preview` URL param bypasses the lock for testing.
## Backlog
- User to replace song/photos/note/name in config.js
