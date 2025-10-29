    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            'azul': '#3c4f76',
            'cinza': {
              '500': '#757575',
              '600': '#2f2f2f',
            },
          },
        },
      },
      plugins: [],
    }
