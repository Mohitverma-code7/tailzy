/**
 * ChaiTailwind Utility Mappings
 * Maps chai-* class prefixes to CSS property generators.
 */

(function() {
  'use strict';

  // Utility registry: prefix -> handler function(value, config)
  const utilities = {};

  /**
   * Helper: get value from config scale or return raw value
   */
  function fromScale(scale, value, raw) {
    if (scale && scale[value] !== undefined) return scale[value];
    if (raw) return raw;
    return value;
  }

  /**
   * Helper: parse arbitrary value from brackets
   */
  function parseArbitrary(value) {
    const match = value.match(/^\[(.*)\]$/);
    return match ? match[1] : null;
  }

  /**
   * Helper: resolve a value (scale lookup or arbitrary)
   */
  function resolve(value, scale) {
    const arbitrary = parseArbitrary(value);
    if (arbitrary) return arbitrary;
    if (scale && scale[value] !== undefined) return scale[value];
    return value;
  }

  // ───────────────────────────────────────────────
  // SPACING UTILITIES
  // ───────────────────────────────────────────────

  // Padding
  utilities['p'] = (v, cfg) => ({ padding: resolve(v, cfg.spacing) });
  utilities['px'] = (v, cfg) => ({ paddingLeft: resolve(v, cfg.spacing), paddingRight: resolve(v, cfg.spacing) });
  utilities['py'] = (v, cfg) => ({ paddingTop: resolve(v, cfg.spacing), paddingBottom: resolve(v, cfg.spacing) });
  utilities['pt'] = (v, cfg) => ({ paddingTop: resolve(v, cfg.spacing) });
  utilities['pr'] = (v, cfg) => ({ paddingRight: resolve(v, cfg.spacing) });
  utilities['pb'] = (v, cfg) => ({ paddingBottom: resolve(v, cfg.spacing) });
  utilities['pl'] = (v, cfg) => ({ paddingLeft: resolve(v, cfg.spacing) });

  // Margin
  utilities['m'] = (v, cfg) => ({ margin: resolve(v, cfg.spacing) });
  utilities['mx'] = (v, cfg) => ({ marginLeft: resolve(v, cfg.spacing), marginRight: resolve(v, cfg.spacing) });
  utilities['my'] = (v, cfg) => ({ marginTop: resolve(v, cfg.spacing), marginBottom: resolve(v, cfg.spacing) });
  utilities['mt'] = (v, cfg) => ({ marginTop: resolve(v, cfg.spacing) });
  utilities['mr'] = (v, cfg) => ({ marginRight: resolve(v, cfg.spacing) });
  utilities['mb'] = (v, cfg) => ({ marginBottom: resolve(v, cfg.spacing) });
  utilities['ml'] = (v, cfg) => ({ marginLeft: resolve(v, cfg.spacing) });

  // ───────────────────────────────────────────────
  // COLOR UTILITIES
  // ───────────────────────────────────────────────

  // Background color
  utilities['bg'] = (v, cfg) => {
    const arbitrary = parseArbitrary(v);
    if (arbitrary) return { backgroundColor: arbitrary };
    // Handle nested colors like brutal-bg
    if (v.startsWith('brutal-')) {
      const key = v.replace('brutal-', '');
      if (cfg.colors.brutal && cfg.colors.brutal[key]) {
        return { backgroundColor: cfg.colors.brutal[key] };
      }
    }
    // Flat color lookup
    if (cfg.colors[v]) return { backgroundColor: cfg.colors[v] };
    return { backgroundColor: v };
  };

  // Text color
  utilities['text'] = (v, cfg) => {
    const arbitrary = parseArbitrary(v);
    if (arbitrary) {
      // Could be color or size - check if it has units or is a color value
      if (/^#|^rgb|^hsl/.test(arbitrary) || /^(red|blue|green|yellow|pink|purple|orange|cyan|lime|teal|gray|black|white)$/i.test(arbitrary)) {
        return { color: arbitrary };
      }
      // If it's a font size scale value in brackets, treat as size
      return { fontSize: arbitrary };
    }
    // Check font size scale first
    if (cfg.fontSize[v]) return { fontSize: cfg.fontSize[v] };
    // Check color
    if (cfg.colors[v]) return { color: cfg.colors[v] };
    // Check text align
    if (['left', 'center', 'right', 'justify', 'start', 'end'].includes(v)) {
      return { textAlign: v };
    }
    return { color: v };
  };

  // ───────────────────────────────────────────────
  // TYPOGRAPHY UTILITIES
  // ───────────────────────────────────────────────

  utilities['font'] = (v, cfg) => {
    if (cfg.fontWeight[v]) return { fontWeight: cfg.fontWeight[v] };
    if (['sans', 'serif', 'mono'].includes(v)) {
      const families = {
        sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
        mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      };
      return { fontFamily: families[v] };
    }
    return { fontFamily: v };
  };

  utilities['leading'] = (v, cfg) => ({ lineHeight: resolve(v, cfg.lineHeight) });

  utilities['tracking'] = (v, cfg) => {
    const trackingMap = {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    };
    if (trackingMap[v]) return { letterSpacing: trackingMap[v] };
    const arb = parseArbitrary(v);
    if (arb) return { letterSpacing: arb };
    return { letterSpacing: v };
  };

  utilities['uppercase'] = () => ({ textTransform: 'uppercase' });
  utilities['lowercase'] = () => ({ textTransform: 'lowercase' });
  utilities['capitalize'] = () => ({ textTransform: 'capitalize' });
  utilities['normalcase'] = () => ({ textTransform: 'none' });
  utilities['underline'] = () => ({ textDecoration: 'underline' });
  utilities['line-through'] = () => ({ textDecoration: 'line-through' });
  utilities['no-underline'] = () => ({ textDecoration: 'none' });
  utilities['italic'] = () => ({ fontStyle: 'italic' });
  utilities['not-italic'] = () => ({ fontStyle: 'normal' });

  // ───────────────────────────────────────────────
  // BORDER UTILITIES
  // ───────────────────────────────────────────────

  utilities['border'] = (v, cfg) => {
    if (!v) return { borderWidth: '1px', borderStyle: 'solid' };
    if (cfg.borderWidth[v]) return { borderWidth: cfg.borderWidth[v], borderStyle: 'solid' };
    if (cfg.colors[v]) return { borderColor: cfg.colors[v], borderStyle: 'solid' };
    const arb = parseArbitrary(v);
    if (arb) {
      if (/^#|^rgb|^hsl/.test(arb)) return { borderColor: arb, borderStyle: 'solid' };
      return { borderWidth: arb, borderStyle: 'solid' };
    }
    return { borderWidth: v, borderStyle: 'solid' };
  };

  utilities['border-t'] = (v, cfg) => ({ borderTopWidth: resolve(v, cfg.borderWidth), borderTopStyle: 'solid' });
  utilities['border-r'] = (v, cfg) => ({ borderRightWidth: resolve(v, cfg.borderWidth), borderRightStyle: 'solid' });
  utilities['border-b'] = (v, cfg) => ({ borderBottomWidth: resolve(v, cfg.borderWidth), borderBottomStyle: 'solid' });
  utilities['border-l'] = (v, cfg) => ({ borderLeftWidth: resolve(v, cfg.borderWidth), borderLeftStyle: 'solid' });

  utilities['border-color'] = (v, cfg) => {
    const arb = parseArbitrary(v);
    if (arb) return { borderColor: arb };
    if (cfg.colors[v]) return { borderColor: cfg.colors[v] };
    return { borderColor: v };
  };

  // Border radius
  utilities['rounded'] = (v, cfg) => {
    if (!v) return { borderRadius: cfg.borderRadius.md || '4px' };
    if (cfg.borderRadius[v]) return { borderRadius: cfg.borderRadius[v] };
    const arb = parseArbitrary(v);
    if (arb) return { borderRadius: arb };
    return { borderRadius: v };
  };

  utilities['rounded-t'] = (v, cfg) => {
    const r = v ? (cfg.borderRadius[v] || v) : (cfg.borderRadius.md || '4px');
    return { borderTopLeftRadius: r, borderTopRightRadius: r };
  };
  utilities['rounded-r'] = (v, cfg) => {
    const r = v ? (cfg.borderRadius[v] || v) : (cfg.borderRadius.md || '4px');
    return { borderTopRightRadius: r, borderBottomRightRadius: r };
  };
  utilities['rounded-b'] = (v, cfg) => {
    const r = v ? (cfg.borderRadius[v] || v) : (cfg.borderRadius.md || '4px');
    return { borderBottomRightRadius: r, borderBottomLeftRadius: r };
  };
  utilities['rounded-l'] = (v, cfg) => {
    const r = v ? (cfg.borderRadius[v] || v) : (cfg.borderRadius.md || '4px');
    return { borderTopLeftRadius: r, borderBottomLeftRadius: r };
  };

  // ───────────────────────────────────────────────
  // SIZING UTILITIES
  // ───────────────────────────────────────────────

  utilities['w'] = (v, cfg) => {
    if (cfg.sizing[v]) return { width: cfg.sizing[v] };
    if (v === '1/2') return { width: '50%' };
    if (v === '1/3') return { width: '33.333333%' };
    if (v === '2/3') return { width: '66.666667%' };
    if (v === '1/4') return { width: '25%' };
    if (v === '3/4') return { width: '75%' };
    if (v === '1/5') return { width: '20%' };
    if (v === '2/5') return { width: '40%' };
    if (v === '3/5') return { width: '60%' };
    if (v === '4/5') return { width: '80%' };
    const arb = parseArbitrary(v);
    if (arb) return { width: arb };
    return { width: v };
  };

  utilities['h'] = (v, cfg) => {
    if (cfg.sizing[v]) return { height: cfg.sizing[v] };
    if (v === '1/2') return { height: '50%' };
    if (v === '1/3') return { height: '33.333333%' };
    if (v === '2/3') return { height: '66.666667%' };
    if (v === '1/4') return { height: '25%' };
    if (v === '3/4') return { height: '75%' };
    const arb = parseArbitrary(v);
    if (arb) return { height: arb };
    return { height: v };
  };

  utilities['min-w'] = (v, cfg) => ({ minWidth: resolve(v, cfg.sizing) });
  utilities['min-h'] = (v, cfg) => ({ minHeight: resolve(v, cfg.sizing) });
  utilities['max-w'] = (v, cfg) => ({ maxWidth: resolve(v, cfg.sizing) });
  utilities['max-h'] = (v, cfg) => ({ maxHeight: resolve(v, cfg.sizing) });

  // ───────────────────────────────────────────────
  // LAYOUT UTILITIES
  // ───────────────────────────────────────────────

  // Display
  utilities['block'] = () => ({ display: 'block' });
  utilities['inline'] = () => ({ display: 'inline' });
  utilities['inline-block'] = () => ({ display: 'inline-block' });
  utilities['flex'] = () => ({ display: 'flex' });
  utilities['inline-flex'] = () => ({ display: 'inline-flex' });
  utilities['grid'] = () => ({ display: 'grid' });
  utilities['inline-grid'] = () => ({ display: 'inline-grid' });
  utilities['hidden'] = () => ({ display: 'none' });
  utilities['table'] = () => ({ display: 'table' });

  // Flexbox
  utilities['flex-row'] = () => ({ flexDirection: 'row' });
  utilities['flex-row-reverse'] = () => ({ flexDirection: 'row-reverse' });
  utilities['flex-col'] = () => ({ flexDirection: 'column' });
  utilities['flex-col-reverse'] = () => ({ flexDirection: 'column-reverse' });
  utilities['flex-wrap'] = () => ({ flexWrap: 'wrap' });
  utilities['flex-nowrap'] = () => ({ flexWrap: 'nowrap' });
  utilities['flex-wrap-reverse'] = () => ({ flexWrap: 'wrap-reverse' });

  utilities['items-start'] = () => ({ alignItems: 'flex-start' });
  utilities['items-end'] = () => ({ alignItems: 'flex-end' });
  utilities['items-center'] = () => ({ alignItems: 'center' });
  utilities['items-baseline'] = () => ({ alignItems: 'baseline' });
  utilities['items-stretch'] = () => ({ alignItems: 'stretch' });

  utilities['justify-start'] = () => ({ justifyContent: 'flex-start' });
  utilities['justify-end'] = () => ({ justifyContent: 'flex-end' });
  utilities['justify-center'] = () => ({ justifyContent: 'center' });
  utilities['justify-between'] = () => ({ justifyContent: 'space-between' });
  utilities['justify-around'] = () => ({ justifyContent: 'space-around' });
  utilities['justify-evenly'] = () => ({ justifyContent: 'space-evenly' });

  utilities['flex-1'] = () => ({ flex: '1 1 0%' });
  utilities['flex-auto'] = () => ({ flex: '1 1 auto' });
  utilities['flex-initial'] = () => ({ flex: '0 1 auto' });
  utilities['flex-none'] = () => ({ flex: 'none' });
  utilities['grow'] = () => ({ flexGrow: '1' });
  utilities['grow-0'] = () => ({ flexGrow: '0' });
  utilities['shrink'] = () => ({ flexShrink: '1' });
  utilities['shrink-0'] = () => ({ flexShrink: '0' });

  // Gap
  utilities['gap'] = (v, cfg) => ({ gap: resolve(v, cfg.spacing) });
  utilities['gap-x'] = (v, cfg) => ({ columnGap: resolve(v, cfg.spacing) });
  utilities['gap-y'] = (v, cfg) => ({ rowGap: resolve(v, cfg.spacing) });

  // Grid
  utilities['grid-cols'] = (v, cfg) => {
    if (v === 'none') return { gridTemplateColumns: 'none' };
    const num = parseInt(v, 10);
    if (!isNaN(num)) return { gridTemplateColumns: `repeat(${num}, minmax(0, 1fr))` };
    return { gridTemplateColumns: v };
  };

  utilities['grid-rows'] = (v, cfg) => {
    if (v === 'none') return { gridTemplateRows: 'none' };
    const num = parseInt(v, 10);
    if (!isNaN(num)) return { gridTemplateRows: `repeat(${num}, minmax(0, 1fr))` };
    return { gridTemplateRows: v };
  };

  utilities['col-span'] = (v, cfg) => {
    if (v === 'full') return { gridColumn: '1 / -1' };
    return { gridColumn: `span ${v} / span ${v}` };
  };

  // Position
  utilities['static'] = () => ({ position: 'static' });
  utilities['fixed'] = () => ({ position: 'fixed' });
  utilities['absolute'] = () => ({ position: 'absolute' });
  utilities['relative'] = () => ({ position: 'relative' });
  utilities['sticky'] = () => ({ position: 'sticky' });

  // Inset
  utilities['inset'] = (v, cfg) => ({ top: resolve(v, cfg.spacing), right: resolve(v, cfg.spacing), bottom: resolve(v, cfg.spacing), left: resolve(v, cfg.spacing) });
  utilities['inset-x'] = (v, cfg) => ({ left: resolve(v, cfg.spacing), right: resolve(v, cfg.spacing) });
  utilities['inset-y'] = (v, cfg) => ({ top: resolve(v, cfg.spacing), bottom: resolve(v, cfg.spacing) });
  utilities['top'] = (v, cfg) => ({ top: resolve(v, cfg.spacing) });
  utilities['right'] = (v, cfg) => ({ right: resolve(v, cfg.spacing) });
  utilities['bottom'] = (v, cfg) => ({ bottom: resolve(v, cfg.spacing) });
  utilities['left'] = (v, cfg) => ({ left: resolve(v, cfg.spacing) });

  // Z-index
  utilities['z'] = (v, cfg) => ({ zIndex: resolve(v, cfg.zIndex) });

  // Overflow
  utilities['overflow-auto'] = () => ({ overflow: 'auto' });
  utilities['overflow-hidden'] = () => ({ overflow: 'hidden' });
  utilities['overflow-visible'] = () => ({ overflow: 'visible' });
  utilities['overflow-scroll'] = () => ({ overflow: 'scroll' });
  utilities['overflow-x-auto'] = () => ({ overflowX: 'auto' });
  utilities['overflow-y-auto'] = () => ({ overflowY: 'auto' });
  utilities['overflow-x-hidden'] = () => ({ overflowX: 'hidden' });
  utilities['overflow-y-hidden'] = () => ({ overflowY: 'hidden' });

  // ───────────────────────────────────────────────
  // SHADOW UTILITIES
  // ───────────────────────────────────────────────

  utilities['shadow'] = (v, cfg) => {
    if (!v) return { boxShadow: cfg.boxShadow.md || '4px 4px 0px 0px #000' };
    if (cfg.boxShadow[v]) return { boxShadow: cfg.boxShadow[v] };
    const arb = parseArbitrary(v);
    if (arb) return { boxShadow: arb };
    return { boxShadow: v };
  };

  // ───────────────────────────────────────────────
  // CURSOR & INTERACTIVITY
  // ───────────────────────────────────────────────

  utilities['cursor'] = (v, cfg) => ({ cursor: v });
  utilities['pointer-events-none'] = () => ({ pointerEvents: 'none' });
  utilities['pointer-events-auto'] = () => ({ pointerEvents: 'auto' });
  utilities['select-none'] = () => ({ userSelect: 'none' });
  utilities['select-text'] = () => ({ userSelect: 'text' });
  utilities['select-all'] = () => ({ userSelect: 'all' });
  utilities['select-auto'] = () => ({ userSelect: 'auto' });

  // ───────────────────────────────────────────────
  // OPACITY
  // ───────────────────────────────────────────────

  utilities['opacity'] = (v, cfg) => {
    const arb = parseArbitrary(v);
    if (arb) return { opacity: arb };
    return { opacity: (parseInt(v, 10) / 100).toString() };
  };

  // ───────────────────────────────────────────────
  // OBJECT FIT & POSITION
  // ───────────────────────────────────────────────

  utilities['object-contain'] = () => ({ objectFit: 'contain' });
  utilities['object-cover'] = () => ({ objectFit: 'cover' });
  utilities['object-fill'] = () => ({ objectFit: 'fill' });
  utilities['object-none'] = () => ({ objectFit: 'none' });
  utilities['object-scale-down'] = () => ({ objectFit: 'scale-down' });

  // ───────────────────────────────────────────────
  // LIST STYLE
  // ───────────────────────────────────────────────

  utilities['list-none'] = () => ({ listStyleType: 'none' });
  utilities['list-disc'] = () => ({ listStyleType: 'disc' });
  utilities['list-decimal'] = () => ({ listStyleType: 'decimal' });

  // ───────────────────────────────────────────────
  // TRANSFORMS
  // ───────────────────────────────────────────────

  utilities['rotate'] = (v, cfg) => {
    const arb = parseArbitrary(v);
    if (arb) return { transform: `rotate(${arb})` };
    return { transform: `rotate(${v}deg)` };
  };

  utilities['scale'] = (v, cfg) => {
    const arb = parseArbitrary(v);
    if (arb) return { transform: `scale(${arb})` };
    return { transform: `scale(${v})` };
  };

  // ───────────────────────────────────────────────
  // TRANSITIONS
  // ───────────────────────────────────────────────

  utilities['transition'] = (v, cfg) => {
    if (!v || v === 'default') return { transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', transitionDuration: '150ms' };
    if (v === 'none') return { transitionProperty: 'none' };
    if (v === 'all') return { transitionProperty: 'all', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', transitionDuration: '150ms' };
    if (v === 'colors') return { transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', transitionDuration: '150ms' };
    if (v === 'opacity') return { transitionProperty: 'opacity', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', transitionDuration: '150ms' };
    if (v === 'shadow') return { transitionProperty: 'box-shadow', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', transitionDuration: '150ms' };
    if (v === 'transform') return { transitionProperty: 'transform', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', transitionDuration: '150ms' };
    return { transitionProperty: v };
  };

  // ───────────────────────────────────────────────
  // ASPECT RATIO
  // ───────────────────────────────────────────────

  utilities['aspect'] = (v, cfg) => {
    if (v === 'auto') return { aspectRatio: 'auto' };
    if (v === 'square') return { aspectRatio: '1 / 1' };
    if (v === 'video') return { aspectRatio: '16 / 9' };
    const arb = parseArbitrary(v);
    if (arb) return { aspectRatio: arb };
    return { aspectRatio: v };
  };

  // ───────────────────────────────────────────────
  // EXPOSE
  // ───────────────────────────────────────────────

  window.ChaiUtilities = utilities;

})();

