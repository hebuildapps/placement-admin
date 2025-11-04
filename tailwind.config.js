/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        instrument: ['"Instrument Serif"', "serif"],
        gupter: ['"Gupter"', "serif"],
        dm: ['"DM Sans"', "sans-serif"],
      }
    }
  }
};