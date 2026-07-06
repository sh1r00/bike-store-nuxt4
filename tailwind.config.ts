/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        dark: {
          DEFAULT: '#171717',
          surface: '#1f1f1f',
          elevated: '#2a2a2a',
        },
        neon: {
          DEFAULT: '#22c55e',
          dim: '#16a34a',
        },
      },
    },
  },
}
