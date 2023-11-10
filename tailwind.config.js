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
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
});
