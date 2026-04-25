/**
 * ChaiTailwind Configuration
 * Defines scales, colors, and design tokens.
 */

window.CHAI_CONFIG = {
  // Spacing scale in pixels
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
    48: '192px',
    64: '256px',
    auto: 'auto',
  },

  // Neo-Brutalism Color Palette
  colors: {
    // Base
    black: '#000000',
    white: '#ffffff',
    offwhite: '#f4f4f0',

    // Neo-Brutalism Pop Colors
    red: '#ff2d2d',
    'red-dark': '#cc0000',
    blue: '#2d62ff',
    'blue-dark': '#0044cc',
    green: '#2dff2d',
    'green-dark': '#00cc00',
    yellow: '#ffeb3b',
    'yellow-dark': '#f9c800',
    pink: '#ff2d9e',
    'pink-dark': '#cc0077',
    purple: '#a855f7',
    'purple-dark': '#7e22ce',
    orange: '#ff7b2d',
    'orange-dark': '#cc5500',
    cyan: '#2defff',
    'cyan-dark': '#00bbcc',
    lime: '#c6ff2d',
    'lime-dark': '#99cc00',
    teal: '#2dffb9',
    'teal-dark': '#00cc88',

    // Grays
    gray: '#888888',
    'gray-light': '#cccccc',
    'gray-dark': '#444444',

    // Neo-Brutalism specific
    brutal: {
      bg: '#fdfd96',
      border: '#000000',
      shadow: '#000000',
      accent: '#ff2d2d',
      secondary: '#2d62ff',
    },
  },

  // Typography scale
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },

  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Border widths
  borderWidth: {
    0: '0px',
    1: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    5: '5px',
    6: '6px',
    8: '8px',
  },

  // Border radius
  borderRadius: {
    none: '0px',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },

  // Shadows (Neo-Brutalism: hard, no blur)
  boxShadow: {
    none: 'none',
    sm: '2px 2px 0px 0px #000',
    md: '4px 4px 0px 0px #000',
    lg: '6px 6px 0px 0px #000',
    xl: '8px 8px 0px 0px #000',
    '2xl': '12px 12px 0px 0px #000',
    brutal: '6px 6px 0px 0px #000',
    'brutal-sm': '3px 3px 0px 0px #000',
    'brutal-lg': '10px 10px 0px 0px #000',
    'brutal-red': '6px 6px 0px 0px #ff2d2d',
    'brutal-blue': '6px 6px 0px 0px #2d62ff',
    'brutal-green': '6px 6px 0px 0px #2dff2d',
    'brutal-yellow': '6px 6px 0px 0px #ffeb3b',
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Z-index scale
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
  },

  // Sizing
  sizing: {
    auto: 'auto',
    full: '100%',
    screen: '100vh',
    'screen-w': '100vw',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },
};
