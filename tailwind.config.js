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
        lavender: '#C3AED6',
        sage: '#B7CFB7',
        cream: '#FFF8F0',
        gold: '#CEB888',
        coral: '#F4978E',
        charcoal: '#2D2D2D',
        plum: '#3D2C5E',
        navy: '#1E2A3A',
        'dark-card': '#2A2A3D',
        'warm-white': '#F5F0EB',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0,0,0,0.06)',
        'card': '0 2px 8px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
