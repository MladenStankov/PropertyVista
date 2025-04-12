import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        shake: {
          "25%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(-7px)" },
          "90%": { transform: "translateY(7px)" },
          "95%": { transform: "translateY(5px)" },
          "100": { transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
