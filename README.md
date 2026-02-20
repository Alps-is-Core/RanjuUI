# RanjuUI

> Semantic, lightweight, zero dependencies. ~54KB CSS + ~21KB JS.

RanjuUI is an ultra-lightweight HTML + CSS + JS UI component library. No framework, no build tools. 40+ production-ready components with dark mode, responsive design, and semantic HTML.

**[📖 Full Documentation](https://alps-is-core.github.io/RanjuUI/)** · **[Examples](https://alps-is-core.github.io/RanjuUI/examples/)**

---

## Install

### CDN (quickest)

```html
<link rel="stylesheet" href="https://alps-is-core.github.io/RanjuUI/ranju.css">
<script src="https://alps-is-core.github.io/RanjuUI/ranju.js" defer></script>
```

### Self-hosted

Download [ranju.css](https://raw.githubusercontent.com/Alps-is-Core/RanjuUI/master/ranju.css) and [ranju.js](https://raw.githubusercontent.com/Alps-is-Core/RanjuUI/master/ranju.js) and reference them:

```html
<link rel="stylesheet" href="ranju.css">
<script src="ranju.js" defer></script>
```

### npm

```bash
npm install @alps/ranjuui
```

---

## Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://alps-is-core.github.io/RanjuUI/ranju.css">
</head>
<body>
  <button class="btn">Primary</button>
  <button class="btn btn-outline">Outline</button>
  <div class="card">
    <div class="card-header"><div class="card-title">Title</div></div>
    <div class="card-content">Content here</div>
  </div>
  <script src="https://alps-is-core.github.io/RanjuUI/ranju.js" defer></script>
</body>
</html>
```

---

## Docs & Examples

| Resource | Link |
|----------|------|
| **Full component reference** | [alps-is-core.github.io/RanjuUI](https://alps-is-core.github.io/RanjuUI/) |
| **SaaS landing page** | [examples/saas-landing.html](https://alps-is-core.github.io/RanjuUI/examples/saas-landing.html) |
| **Dashboard app** | [examples/dashboard.html](https://alps-is-core.github.io/RanjuUI/examples/dashboard.html) |

The docs site has live demos and copy-paste code for every component: buttons, cards, dialogs, forms, tables, toasts, and 35+ more.

---

## Components

**Layout:** Typography · Grid · Container · Flex · Spacing · Separator · Scroll Area

**Display:** Avatar · Badge · Card · Data Table · Empty State · Kbd · Skeleton · Meter · Progress · Spinner

**Forms:** Button · Input · Textarea · Checkbox · Radio · Switch · Slider · Toggle · Combobox

**Navigation:** Breadcrumb · Menubar · Navbar · Pagination · Sidebar · Tabs

**Overlays:** Accordion · Alert · Calendar · Carousel · Collapsible · Command · Context Menu · Dialog · Drawer · Dropdown · Hover Card · Popover · Sheet · Toast · Tooltip

---

## Individual Components

Want only a subset? Import specific files from `src/css/` and `src/js/`:

```
src/css/button.css   src/css/card.css   src/css/dialog.css   ...
src/js/toast.js      src/js/dialog.js   src/js/command.js    ...
```

Or use the bundled `ranju.css` + `ranju.js` for everything.

---

## Build

```bash
make dist    # concatenate src/* into ranju.css and ranju.js
make clean   # remove built files
```

---

## License

[MIT](LICENSE)
