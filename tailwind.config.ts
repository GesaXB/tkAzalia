import type { Config } from "tailwindcss";

const config: Config = {
  content: [
"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}", // <--- PASTIKAN BARIS INI ADA!
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        hijau: "#01793B",
      },
    },
  },
  plugins: [],
};
export default config;