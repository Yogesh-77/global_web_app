/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#060d1a',
        neon: '#00d9ff',
        purple: '#7c3aed',
      },
      boxShadow: {
        neon: '0 0 20px rgba(0,217,255,0.35)',
      },
      animation: {
        'scan': 'scan 2.8s linear infinite',
        'pulse-red': 'pulseRed 1.2s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        pulseRed: {
          '0%,100%': { boxShadow: '0 0 8px rgba(239,68,68,0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(239,68,68,0.8)' },
        },
      }
    },
  },
  plugins: [],
}
        cyberBg: '#060d1a',
        neonBlue: '#00d9ff',
        neonPurple: '#7c3aed',
      },
      boxShadow: {
        neon: '0 0 20px rgba(0, 217, 255, 0.35), 0 0 40px rgba(124,58,237,0.2)',
      },
      animation: {
        scan: 'scan 3s linear infinite',
        pulseFast: 'pulse 1.2s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-20%)' },
          '100%': { transform: 'translateY(120%)' },
        },
      },
    },
  },
  plugins: [],
};
