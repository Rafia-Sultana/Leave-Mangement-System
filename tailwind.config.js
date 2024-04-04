/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      white:'#FFFFFF',
      black:'#000000',
      red:'#991b1b',
      green: {
        'darkest':'',
        'dark':'#65a30d',
        'DEFAULT': '#71BC78',
        'light': '#bbf7d0',
        'lighter': '#dcfce7',
        'lightest': '#f0fdf4',
      },
      blue: {
        'darkest':'',
        'dark':'#2b84b1',
        'DEFAULT': '#3b82f6',
        'light': '#7BD3FF',
        'lighter': '#E8F7FF',
        'lightest': '#71D0FF',
      },
    

    gray: {
        'darkest': '#111827',
        'darker':'#374151',
        'dark': '#1f2937',
        'DEFAULT': '#9ca3af',
        'light': '#f3f4f6',
        'lighter':'#f3f4f6',
        'lightest': '#e5e7eb',
      },
      red: {
        'darkest': '#7f1d1d',
        'dark': '#c53030',
        'DEFAULT': '#991b1b', 
        'light': '#f87171',
        'lighter': '#fca5a5',
        'lightest': '#fee2e2',
      },
      
      


    },


    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        genre: ["Genre", "sans-serif"],
        biggyJohn:["Biggy John", "sans-serif"]
      },
    },
  },
  plugins: [require('daisyui')],
}