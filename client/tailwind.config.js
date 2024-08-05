/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-blue":"#1C77C3",
        "secondary-blue":"#2191EC",
        "orange":"#F39237",
        "red":"#D63230",
        "green":"#04E762",
        "secondary-green":"#63C132",
        "black":"#0D1B1E"
      }
    },
  },
  plugins: [],
}

