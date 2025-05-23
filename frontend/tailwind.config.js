/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lavender: '#E6E6FA',
        darkLavender: '#D8BFD8',
        pinkish: '#F8EAFB',
      }
    }
  },
  plugins: [],
}
