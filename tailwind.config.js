/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
   fontFamily: {
        // Now 'fontFamily' is defined and can be used here
        sans: ['Inter', ...fontFamily.sans],
      },
  },
  plugins: [],
}
