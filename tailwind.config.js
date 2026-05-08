/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#E8620A',
          50:  '#FEF0E7',
          100: '#FCD9C4',
          200: '#F9B38A',
          300: '#F58C50',
          400: '#F17530',
          500: '#E8620A',
          600: '#C45308',
          700: '#9A4006',
          800: '#732F04',
          900: '#4D1F02',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          50:  '#F5F5F5',
          100: '#E8E8E8',
          200: '#C8C8C8',
          300: '#A0A0A0',
          400: '#707070',
          500: '#484848',
          600: '#303030',
          700: '#242424',
          800: '#1A1A1A',
          900: '#0F0F0F',
        },
        cream: '#F5F0EB',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
