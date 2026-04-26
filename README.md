# ☕ ChaiTailwind

A **lightweight, utility-first CSS engine** built with vanilla JavaScript. Inspired by Tailwind CSS but designed to be a client-side library that parses `chai-*` classes and applies them as inline styles dynamically.

**Design Theme:** Neo-Brutalism — bold colors, thick black borders, hard shadows, and unapologetic contrast.

---

## 🚀 Live Demo

[👉 View Demo](https://tailzy.vercel.app/) *(Update with your actual link)*

---

## 📦 What It Does

Instead of writing traditional CSS, you write class names following the `chai-*` pattern:

```html
<div class="chai-bg-red chai-p-4 chai-border-4 chai-border-black chai-shadow-brutal">
  Hello World
</div>
```

ChaiTailwind will:

1. **Scan** the DOM for all `chai-*` classes
2. **Parse** each class into corresponding CSS property-value pairs
3. **Apply** inline styles using JavaScript
4. **Remove** the original `chai-*` classes (leaving only processed styles)
5. **Observe** dynamic DOM changes via `MutationObserver` and auto-style new elements

---

## 🛠️ Supported Utilities

### Spacing
| Class | Style |
|-------|-------|
| `chai-p-4` | `padding: 16px` |
| `chai-px-8` | `padding-left: 32px; padding-right: 32px` |
| `chai-py-2` | `padding-top: 8px; padding-bottom: 8px` |
| `chai-m-4` | `margin: 16px` |
| `chai-mx-auto` | `margin-left: auto; margin-right: auto` |
| `chai-mt-6` | `margin-top: 24px` |

### Colors
| Class | Style |
|-------|-------|
| `chai-bg-red` | `background-color: #ff2d2d` |
| `chai-bg-blue` | `background-color: #2d62ff` |
| `chai-text-white` | `color: #ffffff` |
| `chai-text-black` | `color: #000000` |
| `chai-bg-[#ff6b6b]` | `background-color: #ff6b6b` *(arbitrary)* |
| `chai-text-[#9b59b6]` | `color: #9b59b6` *(arbitrary)* |

### Typography
| Class | Style |
|-------|-------|
| `chai-text-xl` | `font-size: 1.25rem` |
| `chai-text-4xl` | `font-size: 2.25rem` |
| `chai-font-bold` | `font-weight: 700` |
| `chai-text-center` | `text-align: center` |
| `chai-uppercase` | `text-transform: uppercase` |
| `chai-leading-relaxed` | `line-height: 1.625` |
| `chai-tracking-wide` | `letter-spacing: 0.025em` |

### Borders
| Class | Style |
|-------|-------|
| `chai-border-4` | `border-width: 4px; border-style: solid` |
| `chai-border-black` | `border-color: #000000` |
| `chai-rounded-lg` | `border-radius: 8px` |
| `chai-rounded-full` | `border-radius: 9999px` |

### Shadows (Neo-Brutalism)
| Class | Style |
|-------|-------|
| `chai-shadow-sm` | `box-shadow: 2px 2px 0px 0px #000` |
| `chai-shadow-md` | `box-shadow: 4px 4px 0px 0px #000` |
| `chai-shadow-lg` | `box-shadow: 6px 6px 0px 0px #000` |
| `chai-shadow-brutal` | `box-shadow: 6px 6px 0px 0px #000` |
| `chai-shadow-brutal-red` | `box-shadow: 6px 6px 0px 0px #ff2d2d` |

### Flexbox
| Class | Style |
|-------|-------|
| `chai-flex` | `display: flex` |
| `chai-flex-row` | `flex-direction: row` |
| `chai-flex-col` | `flex-direction: column` |
| `chai-items-center` | `align-items: center` |
| `chai-justify-between` | `justify-content: space-between` |
| `chai-gap-4` | `gap: 16px` |

### Grid
| Class | Style |
|-------|-------|
| `chai-grid` | `display: grid` |
| `chai-grid-cols-3` | `grid-template-columns: repeat(3, minmax(0, 1fr))` |
| `chai-col-span-2` | `grid-column: span 2 / span 2` |

### Sizing
| Class | Style |
|-------|-------|
| `chai-w-full` | `width: 100%` |
| `chai-h-screen` | `height: 100vh` |
| `chai-w-[200px]` | `width: 200px` *(arbitrary)* |
| `chai-max-w-3xl` | `max-width: 48rem` |

### Layout
| Class | Style |
|-------|-------|
| `chai-block` | `display: block` |
| `chai-hidden` | `display: none` |
| `chai-relative` | `position: relative` |
| `chai-absolute` | `position: absolute` |
| `chai-z-50` | `z-index: 50` |

### Interactivity
| Class | Style |
|-------|-------|
| `chai-cursor-pointer` | `cursor: pointer` |
| `chai-select-none` | `user-select: none` |
| `chai-opacity-50` | `opacity: 0.5` |

---

## 🏗️ Project Structure

```
tailzy/
├── index.html              # Demo page with all utilities
├── src/
│   ├── config.js           # Design tokens, colors, spacing scale
│   ├── utilities.js        # Utility class mappings
│   └── chaiTailwind.js     # Core engine (parser + applier + observer)
├── styles/
│   └── base.css            # Minimal reset + Neo-Brutalism base
└── README.md
```

---

## 🧪 How It Works

### 1. Engine Initialization

```javascript
// ChaiTailwind auto-initializes on DOMContentLoaded
ChaiTailwind.init();   // Scan DOM + start MutationObserver
```

### 2. Processing Flow

```
HTML: <div class="chai-bg-red chai-p-4">
           ↓
Parser: bg + red → { backgroundColor: '#ff2d2d' }
        p + 4   → { padding: '16px' }
           ↓
Applier: element.style.backgroundColor = '#ff2d2d'
         element.style.padding = '16px'
           ↓
Cleanup: classList.remove('chai-bg-red', 'chai-p-4')
```

### 3. Dynamic Content

```javascript
// New elements added via JS are auto-styled!
const newDiv = document.createElement('div');
newDiv.className = 'chai-bg-blue chai-p-6';
document.body.appendChild(newDiv); // Auto-processed by MutationObserver
```

---

## 🎨 Neo-Brutalism Design

This demo uses a bold Neo-Brutalism aesthetic:

- **Thick black borders** (`chai-border-4 chai-border-black`)
- **Hard drop shadows** (`chai-shadow-brutal` — no blur, pure offset)
- **Vibrant, clashing colors** (red, yellow, cyan, lime, pink)
- **Monospace typography** for that raw, industrial feel
- **No gradients, no soft edges** — everything is sharp and loud

---

## 🚀 Getting Started

### Option 1: Direct Include

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles/base.css">
</head>
<body>
  <div class="chai-bg-yellow chai-p-8 chai-border-4 chai-border-black chai-shadow-brutal">
    Hello ChaiTailwind!
  </div>

  <script src="src/config.js"></script>
  <script src="src/utilities.js"></script>
  <script src="src/chaiTailwind.js"></script>
</body>
</html>
```

### Option 2: CDN (after hosting)

```html
<script src="https://your-cdn-link/chaiTailwind.js"></script>
```

---

## 🧰 API Reference

| Method | Description |
|--------|-------------|
| `ChaiTailwind.init()` | Initialize engine (auto-called on load) |
| `ChaiTailwind.scan(root)` | Manually scan and process elements |
| `ChaiTailwind.process(element)` | Process a single element |
| `ChaiTailwind.parse(className)` | Parse a class and return styles |
| `ChaiTailwind.addUtility(prefix, fn)` | Register a custom utility |
| `ChaiTailwind.stop()` | Stop the MutationObserver |

---

## 📝 Custom Utilities

```javascript
// Add a custom utility
ChaiTailwind.addUtility('neo-glow', (value, config) => ({
  boxShadow: `0 0 ${value} #ff2d2d`
}));

// Use it in HTML
// <div class="chai-neo-glow-20px">Glowing!</div>
```

---

## 🧪 Browser Support

- Chrome/Edge 80+
- Firefox 75+
- Safari 13.1+

Requires `MutationObserver` and modern CSS support.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

Built with ☕ and pure JavaScript. No build tools. No dependencies. Just the DOM.


