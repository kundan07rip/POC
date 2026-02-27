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
        coffee: {
          900: "#1A0F08",
          800: "#2C1B0F",
          700: "#3D2616",
          600: "#51321C",
          500: "#6B4426",
          400: "#8B5A33",
        },
        cream: {
          900: "#E6DEC3",
          800: "#F0EAD6",
          700: "#F5F1E1",
          100: "#FFFFFF",
        },
        gold: {
          500: "#BE9B5A",
        }
      },
      fontFamily: {
        serif: ["Cinzel", "Georgia", "Times New Roman", "serif"],
        sans: ["Montserrat", "Arial", "Helvetica", "sans-serif"],
        cursive: ["'Great Vibes'", "cursive"],
      },
      backgroundImage: {
        'chevron-pattern': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)',
      }
    },
  },
  plugins: [],
};
export default config;
