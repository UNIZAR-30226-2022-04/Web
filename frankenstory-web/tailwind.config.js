const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,css}'],
  theme: {
    extend: {
      fontFamily: {
        'arial-b': ['ARIAL-BOLD'] ,
        'arial-r': ['ARIAL-REGULAR'] ,
        'bangers': ['BANGERS-REGULAR'] ,
        'graduate': ['GRADUATE'] ,
        'blank': ['BLANK'],
        'reverse' : ['REVERSE']
      },
      textShadow: {
        sm: '1px 1px 2px var(--tw-shadow-color)',
        DEFAULT: '2px 2px 2px var(--tw-shadow-color)',
        lg: '4px 4px 2px var(--tw-shadow-color)',
      },
    },
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
