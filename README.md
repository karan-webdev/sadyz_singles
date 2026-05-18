# Sadzys Singles - React Landing Page

A modern, clean React landing page for Sadzys betting tips service. Built with Vite, React, Tailwind CSS, and Lucide Icons.

## Features

- ✨ Modern, clean UI with transparent design
- 🎨 Lucide React icons (all transparent, scalable)
- 🎯 Responsive grid layouts
- 💨 Smooth scroll reveals and animations
- 🌙 Dark theme with green accents
- ⚡ Built with Vite for lightning-fast development
- 🎭 Fully typed with React

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library
- **PostCSS** - CSS transformation

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Nav.jsx           # Navigation bar
│   ├── Hero.jsx          # Hero section
│   ├── HowItWorks.jsx    # How It Works section
│   ├── SinglesSoldOut.jsx # Singles waitlist section
│   ├── MultisSection.jsx # Multis pricing section
│   ├── TransparencySection.jsx
│   ├── ProofSection.jsx  # Results & testimonials
│   ├── FinalCTA.jsx      # Final call-to-action
│   └── Footer.jsx        # Footer
├── App.jsx               # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## Color Scheme

- **Primary:** Green (#22c55e)
- **Background:** Dark (#0a0a0a)
- **Cards:** Dark Gray (#1a1a1a)
- **Text:** Near White (#fafafa)
- **Muted Text:** Gray (#a3a3a3)

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  green: {
    DEFAULT: '#22c55e',
    dim: '#16a34a',
    border: '#86efac',
  },
  // ... more colors
}
```

### Fonts

The project uses:
- **Bricolage Grotesque** - Headlines
- **Instrument Serif** - Accents
- **IBM Plex Mono** - Code/Data

## Icons

Uses Lucide React icons - import from `lucide-react`:

```jsx
import { ArrowRight, Check, Shield } from 'lucide-react'
```

See [lucide.dev](https://lucide.dev) for all available icons.

## Performance

- ⚡ Lazy loading for images
- 🎬 Smooth scroll reveal animations
- 📦 Optimized bundle with Vite
- 🖼️ SVG icons (no image overhead)

## License

© 2026 Sadzys Singles. All rights reserved.
