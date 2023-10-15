/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light': '#e8f2ff',
        'dark': '#112A46',
        'highlight': '#0e60b9',
        'gold': '#ffef85',
        'green': '#b8e994',
        'red': '#fab1a0',
        'white': 'whitesmoke',
        'gray': 'lightgray'
      },
      fontFamily: {
        'korinna': ["Korinna", "sans"]
      }
    }
  },
  plugins: [],
}

