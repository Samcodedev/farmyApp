/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#397846',
        'main_hover': '#4d915b',
        'bold_main': '#02390d',
      }
    },
  },
  plugins: [],
}
