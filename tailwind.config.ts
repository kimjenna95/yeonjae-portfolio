import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        "bg-dark": "#101314",
        foreground: "#111111",
        "foreground-muted": "#6B6B6B",
        "foreground-subtle": "#999999",
        accent: "#C8745A",
        border: "#E8E8E8",
      },
      fontFamily: {
        sans: ["Barlow", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
export default config;
