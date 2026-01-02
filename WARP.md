# Speed Square Calculator

## Project Overview
A Vite + React + Tailwind CSS + shadcn/ui application for calculating triangle measurements.

## Tech Stack
- **Build Tool**: Vite 7.3.0
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Additional Libraries**:
  - class-variance-authority
  - clsx
  - tailwind-merge
  - lucide-react

## Features

### 1. Right-Angle Triangle Hypothenuse Calculator
- Input: Two sides (A and B) in millimeters
- Output: Hypothenuse length calculated using Pythagorean theorem (√(a² + b²))
- Real-time calculation as values are entered

### 2. Triangle Side Calculator
- Input: Two sides (A and B) in millimeters and angle between them in degrees
- Output: Third side length calculated using Law of Cosines (c² = a² + b² - 2ab×cos(C))
- Real-time calculation as values are entered

## Project Structure
```
speedsquare/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── card.jsx       # shadcn Card component
│   │   │   ├── input.jsx      # shadcn Input component
│   │   │   └── label.jsx      # shadcn Label component
│   │   ├── RightAngleCalculator.jsx
│   │   └── TriangleSideCalculator.jsx
│   ├── lib/
│   │   └── utils.js           # Utility functions (cn helper)
│   ├── App.jsx                # Main application with navigation
│   ├── App.css                # Application styles
│   ├── index.css              # Tailwind directives and CSS variables
│   └── main.jsx               # React entry point
├── tailwind.config.js         # Tailwind configuration with shadcn theme
├── postcss.config.js          # PostCSS configuration
└── package.json
```

## Development

### Start Dev Server
```bash
npm run dev
```
Server runs on http://localhost:5173/

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## UI Theme
The application uses shadcn/ui theming with CSS variables defined in `src/index.css`:
- Light and dark mode support (defined but not toggled in UI)
- Custom color scheme for primary, secondary, muted, accent, card, etc.
- Border radius customization via `--radius` variable

## Notes
- All measurements are in millimeters
- Calculations display 2 decimal places
- Real-time validation prevents invalid inputs (negative numbers, non-numeric values)
- Responsive design with max-width constraint for better UX
