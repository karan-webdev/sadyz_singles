/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#22c55e',
          dim: '#16a34a',
          border: '#86efac',
        },
        bg: {
          DEFAULT: '#0a0a0a',
          card: '#1a1a1a',
          'card-2': '#262626',
        },
        text: {
          DEFAULT: '#fafafa',
          muted: '#a3a3a3',
          dim: '#717171',
        },
        white: '#ffffff',
      },
      fontFamily: {
        bricolage: ['Bricolage Grotesque', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'green-glow': 'radial-gradient(circle 600px at 50% 50%, rgba(34,197,94,0.18) 0%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
