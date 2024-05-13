import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1c1d1f'
      },
      backgroundImage: {
        'banner': "url('/img/hero-image-wr.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
