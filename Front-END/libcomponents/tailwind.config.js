/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    fontFamily : {
      'sans': ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      'serif': ['ui-serif', 'Times', 'serif'],
      'mono': ['ui-monospace', 'monospace'],
    },
    extend: {
      colors: {
        'primary': {
          50: '#FFFEE7',
          100: '#FFFEC1',
          200: '#FFF986',
          300: '#FFED41',
          400: '#FFDC0D',
          500: '#FAC900',
          600: '#D19600',
          700: '#A66B02',
          800: '#89530A',
          900: '#74440F'
        },
        'secondary': {
          50: '#E8F5FF',
          100: '#D5ECFF',
          200: '#B3DBFF',
          300: '#85C0FF',
          400: '#5697FF',
          500: '#2F6DFF',
          600: '#0C3EFF',
          700: '#0031FA',
          800: '#0630CD',
          900: '#10329F'
        }
      },
    },
  },
  plugins: [],
}

