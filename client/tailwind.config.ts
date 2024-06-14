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
        AAPrimary: '#003366',         /* A dark blue shade */
        AAPrimaryLight: '#143cda',    /* A lighter blue shade */
        AAPrimaryDark: '#000d40',     /* A darker blue shade */
        AASecondary: '#66CCFF',
        AASecondaryLight: '#80BFFF',
        AASecondaryDark: '#336699',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
export default config
