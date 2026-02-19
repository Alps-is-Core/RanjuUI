<div align="center">

# △ RanjuUI

**The last UI library you'll ever need.**

A ridiculously lightweight, zero-dependency component library built with nothing but HTML, CSS, and a sprinkle of vanilla JavaScript. No React. No Vue. No build step. No nonsense.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Components](https://img.shields.io/badge/Components-40%2B-green.svg)](#components)
[![Dependencies](https://img.shields.io/badge/Dependencies-0-orange.svg)](#)
[![Size](https://img.shields.io/badge/Size-~22KB-purple.svg)](#)

[**Live Demo & Docs →**](https://alps-is-core.github.io/RanjuUI/)

</div>

---

## Why RanjuUI?

Every modern UI library wants you to install 200MB of node_modules, learn a framework, configure a bundler, and sacrifice your firstborn to the JavaScript gods.

**RanjuUI says no.**

Two files. Drop them in. You're done. Every component you actually need — from accordions to toasts, calendars to command palettes — styled beautifully out of the box with dark mode, accessibility, and responsive design baked in.

| | RanjuUI | The Other Guys |
|---|---------|---------------|
| **Install** | 2 files, 1 second | `npm install` → 5 minutes, 847 packages |
| **Bundle size** | ~22 KB total | 200+ KB minimum |
| **Dependencies** | 0 | 37 (and counting) |
| **Build step** | None | Webpack/Vite/Turbopack/??? |
| **Framework lock-in** | None | Total |
| **Works in 2030** | Yes | Probably deprecated |

## Quick Start

```html
<link rel="stylesheet" href="ranju.css">
<script src="ranju.js" defer></script>
```

That's it.  No `npm install`. No `package.json`. No config files. No CLI. No plugins. No loaders. Just works.

## What's Inside

**40+ production-ready components** covering everything a modern web app needs:

### Layout & Foundation
`Typography` · `Grid` · `Container` · `Flex Utilities` · `Spacing` · `Aspect Ratio` · `Separator` · `Scroll Area`

### Data Display
`Avatar` · `Badge` · `Card` · `Data Table` · `Empty State` · `Kbd` · `Skeleton` · `Meter` · `Progress` · `Spinner`

### Forms & Input
`Button` (6 variants, 4 sizes) · `Input` · `Textarea` · `Checkbox` · `Radio` · `Switch` · `Slider` · `Toggle` · `Combobox` · `Select` · `Label` · `Input Group`

### Navigation
`Breadcrumb` · `Menubar` · `Navbar` · `Pagination` · `Sidebar` · `Tabs`

### Overlays & Feedback
`Accordion` · `Alert` · `Calendar` · `Carousel` · `Collapsible` · `Command Palette` · `Context Menu` · `Dialog` · `Drawer` · `Dropdown` · `Hover Card` · `Popover` · `Sheet` · `Toast` · `Tooltip`

### Utilities
`Animations` · `Shadows` · `Responsive Helpers` · `Item Group` · `Print Styles`

## Dark Mode

RanjuUI ships with a complete dark theme that auto-detects your system preference and remembers the user's choice.

```js
Ranju.theme.toggle();       // flip between light & dark
Ranju.theme.set('dark');    // force dark mode
Ranju.theme.current();      // returns 'light' or 'dark'
```

Or just set `data-theme="dark"` on your `<html>` tag. Done.

## JavaScript API

Minimal, powerful, no ceremony:

```js
// Toast notifications
Ranju.toast({
  title: 'Deployed!',
  description: 'Your site is live.',
  variant: 'success',
  position: 'bottom-right'
});

// Dialogs
Ranju.dialog.open('my-dialog');
Ranju.dialog.close('my-dialog');

// Command palette (Ctrl+K built-in)
Ranju.command.open('cmd');

// Calendar
Ranju.calendar(document.querySelector('.calendar'), {
  onSelect: (date) => console.log(date)
});
```

## Customization

Override CSS custom properties to match your brand in seconds:

```css
:root {
  --primary: #8b5cf6;
  --primary-fg: #ffffff;
  --primary-hover: #7c3aed;
  --radius: 0.75rem;
  --font-sans: 'Your Font', system-ui, sans-serif;
}
```

Every color, shadow, radius, font, and transition is a CSS variable. Change one line, transform everything.

## Browser Support

Chrome · Firefox · Safari · Edge — all modern browsers. Uses standard CSS and ES5 JavaScript. No polyfills needed.

## Philosophy

If the browser already has a native element for it, RanjuUI uses it. No reinventing `<button>`. No virtual DOM. No abstraction layers. Just semantic HTML enhanced with clean CSS and the minimum JavaScript required to make interactive components work.

The result? A library that's fast, accessible, and will still work perfectly in 10 years.

## Contributing

Found a bug? Have an idea? PRs and issues are welcome.

## License

[MIT](LICENSE) — do whatever you want with it.

---

<div align="center">

**Built by [alps](https://github.com/Alps-is-Core)**

*No frameworks were harmed in the making of this library.*

</div>
