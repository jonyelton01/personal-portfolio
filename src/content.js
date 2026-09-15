/**
 * Fill this file in as we walk the structure.
 * Swap any TEMPLATE line with your real story.
 */

export const site = {
  name: "Jon Yelton",
  portrait: "/portrait.jpg",
  quoteLead: "We Belong.",
  quoteRest: "This truth unlocks the journey we were meant to enjoy.",
  linkedin: "https://www.linkedin.com/in/jon-yelton",
}

export const chapters = [
  { id: "intro", label: "Home", inNav: true },
  { id: "why", label: "Why me", inNav: true },
  { id: "moment", label: "Our moment", inNav: false },
  { id: "table", label: "The table", inNav: false },
  { id: "artifact", label: "The artifact", inNav: true },
]

export const nav = chapters.filter((item) => item.inNav)

export const why = {
  kicker: "01  ·  Live",
  title: "A Pastor And A Therapist Walk Into A Hospital...",
  lede: [
    "I was introduced to ",
    { scribble: "Public Speaking" },
    " and ",
    { scribble: "Active Listening" },
    " through my parents' teaching, I mastered it through our trauma.",
  ],
  lines: [
    {
      surface: "2002 — my dad was wrongly fired and our family kicked from the parsonage.",
      between:
        "We experienced homelessness for two months. My family grew closer and I grew up... fast.",
    },
    {
      surface: "What I mastered",
      heading: true,
      points: [
        [
          "Meet people ",
          { lime: "where they are" },
          ".",
        ],
        [
          "Listen to people and make sure ",
          { lime: "they are heard" },
          ".",
        ],
        [
          "Own the stage you are on. ",
          { lime: "You deserve to be there." },
        ],
      ],
    },
    {
      tiles: ["I Inspire", "I Empower", "I Challenge"],
    },
  ],
}

export const moment = {
  kicker: "02  ·  Play",
  title: "Do It Before You Dont",
  lede: "Acting technique, and repetition taught me the importance of spontaneous action. Get out of your head and onto the stage.",
  photos: [
    {
      src: "/gallery/puck.jpg",
      alt: "Midsummer Nights Dream",
      label: "Midsummer Nights Dream",
      note: "Entry level Puck. I was all passion and zero experience. Scared to fail.",
    },
    {
      src: "/gallery/comedy-studies.jpg",
      alt: "Comedy Studies ensemble",
      label: "Comedy Studies",
      note: "Here I learned the fundamentals of play. Listening, give and take, Yes, And...",
    },
    {
      src: "/gallery/butterdolphin.jpg",
      alt: "ButterDolphin onstage",
      label: "ButterDolphin",
      note: "Founding a touring team required a new skill set. Conflict Resolution and Project Management.",
      objectPosition: "50% 8%",
    },
    {
      src: "/gallery/sc-conservatory.jpg",
      alt: "Second City Conservatory ensemble",
      label: "Second City Conservatory",
      note: "The Julliard of comedy. Discipline, and taking direction.",
    },
    {
      src: "/gallery/ph-productions.jpg",
      alt: "Big Shoulders Comedy ensemble",
      label: "Big Shoulders Comedy",
      note: "Executive director of my own non-profit.",
    },
  ],
}

export const table = {
  kicker: "03  ·  Work",
  title: "We need Fire to Forge",
  lede: "Check out my dark times, it makes my light brighter.",
  flyer: {
    src: "/gallery/aoa-full.jpg",
    alt: "AOA Physician Services flyer",
    caption: "Thats my wife and son!",
  },
  darkTitle: "The Dark Times",
  lightTitle: "Into The Light",
  strengths: [
    {
      name: "The American Osteopathic Association fired me in 2024.",
      note: "I had successfully closed several projects that revitalized the recertification process for 20+ certifying boards.",
    },
    {
      name: "They asked me to create more work for myself.",
      note: "",
    },
    {
      name: "I got burned out, put on a personal improvement plan, took FMLA, and was then told I did not belong.",
      note: "",
    },
  ],
  edges: [
    {
      name: "At the time, it felt like failure.",
      note: "In hindsight, I didn't belong behind spreadsheets.",
    },
    {
      name: "Getting fired gave me my agency back.",
      note: "",
    },
    {
      name: "I'm spending my energy now on building work I believe in and helping others do the same.",
      note: "",
    },
  ],
}

export const artifact = {
  kicker: "05  ·  The artifact",
  title: "I'm sorry we can't slow down.",
  lede: "Louisville lacks a home for the theatre community. Now it has one.",
  name: "The Calliope",
  prompt: "Open louisvilletheatre.com",
  href: "https://louisvilletheatre.com/",
  image: "/louisville-theatre.jpg",
}
