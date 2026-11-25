export interface NowItem {
  id: string;
  label: string;
  text: string;
}

/** Current focus areas shown in the About "Right now" panel. */
export const aboutNow: NowItem[] = [
  {
    id: "studying",
    label: "Studying",
    text: "First-year computing student at the Egyptian E-Learning University (EELU).",
  },
  {
    id: "training",
    label: "Training",
    text: "Problem solving through ICPC newcomers training, focused on algorithms and data structures.",
  },
  {
    id: "learning",
    label: "Learning",
    text: "IBM Generative AI Engineering professional certificate on Coursera.",
  },
  {
    id: "securing",
    label: "Securing",
    text: "Hands-on web security practice on TryHackMe. Advent of Cyber 2025 certified.",
  },
];

export interface AboutStat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
}

/** Headline numbers for the About stat strip. */
export const aboutStats: AboutStat[] = [
  { id: "years", value: 3, suffix: "+", label: "Years building for the web" },
  { id: "projects", value: 3, label: "Featured shipped projects" },
  { id: "certificates", value: 5, label: "Professional certifications" },
];
