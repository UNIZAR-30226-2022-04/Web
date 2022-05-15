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
      colors: {
        "degradado_arriba": '#31ECCF',
        "degradado_abajo": '#AAEF5E',

        "degradado_layout-arriba": '#5ec1b2',
        "degradado_layout-abajo": '#a5d570',

        "verde_letras": '#0ca789',
        "verde_publico_seleccionado": '#09cc8d',
        "verde_top": '#32d298',
        "verde_parrafo": '#3fb78f',
        "verde_parrafo_seleccionado": '#8fd14f',
        "verde_punetas": '#015d52',
        "verde_plus_minus": '#2ecc71',
        "verde_plus_minus_back": '#27ae60',

        "gris": '#676567',
        "gris_claro": '#e6e6e6',
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
