export type featuresType = {
  id: string;
  feature: string;
  description: string;
  alt: string;
  url: string;
  overlayColor?: string;
};

const PRIMARY_TINT = "#6d28d966"; // oklch(51.415% 0.26411 281.704) at 40% opacity

export const featuresLeft: featuresType[] = [
  {
    id: "speed",
    feature: "Real-Time Sync",
    description:
      "Experience zero-lag updates with our high-frequency data engine.",
    alt: "Futuristic digital dashboard with glowing motion-blur light trails",
    url: "/images/features_1.jpg",
    overlayColor: PRIMARY_TINT,
  },
  {
    id: "precision",
    feature: "Precision Verdicts",
    description:
      "Every vote and data point is cross-verified for 100% accurate percentage yields.",
    alt: "A cinematic high-contrast 'VS' badge glowing with electric sparks and energy",
    url: "/images/features_2.jpg",
    overlayColor: PRIMARY_TINT,
  },
];

export const featuresMid: featuresType = {
  id: "mobile",
  feature: "Responsive view",
  description:
    "You can use the app accross diffrent devices, with the same account.",
  alt: "A cinematic high-contrast 'VS' badge glowing with electric sparks and energy",
  url: "/images/main_feature.png",
  overlayColor: PRIMARY_TINT,
};

export const featuresRight: featuresType[] = [
  {
    id: "trust",
    feature: "Truth-Verified Data",
    description:
      "Advanced algorithms filter noise to highlight confirmed facts instantly.",
    alt: "Geometric data funnel transforming chaotic particles into a structured grid",
    url: "/images/features_4.jpg",
    overlayColor: PRIMARY_TINT,
  },
  {
    id: "ui",
    feature: "Symmetrical Comparison",
    description:
      "A split-screen interface designed for perfect visual balance and clarity.",
    alt: "Symmetrical split-screen showing a red apple versus a blue digital crystal",
    url: "/images/features_3.jpg",
    overlayColor: PRIMARY_TINT,
  },
];
