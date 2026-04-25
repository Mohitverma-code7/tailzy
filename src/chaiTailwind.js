/**
 * ChaiTailwind — Core Engine
 * Scans DOM for chai-* classes, parses them, applies inline styles, cleans up.
 */

(function() {
  'use strict';

  // ───────────────────────────────────────────────
  // CONFIG & UTILITIES
  // ───────────────────────────────────────────────

  const config = window.CHAI_CONFIG || {};
  const utilities = window.ChaiUtilities || {};

  // Regex to match chai-* classes
  const CHAI_CLASS_REGEX = /^chai-(.+)$/;

  // Cache for parsed styles to avoid re-computation
  const styleCache = new Map();

  // Set to track processed elements
  const processedElements = new WeakSet();

  // ───────────────────────────────────────────────
  // PARSER
  // ───────────────────────────────────────────────

  /**
   * Parse a single chai-* class into style declarations.
   * @param {string} className - e.g. "chai-p-4", "chai-bg-red", "chai-w-[100px]"
   * @returns {Object|null} - style declarations or null
   */
  function parseClass(className) {
    if (styleCache.has(className)) {
      return styleCache.get(className);
    }

    const match = className.match(CHAI_CLASS_REGEX);
    if (!match) return null;

    const rest = match[1];

    // Try exact match first (e.g., "flex", "hidden", "uppercase")
    if (utilities[rest]) {
      const styles = utilities[rest](undefined, config);
      styleCache.set(className, styles);
      return styles;
    }

    // Try prefix match with value (e.g., "p-4", "bg-red", "w-[100px]")
    // Find the longest matching prefix
    let prefix = '';
    let value = '';

    for (let i = 1; i <= rest.length; i++) {
      const p = rest.slice(0, i);
      const v = rest.slice(i + 1); // +1 for the hyphen
      if (utilities[p] && rest[i] === '-') {
        prefix = p;
        value = v;
      }
    }

    if (prefix && utilities[prefix]) {
      const styles = utilities[prefix](value, config);
      styleCache.set(className, styles);
      return styles;
    }

    // Try compound prefixes (e.g., "border-t-2", "rounded-t-lg", "flex-row")
    const compoundMatch = rest.match(/^([a-z]+-[a-z]+)-(.+)$/);
    if (compoundMatch) {
      const compoundPrefix = compoundMatch[1];
      const compoundValue = compoundMatch[2];
      if (utilities[compoundPrefix]) {
        const styles = utilities[compoundPrefix](compoundValue, config);
        styleCache.set(className, styles);
        return styles;
      }
    }

    // Try three-part compound (e.g., "border-t-color-red" - not common but handle)
    const tripleMatch = rest.match(/^([a-z]+-[a-z]+-[a-z]+)-(.+)$/);
    if (tripleMatch) {
      const triplePrefix = tripleMatch[1];
      const tripleValue = tripleMatch[2];
      if (utilities[triplePrefix]) {
        const styles = utilities[triplePrefix](tripleValue, config);
        styleCache.set(className, styles);
        return styles;
      }
    }

    styleCache.set(className, null);
    return null;
  }

  // ───────────────────────────────────────────────
  // STYLE APPLIER
  // ───────────────────────────────────────────────

  /**
   * Apply parsed styles to an element.
   * @param {HTMLElement} element
   * @param {Object} styles
   */
  function applyStyles(element, styles) {
    if (!styles || typeof styles !== 'object') return;
    Object.entries(styles).forEach(([property, value]) => {
      if (value !== undefined && value !== null) {
        element.style[property] = value;
      }
    });
  }

  // ───────────────────────────────────────────────
  // ELEMENT PROCESSOR
  // ───────────────────────────────────────────────

  /**
   * Process a single element: parse chai-* classes, apply styles, remove classes.
   * @param {HTMLElement} element
   */
  function processElement(element) {
    if (processedElements.has(element)) return;
    processedElements.add(element);

    const classList = Array.from(element.classList);
    const chaiClasses = classList.filter(c => CHAI_CLASS_REGEX.test(c));

    if (chaiClasses.length === 0) return;

    const allStyles = {};

    chaiClasses.forEach(className => {
      const styles = parseClass(className);
      if (styles) {
        Object.assign(allStyles, styles);
      }
    });

    // Apply all collected styles
    applyStyles(element, allStyles);

    // Remove chai-* classes from the element
    chaiClasses.forEach(className => {
      element.classList.remove(className);
    });

    // Mark element as processed by chai
    element.setAttribute('data-chai-processed', 'true');
  }

  // ───────────────────────────────────────────────
  // DOM SCANNER
  // ───────────────────────────────────────────────

  /**
   * Scan and process all elements with chai-* classes.
   * @param {HTMLElement} root - root element to scan within
   */
  function scanAndProcess(root = document) {
    // Query all elements that have at least one chai-* class
    const elements = root.querySelectorAll('[class*="chai-"]');
    elements.forEach(processElement);
  }

  // ───────────────────────────────────────────────
  // MUTATION OBSERVER (Reactivity)
  // ───────────────────────────────────────────────

  let observer = null;

  function startObserver() {
    if (observer) return;

    observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        // Process added nodes
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // If the added node itself has chai-* classes
            if (node.classList && node.classList.toString().includes('chai-')) {
              processElement(node);
            }
            // Process children
            if (node.querySelectorAll) {
              const children = node.querySelectorAll('[class*="chai-"]');
              children.forEach(processElement);
            }
          }
        });

        // Process attribute changes (class additions)
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target.classList && target.classList.toString().includes('chai-')) {
            // Re-process if new chai-* classes were added
            processedElements.delete(target);
            processElement(target);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  function stopObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  // ───────────────────────────────────────────────
  // PUBLIC API
  // ───────────────────────────────────────────────

  const ChaiTailwind = {
    /**
     * Initialize the engine: scan DOM and start observer.
     */
    init() {
      scanAndProcess();
      startObserver();
      console.log('%c☕ ChaiTailwind initialized', 'color: #ff2d2d; font-weight: bold; font-size: 14px;');
    },

    /**
     * Manually scan and process elements.
     * @param {HTMLElement} root
     */
    scan(root = document) {
      scanAndProcess(root);
    },

    /**
     * Process a single element.
     * @param {HTMLElement} element
     */
    process(element) {
      if (element && element.nodeType === Node.ELEMENT_NODE) {
        processedElements.delete(element);
        processElement(element);
      }
    },

    /**
     * Parse a class name and return styles (for testing/debugging).
     * @param {string} className
     * @returns {Object|null}
     */
    parse(className) {
      return parseClass(className);
    },

    /**
     * Add a custom utility.
     * @param {string} prefix
     * @param {Function} handler
     */
    addUtility(prefix, handler) {
      utilities[prefix] = handler;
      // Clear cache since new utility added
      styleCache.clear();
    },

    /**
     * Stop the mutation observer.
     */
    stop() {
      stopObserver();
    },

    /**
     * Get current config.
     */
    getConfig() {
      return config;
    },

    /**
     * Get all registered utilities.
     */
    getUtilities() {
      return Object.keys(utilities);
    },
  };

  // ───────────────────────────────────────────────
  // AUTO-INIT
  // ───────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ChaiTailwind.init());
  } else {
    // DOM already loaded
    ChaiTailwind.init();
  }

  // Expose globally
  window.ChaiTailwind = ChaiTailwind;

})();

