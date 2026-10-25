// ============================================================
//  ALL personal content for the birthday site lives here.
//  Edit this file only — every component reads from it.
//  Look for "REPLACE ME" comments.
// ============================================================

const config = {
  // REPLACE ME: her name as you want it shown everywhere
  name: "Manvi Didi",

  // REPLACE ME: drop your song at /public/assets/song.mp3 (or change the path)
  song: {
    src: "/assets/song.mp3",
    title: "Song Title - Artist", // REPLACE ME
  },

  // REPLACE ME: put photos in /public/assets/photos/ — add or remove items freely
  photos: [
    { src: "/assets/photos/photo1.jpg", caption: "Caption goes here" },
    { src: "/assets/photos/photo2.jpg", caption: "Caption goes here" },
    { src: "/assets/photos/photo3.jpg", caption: "Caption goes here" },
    { src: "/assets/photos/photo4.jpg", caption: "Caption goes here" },
    { src: "/assets/photos/photo5.jpg", caption: "Caption goes here" },
    { src: "/assets/photos/photo6.jpg", caption: "Caption goes here" },
    { src: "/assets/photos/photo7.jpg", caption: "Caption goes here" },
    { src: "/assets/photos/photo8.jpg", caption: "Caption goes here" },
  ],

  // REPLACE ME: surprise picture + caption
  surprise: {
    src: "/assets/surprise.jpg",
    caption: "Surprise caption goes here",
  },

  // REPLACE ME: your personal note (use \n\n for new paragraphs)
  note: {
    text: "Dear Didi, [my personal note goes here]",
    signature: "- [Your Name]", // REPLACE ME: your name
  },

  // REPLACE ME: number of candles on the cake
  candleCount: 5,

  // ---------------- Every text string on the site ----------------
  text: {
    nav: { next: "Next", music: "Toggle music" },

    landing: {
      line1: "Psst...",
      line2: "Manvi Didi, this is for YOU", // REPLACE ME
      button: "Open it",
      hint: "turn your sound on",
    },

    welcome: {
      typed: "Happy Birthday, Manvi Didi!", // REPLACE ME
      typedSub: "(Yes, you're getting older. Sorry.)",
    },

    cake: {
      title: "Make a wish & blow!",
      micButton: "Blow into the mic",
      micListening: "Listening... blow hard!",
      micDenied: "No mic? No problem.",
      tapButton: "Tap to blow",
      tapSmall: "or tap to blow",
      popupTitle: "Happy Birthday!",
      popupSub: "All wishes sent to the universe.",
      relight: "Nice try. Make another wish",
      done: "Okay okay, that one counts. Wish granted!",
    },

    gallery: {
      title: "Little moments",
      subtitle: "tap a polaroid",
      prev: "Previous photo",
      next: "Next photo",
      close: "Close",
    },

    note: {
      title: "A little letter",
      tapHint: "tap the envelope",
    },

    rage: {
      title: "Don't click this",
      subtitle: "(you're going to anyway)",
      counter: "Times you got rage-baited:",
      young: { button: "Click if you're 21 again", final: "Haha, you wish." },
      age: { button: "Click to see your age", loading: "Loading", error: "Error: number too big" },
      sibling: { question: "Am I your favourite sibling?", yes: "Yes", no: "No", answer: "Correct answer. Obviously." },
      gift: { button: "Claim your gift", final: "Gift is my love. You're welcome." },
      danger: { button: "Do NOT press", alertTitle: "Uh oh...", alert: "Playing my very bad singing video...", kidding: "Just kidding", ok: "Phew" },
      starsTitle: "Tap the stars",
      // REPLACE ME: heartfelt lines hidden behind the stars
      stars: [
        "Thank you for always being there",
        "You're my forever best friend",
        "Every scolding was secretly love",
        "I'm so lucky you're my Didi",
      ],
    },

    surprise: {
      title: "Your special surprise",
      hint: "scratch the card",
      cover: "Scratch me!",
    },

    sorry: {
      emoji: "🧸",
      line1: "Didi... one small confession.",
      line2: "I used your photos without asking permission.",
      forgive: "Forgive me",
      no: "No",
      thanks: "Thank you, Didi! Love you loads.",
    },
  },
};

export default config;
