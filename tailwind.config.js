module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1440px',
      '4k': '2560px',
    },
    extend: {
      animation: {
        expand: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.9)' },
        }
      },
      backgroundImage: {
        'poke': "url('../public/bckg.svg')",
      },
      colors: {
        'dark-green': '#263E1B',
        'extra-dark-green': '#296837',
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
