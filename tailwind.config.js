/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

const colors = {
  black: '#000000DE',
  error: '#CB3D40',
  gray: '#B4B4B4',
  grayLight: '#D0CFCF',
  grayThin: '#F8F8F8',
  grayDark: '#7E7E7E',
  yellow: '#F4E041',
  yellowLight: '#FFE302',
  blue: '#00BDD3',
  blueLight: '#FFE302',
  white: '#FFFFFF',
  transparent: 'transparent'
};

const fontFamily = {
  sans: ['Nunito', ...defaultTheme.fontFamily.sans],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    colors,
    fontFamily,
  },
  plugins: [],
}

