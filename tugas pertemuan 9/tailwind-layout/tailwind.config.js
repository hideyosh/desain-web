/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html"],
  darkMode: 'class', //Menambahkan dark mode
  theme: {
    extend: {
      colors: {
        primary: '#FF2929', // Warna biru khusus
        secondary: '#F6F7C4', // Warna kuning khusus
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif']
      },  
    },
  },
  plugins: [],
}

