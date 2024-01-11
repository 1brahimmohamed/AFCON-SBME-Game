import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        AAPrimary: '#004634',
        AAPrimaryLight: '#015b32',
        AAPrimaryDark: '#002c1e',
        AASecondary: '#ff7900',
        AASecondaryLight: '#ff9d32',
        AASecondaryDark: '#ff4c00',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
export default config
