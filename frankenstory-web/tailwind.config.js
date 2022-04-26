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
      },
    },
  },
  plugins: []
}
