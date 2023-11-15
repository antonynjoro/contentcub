import { withUt } from "uploadthing/tw";

export default withUt({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-fira_sans)'],
      },
      colors:{
        gold: {
          50: '#ffe169',
          100: '#fad643',
          200: '#edc531',
          300: '#dbb42c',
          400: '#c9a227',
          500: '#b69121',
          600: '#a47e1b',
          700: '#926c15',
          800: '#805b10',
          900: '#76520e',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
});
