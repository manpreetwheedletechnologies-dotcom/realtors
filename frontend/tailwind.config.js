/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EAF4ED',
          100: '#CFE6D6',
          300: '#7DC196',
          500: '#2F9E5B',
          600: '#1F6B3D',
          700: '#175631',
          900: '#0F2A1C',
        },
      },
    },
  },
  plugins: [],
}
