import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#026668",
        // secondary: "#fba100",
        primary: "#0e0e66",
        secondary: "#00ADEC",
        facebook: "#3b5998",
        twitter: "#00acee",
        linkedin: "#0072b1",
        instagram: "#BD33B5",
        whatsapp: "#25d366",
        youtube: "#cd201f",
        pinterest: "#E60023",
      },
    },
  },
  plugins: [],
};
export default config;
