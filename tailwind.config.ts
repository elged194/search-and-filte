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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],  // خط Cairo للنصوص العربية
        inter: ['Inter', 'sans-serif'],  // خط Inter للنصوص الإنجليزية
      },
    },
  },
  plugins: [],
};
export default config;
