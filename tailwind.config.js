export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Make sure your JSX files are included!
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
  'text-blue-600',
  'dark:text-blue-400',
  'underline',
],
}

