# Speed Square Calculator

A web application for calculating triangle measurements with dynamic visual representations. Built with React, Vite, Tailwind CSS, and shadcn/ui.

## Features

### 1. Right-Angle Triangle Calculator
Calculate the hypotenuse of a right-angle triangle given two sides.

- **Input**: Two sides (A and B) in millimeters
- **Output**: Hypotenuse length using the Pythagorean theorem (c = √(a² + b²))
- **Visualization**: Dynamic SVG diagram that scales proportionally based on input values

### 2. Triangle Side Calculator
Calculate the third side of any triangle given two sides and the angle between them.

- **Input**: Two sides (A and B) in millimeters and angle (C) in degrees
- **Output**: Third side length using the Law of Cosines (c² = a² + b² - 2ab×cos(C))
- **Visualization**: Dynamic SVG diagram showing the actual angle and proportional sides

## Visual Features

- Real-time calculation as values are entered
- Color-coded labels for each side:
  - Side A: Blue
  - Side B: Green
  - Side C (calculated): Red
  - Angle: Purple
- Dynamic SVG graphics that accurately reflect:
  - Proportional side lengths
  - Actual angles
  - Scale adjustments for optimal viewing

## Tech Stack

- **Build Tool**: Vite 7.3.0
- **Framework**: React 18
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: shadcn/ui
- **Additional Libraries**:
  - class-variance-authority
  - clsx
  - tailwind-merge
  - lucide-react

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
2026-01-speedsquare/
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   └── label.jsx
│   │   ├── RightAngleCalculator.jsx
│   │   └── TriangleSideCalculator.jsx
│   ├── lib/
│   │   └── utils.js          # Utility functions
│   ├── App.jsx               # Main application
│   ├── App.css
│   ├── index.css             # Tailwind directives & CSS variables
│   └── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Usage

### Right-Angle Triangle

1. Select "Calculate right-angle triangle hypotenuse"
2. Enter the length of side A in millimeters
3. Enter the length of side B in millimeters
4. The hypotenuse is calculated and displayed automatically
5. View the dynamic SVG visualization showing the triangle with labeled sides

### General Triangle

1. Select "Calculate triangle side"
2. Enter the length of side A in millimeters
3. Enter the length of side B in millimeters
4. Enter the angle between the sides in degrees (0-180)
5. The third side is calculated and displayed automatically
6. View the dynamic SVG visualization showing the triangle with the actual angle

## License

Private project

## Author

Built with Warp AI
