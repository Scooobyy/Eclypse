/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['Playfair Display', 'serif'],
      },
      colors: {
        eclypse: {
          gray: '#333333',
          lightgray: '#F5F5F5',
        },
      },
    },
  },
  plugins: [],
};