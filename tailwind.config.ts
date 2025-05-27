import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontSize: {
        xs: "10px", //  القيمة إلى 10px
      },
      fontFamily: {
        sans: ["var(--font-alexandria)", "sans-serif"],
      },
    },
  },
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  plugins: [],
};
export default config;
