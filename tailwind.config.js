/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx}', // Ajusta según tu estructura
    ],
    darkMode: 'class', // Soporte manual con clase 'dark'
    theme: {
      extend: {
        colors: {
          matchpet: {
            primary: '#30588C', // B'dazzled Blue
            accent: '#BF3952',  // Dingy Dungeon
            light: '#6093BF',   // Silver Lake Blue
            dark: '#011526',    // Rich Black
            alt: '#254559',     // Japanese Indigo
          },
        },
      },
    },
    plugins: [],
  };
  