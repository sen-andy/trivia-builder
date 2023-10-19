/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '639px',
      'md': '767px',
      'lg': '1279px',
      'xl': '1720px',
      '2xl': '2559px',
    },
    extend: {
      textShadow: {
        sm: '4px 4px 0 #112A46',
        DEFAULT: '6px 6px 0 #112A46',
        lg: '8px 8px 0 #112A46',
      },
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
        'korinna': ["Korinna", "sans"],
        'arial': ["Arial", "Helvetica", "sans-serif"]
      }
    }
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}

