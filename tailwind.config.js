/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        '200px': '200px',
        '250px': '250px',
        '500px': '500px',
        '600px': '600px',
        '700px': '700px',
      },
      margin: {
        '250px': '250px',
        '255px': '255px',
        "30px":"7rem",
      },
      height: {
        '600px': '600px',
      },
      zIndex:{
        '10000':'100000',
        '100000':'1000000'
      },
    },
  },
  plugins: [],
}

