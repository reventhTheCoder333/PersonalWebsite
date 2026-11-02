/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: '#040a14',
        navy: {
          950: '#06101f',
          900: '#0a182d',
          800: '#10233d',
          700: '#183251',
          600: '#22436a',
        },
        tide: { DEFAULT: '#5bb5ad', deep: '#2b7c7a', soft: '#9fd6cf' },
        parchment: { DEFAULT: '#f1e4c6', deep: '#d9c494', dark: '#b39a66' },
        ink: '#2a1c0f',
        gold: { DEFAULT: '#d8aa4f', soft: '#ecca82', deep: '#a87b2a' },
        sunset: '#e8773b',
        ember: '#b8392e',
        mist: '#c6d0dc',
      },
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(216,170,79,0.45)',
        tide: '0 0 40px -10px rgba(91,181,173,0.55)',
      },
    },
  },
  plugins: [],
};
