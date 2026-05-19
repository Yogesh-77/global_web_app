export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
