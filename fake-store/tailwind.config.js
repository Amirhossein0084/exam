/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        mft: {
          300: "#6b7c93",
          500: "#192726",
          700: "#000f0e"
        }
      }
    },
  },
  plugins: [],
}

