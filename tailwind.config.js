/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        rb: {
          red:    '#e2231a',
          blue:   '#00a2ff',
          dark:   '#1a1a2e',
          darker: '#0d0d1a',
          card:   '#16213e',
          accent: '#0f3460',
        },
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shake:   { '0%,100%': { transform: 'translateX(0)' }, '25%': { transform: 'translateX(-8px)' }, '75%': { transform: 'translateX(8px)' } },
        pop:     { '0%': { transform: 'scale(0.8)' }, '60%': { transform: 'scale(1.15)' }, '100%': { transform: 'scale(1)' } },
        fall:    { '0%': { opacity: '1', transform: 'translateY(0) rotate(0deg)' }, '100%': { opacity: '0', transform: 'translateY(180px) rotate(720deg)' } },
      },
      animation: {
        fadeIn:  'fadeIn 0.25s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
        shake:   'shake 0.4s ease-out',
        pop:     'pop 0.4s ease-out',
        fall:    'fall 1.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}
