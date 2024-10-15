/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['"Shadows Into Light"', 'sans-serif'], // Usar esta fuente por defecto
      }
    },
  },
  plugins: [],
}

