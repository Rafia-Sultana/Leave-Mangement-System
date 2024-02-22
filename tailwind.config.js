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
        'dark':'',
        'DEFAULT': '#3b82f6',
        'light': '#00b3b3',
        'lighter': '',
        'lightest': '',
      },
      red: {
        'darkest':'',
        'dark':'',
        'DEFAULT': '#ef4444',
        'light': '#f87171',
        'lighter': '',
        'lightest': '',
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

    },
    extend: {},
  },
  plugins: [require('daisyui')],
}