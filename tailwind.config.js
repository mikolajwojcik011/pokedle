module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'poke': "url('../public/bckg.svg')",
      },
      colors: {
        'dark-green': '#263E1B',
        'bckg-light': '#F8F6D7',
        'green-gray': '#4F5F47',
        'light-green': '#76E39E',
        'blue': '#294E68',
        'gold': '#CAA746',
        'pink': '#ECD9EF',
        'orange': '#F36445',
        'green': '#45F395'
      },
      fontFamily: {
        'display': ['Josefin Sans'],
        'body': ['Josefin Sans'],
      }
    },
  },
  plugins: [],
}
