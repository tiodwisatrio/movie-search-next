import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#15191d',
        secondary: '#212529',
        textColor: '#f0f0f0',
        accent: "#3187dd",
        hoverAccent: "#1f5890"
      }
    },
  },
  plugins: [],
}
export default config
