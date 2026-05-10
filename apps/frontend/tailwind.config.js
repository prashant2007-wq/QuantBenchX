/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        card: '#161622',
        accent: '#0ea5e9',
        neonPurple: '#a855f7',
        neonCyan: '#06b6d4',
      },
    },
  },
  plugins: [],
}
