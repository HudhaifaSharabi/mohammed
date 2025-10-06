import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        line: 'var(--line)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '1.5rem'
        },
        screens: {
          '2xl': '1200px'
        }
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 187, 255, 0.25)',
        gold: '0 0 32px rgba(193, 161, 106, 0.25)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};

export default config;
