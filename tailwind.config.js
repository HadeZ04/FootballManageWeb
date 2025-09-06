/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Roboto', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'holographic-shift': 'holographic-shift 3s ease-in-out infinite',
        'stadium-lights': 'stadium-lights 4s ease-in-out infinite',
        'goal-celebration': 'goal-celebration 0.6s ease-in-out',
        'particle-float': 'particle-float 15s linear infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotateY(0deg)' },
          '50%': { transform: 'translateY(-20px) rotateY(5deg)' }
        },
        'pulse-glow': {
          '0%': { 
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)',
            transform: 'scale(1)'
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.8)',
            transform: 'scale(1.05)'
          }
        },
        'holographic-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'stadium-lights': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' }
        },
        'goal-celebration': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.2) rotate(5deg)' },
          '50%': { transform: 'scale(1.1) rotate(-3deg)' },
          '75%': { transform: 'scale(1.15) rotate(2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' }
        },
        'particle-float': {
          '0%': {
            transform: 'translateY(100vh) rotate(0deg) scale(0)',
            opacity: '0'
          },
          '10%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          '90%': {
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(-100vh) rotate(360deg) scale(0)',
            opacity: '0'
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        'premier-purple': '#37003c',
        'premier-cyan': '#00ff85',
        'premier-dark': '#1a0e33',
        'premier-light': '#f8f9fa',
        'premier-gray': '#6c757d',
      }
    },
  },
  plugins: [],
}
