# RanjuUI

> Semantic, lightweight, zero dependencies. ~54KB CSS + ~21KB JS.

RanjuUI is an ultra-lightweight HTML + CSS + JS UI component library with zero dependencies. No framework, no build tools, no complexity. Just include two files and start building.

40+ production-ready components styled with CSS custom properties, dark mode support, and responsive design out of the box. Semantic HTML and ARIA attributes throughout.

**[Live Demo & Docs](https://alps-is-core.github.io/RanjuUI/)** · **[Examples](https://alps-is-core.github.io/RanjuUI/examples/)**

---

## Table of Contents

- [Install](#install)
- [Dark Mode](#dark-mode)
- [Customization](#customization)
- [JavaScript API](#javascript-api)
- [Components](#components)
  - [Typography](#typography)
  - [Grid & Layout](#grid--layout)
  - [Button](#button)
  - [Card](#card)
  - [Alert](#alert)
  - [Badge](#badge)
  - [Avatar](#avatar)
  - [Accordion](#accordion)
  - [Tabs](#tabs)
  - [Dialog](#dialog)
  - [Drawer & Sheet](#drawer--sheet)
  - [Dropdown](#dropdown)
  - [Toast](#toast)
  - [Tooltip](#tooltip)
  - [Popover](#popover)
  - [Command Palette](#command-palette)
  - [Calendar](#calendar)
  - [Input & Textarea](#input--textarea)
  - [Checkbox & Radio](#checkbox--radio)
  - [Switch](#switch)
  - [Toggle](#toggle)
  - [Slider](#slider)
  - [Combobox](#combobox)
  - [Data Table](#data-table)
  - [Breadcrumb](#breadcrumb)
  - [Pagination](#pagination)
  - [Navbar & Menubar](#navbar--menubar)
  - [Sidebar](#sidebar)
  - [Progress](#progress)
  - [Meter](#meter)
  - [Spinner](#spinner)
  - [Skeleton](#skeleton)
  - [Carousel](#carousel)
  - [Context Menu](#context-menu)
  - [Hover Card](#hover-card)
  - [Collapsible](#collapsible)
  - [Separator](#separator)
  - [Kbd](#kbd)
  - [Empty State](#empty-state)
  - [Scroll Area](#scroll-area)
  - [Resizable](#resizable)
  - [Item Group](#item-group)
- [Utilities](#utilities)
- [Individual Components](#individual-components)
- [Build](#build)
- [Project Structure](#project-structure)
- [Examples](#examples)
- [Browser Support](#browser-support)
- [License](#license)

---

## Install

### CDN (quickest)

```html
<link rel="stylesheet" href="https://alps-is-core.github.io/RanjuUI/ranju.css">
<script src="https://alps-is-core.github.io/RanjuUI/ranju.js" defer></script>
```

### Self-hosted

Download `ranju.css` and `ranju.js` from this repo and reference them:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="ranju.css">
</head>
<body>
  <h1>Hello RanjuUI</h1>
  <button class="btn">Click me</button>
  <script src="ranju.js" defer></script>
</body>
</html>
```

### npm

```bash
npm install @alps/ranjuui
```

Then reference the files from `node_modules/@alps/ranjuui/ranju.css` and `ranju.js`, or import individual components from `src/css/` and `src/js/`.

---

## Dark Mode

RanjuUI auto-detects the user's system color scheme preference and applies dark mode automatically. The choice persists in `localStorage`.

```html
<!-- Force dark mode -->
<html data-theme="dark">

<!-- Force light mode -->
<html data-theme="light">
```

Toggle programmatically:

```js
Ranju.theme.toggle()       // switch between light and dark
Ranju.theme.set('dark')    // force dark
Ranju.theme.set('light')   // force light
Ranju.theme.current()      // returns 'light' or 'dark'
```

---

## Customization

Every visual property is a CSS custom property. Override them on `:root` to match your brand:

```css
:root {
  /* Colors */
  --primary: #8b5cf6;
  --primary-fg: #ffffff;
  --primary-hover: #7c3aed;
  --destructive: #ef4444;
  --success: #10b981;
  --warning: #f59e0b;

  /* Shape */
  --radius: 0.75rem;
  --radius-sm: 0.375rem;
  --radius-lg: 1rem;

  /* Typography */
  --font-sans: 'Poppins', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;

  /* Shadows */
  --shadow: 0 1px 3px rgba(0,0,0,.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,.1);

  /* Transitions */
  --transition: 200ms ease;
}
```

Dark mode overrides go on `[data-theme="dark"]`:

```css
[data-theme="dark"] {
  --primary: #a78bfa;
  --bg: #0a0a0a;
  --fg: #fafafa;
}
```

---

## JavaScript API

All interactive components auto-initialize on page load. You also get these APIs on the global `Ranju` object:

### `Ranju.theme`

```js
Ranju.theme.current()      // 'light' or 'dark'
Ranju.theme.set('dark')    // set theme
Ranju.theme.toggle()       // toggle theme
```

### `Ranju.toast(options)`

```js
Ranju.toast({
  title: 'File uploaded',
  description: 'document.pdf has been saved.',
  variant: 'success',         // 'success' | 'destructive' | 'warning' | undefined
  duration: 4000,              // milliseconds, 0 = persistent
  position: 'bottom-right'    // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
})
```

### `Ranju.dialog`

```js
Ranju.dialog.open('dialog-id')
Ranju.dialog.close('dialog-id')
```

### `Ranju.command`

```js
Ranju.command.open('palette-id')
Ranju.command.close('palette-id')
```

### `Ranju.calendar(element, options)`

```js
Ranju.calendar(document.querySelector('.my-calendar'), {
  onSelect: function(date) {
    console.log('Selected:', date)
  }
})
```

---

## Components

### Typography

Headings, text sizes, weights, and inline elements are styled out of the box.

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>

<p>Paragraph with <strong>bold</strong>, <em>italic</em>, <code>code</code>, and <mark>highlighted</mark> text.</p>
<p class="text-muted text-sm">Muted secondary text.</p>

<blockquote>A blockquote for pull quotes.</blockquote>

<pre><code>const x = 'preformatted code block';</code></pre>
```

Text utility classes: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-muted`, `text-primary`, `text-success`, `text-warning`, `text-destructive`, `text-center`, `text-right`, `font-medium`, `font-semibold`, `font-bold`, `font-mono`.

### Grid & Layout

```html
<!-- 3-column grid -->
<div class="grid grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Flex row -->
<div class="flex items-center justify-between gap-4">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Container -->
<div class="container">
  Max-width centered content
</div>
```

Grid classes: `grid-cols-1` through `grid-cols-12`, `col-span-2` through `col-span-full`.

Flex: `flex`, `flex-col`, `flex-wrap`, `flex-1`, `items-center`, `items-start`, `items-end`, `justify-center`, `justify-between`, `justify-end`.

Spacing: `gap-1` to `gap-8`, `p-0` to `p-8`, `px-2` to `px-4`, `py-1` to `py-8`, `mt-1` to `mt-8`, `mb-1` to `mb-8`, `mx-auto`, `space-y-2`, `space-y-4`, `space-y-6`.

### Button

```html
<!-- Variants -->
<button class="btn">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-destructive">Destructive</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
<a href="#" class="btn btn-link">Link</a>

<!-- Sizes -->
<button class="btn btn-sm">Small</button>
<button class="btn">Default</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-xl">Extra Large</button>

<!-- Icon button -->
<button class="btn btn-icon btn-outline" aria-label="Settings">⚙</button>

<!-- Loading state -->
<button class="btn btn-loading">Saving...</button>

<!-- Disabled -->
<button class="btn" disabled>Disabled</button>

<!-- Button group -->
<div class="btn-group">
  <button class="btn btn-outline">Left</button>
  <button class="btn btn-outline">Center</button>
  <button class="btn btn-outline">Right</button>
</div>
```

### Card

```html
<div class="card">
  <div class="card-header">
    <div class="card-title">Project Settings</div>
    <div class="card-description">Manage your project configuration.</div>
  </div>
  <div class="card-content">
    <div class="field">
      <label class="label">Project Name</label>
      <input type="text" class="input" value="my-app">
    </div>
  </div>
  <div class="card-footer">
    <button class="btn btn-sm">Save</button>
    <button class="btn btn-sm btn-outline">Cancel</button>
  </div>
</div>

<!-- Hoverable card -->
<div class="card card-hover">
  <div class="card-content">Hover me for a lift effect.</div>
</div>
```

### Alert

```html
<div class="alert alert-info">
  <div class="alert-content">
    <div class="alert-title">Heads up</div>
    <div class="alert-description">You can add components to your app using the CLI.</div>
  </div>
  <button class="alert-close">&times;</button>
</div>

<div class="alert alert-success">
  <div class="alert-content">
    <div class="alert-title">Success</div>
    <div class="alert-description">Your changes have been saved.</div>
  </div>
</div>

<div class="alert alert-warning">
  <div class="alert-content">
    <div class="alert-title">Warning</div>
    <div class="alert-description">Your trial expires in 3 days.</div>
  </div>
</div>

<div class="alert alert-destructive">
  <div class="alert-content">
    <div class="alert-title">Error</div>
    <div class="alert-description">Failed to delete resource. Please try again.</div>
  </div>
</div>
```

The dismiss button (`.alert-close`) auto-animates the alert away on click.

### Badge

```html
<span class="badge">Default</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-outline">Outline</span>
<span class="badge badge-destructive">Destructive</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-ghost">Ghost</span>

<!-- With dot indicator -->
<span class="badge badge-success badge-dot">Online</span>

<!-- Large -->
<span class="badge badge-lg">Large Badge</span>
```

### Avatar

```html
<!-- Sizes -->
<div class="avatar avatar-sm">SM</div>
<div class="avatar">MD</div>
<div class="avatar avatar-lg">LG</div>
<div class="avatar avatar-xl">XL</div>

<!-- With image -->
<div class="avatar">
  <img src="photo.jpg" alt="User">
</div>

<!-- Avatar group (stacked) -->
<div class="avatar-group">
  <div class="avatar" style="background:var(--primary);color:white">A</div>
  <div class="avatar" style="background:var(--success);color:white">B</div>
  <div class="avatar" style="background:var(--warning);color:white">+3</div>
</div>
```

### Accordion

```html
<div class="accordion">
  <div class="accordion-item" data-state="open">
    <button class="accordion-trigger">Is RanjuUI free?</button>
    <div class="accordion-content">
      <div class="accordion-body">Yes. RanjuUI is MIT licensed and completely free to use in personal and commercial projects.</div>
    </div>
  </div>
  <div class="accordion-item" data-state="closed">
    <button class="accordion-trigger">Do I need a build step?</button>
    <div class="accordion-content">
      <div class="accordion-body">No. Just link the CSS and JS files. No bundler, no config, no CLI.</div>
    </div>
  </div>
  <div class="accordion-item" data-state="closed">
    <button class="accordion-trigger">Can I use it with React/Vue?</button>
    <div class="accordion-content">
      <div class="accordion-body">Yes. RanjuUI is plain HTML/CSS/JS, so it works in any framework or with no framework at all.</div>
    </div>
  </div>
</div>

<!-- Allow multiple items open at once -->
<div class="accordion" data-multiple>
  ...
</div>
```

Items with `data-state="open"` start expanded. Click toggles open/closed. By default only one item is open at a time — add `data-multiple` to the accordion to allow multiple.

### Tabs

```html
<div class="tabs">
  <div class="tabs-list">
    <button class="tabs-trigger active" aria-selected="true" data-tab="account">Account</button>
    <button class="tabs-trigger" data-tab="password">Password</button>
    <button class="tabs-trigger" data-tab="notifications">Notifications</button>
  </div>
  <div class="tab-panel active" data-tab-panel="account">
    <h4>Account</h4>
    <p>Manage your account details and preferences.</p>
  </div>
  <div class="tab-panel" data-tab-panel="password">
    <h4>Password</h4>
    <p>Change your password and security settings.</p>
  </div>
  <div class="tab-panel" data-tab-panel="notifications">
    <h4>Notifications</h4>
    <p>Configure how you receive notifications.</p>
  </div>
</div>
```

Match `data-tab` on triggers to `data-tab-panel` on panels. The `.active` class controls the initial state.

### Dialog

```html
<!-- Trigger button -->
<button class="btn" data-dialog-open="my-dialog">Open Dialog</button>

<!-- Dialog overlay + dialog -->
<div class="dialog-overlay" id="my-dialog" data-state="closed">
  <div class="dialog" style="position:relative">
    <button class="dialog-close" data-dialog-close>&times;</button>
    <div class="dialog-header">
      <div class="dialog-title">Edit Profile</div>
      <div class="dialog-description">Make changes to your profile here.</div>
    </div>
    <div class="dialog-body">
      <div class="field">
        <label class="label">Name</label>
        <input type="text" class="input" placeholder="Your name">
      </div>
      <div class="field">
        <label class="label">Email</label>
        <input type="email" class="input" placeholder="Email address">
      </div>
    </div>
    <div class="dialog-footer">
      <button class="btn btn-outline" data-dialog-close>Cancel</button>
      <button class="btn" data-dialog-close>Save</button>
    </div>
  </div>
</div>
```

- `data-dialog-open="id"` opens the dialog with that ID.
- `data-dialog-close` on any button inside closes the parent dialog.
- Clicking the backdrop or pressing Escape also closes the dialog.
- Programmatic: `Ranju.dialog.open('my-dialog')` / `Ranju.dialog.close('my-dialog')`.

### Drawer & Sheet

A drawer slides up from the bottom. A sheet slides in from the side. Both use the same dialog overlay system.

```html
<!-- Drawer (bottom panel) -->
<button class="btn" data-dialog-open="my-drawer">Open Drawer</button>

<div class="dialog-overlay" id="my-drawer" data-state="closed"></div>
<div class="drawer" data-state="closed">
  <div class="drawer-handle"></div>
  <div class="p-6">
    <h3>Drawer Title</h3>
    <p class="text-muted text-sm">Content goes here.</p>
    <button class="btn mt-4" onclick="Ranju.dialog.close('my-drawer')">Close</button>
  </div>
</div>

<!-- Sheet (right side panel) -->
<button class="btn" data-dialog-open="my-sheet">Open Sheet</button>

<div class="dialog-overlay" id="my-sheet" data-state="closed"></div>
<div class="sheet" data-state="closed">
  <div class="p-6">
    <h3>Sheet Panel</h3>
    <p class="text-muted text-sm">Side panel content.</p>
    <button class="btn mt-4" onclick="Ranju.dialog.close('my-sheet')">Close</button>
  </div>
</div>
```

Add class `sheet-left` to slide in from the left instead of the right.

### Dropdown

```html
<div class="dropdown" data-state="closed">
  <button class="btn btn-outline" data-dropdown-trigger>Options ▾</button>
  <ul class="dropdown-menu">
    <li class="dropdown-label">My Account</li>
    <li class="dropdown-item">Profile</li>
    <li class="dropdown-item">Settings</li>
    <li class="dropdown-item">Billing</li>
    <li class="dropdown-separator"></li>
    <li class="dropdown-item" style="color:var(--destructive)">Log Out</li>
  </ul>
</div>
```

Add `dropdown-right` class to align the menu to the right edge.

### Toast

Toasts are created entirely via JavaScript:

```js
// Basic
Ranju.toast({ title: 'Hello!' })

// With description
Ranju.toast({
  title: 'File saved',
  description: 'Your file has been saved to the cloud.'
})

// Variants
Ranju.toast({ title: 'Deployed!', variant: 'success' })
Ranju.toast({ title: 'Error', description: 'Deploy failed.', variant: 'destructive' })
Ranju.toast({ title: 'Warning', description: 'Disk almost full.', variant: 'warning' })

// Custom duration (ms), 0 = stays until dismissed
Ranju.toast({ title: 'Persistent', duration: 0 })

// Position
Ranju.toast({ title: 'Top left', position: 'top-left' })
// Options: top-right, top-left, top-center, bottom-right, bottom-left, bottom-center
```

### Tooltip

```html
<!-- CSS-only tooltip -->
<div class="tooltip">
  <button class="btn btn-outline btn-sm">Hover me</button>
  <div class="tooltip-content">I'm a tooltip</div>
</div>

<!-- JS-enhanced tooltip (via data attribute) -->
<button class="btn btn-outline btn-sm" data-tooltip="JS tooltip on hover">Hover me</button>
```

Add `tooltip-bottom` class to the `.tooltip` wrapper for a bottom-positioned tooltip.

### Popover

```html
<div class="popover" data-state="closed">
  <button class="btn btn-outline" data-popover-trigger>Open Popover</button>
  <div class="popover-content">
    <h4 class="text-sm font-semibold mb-2">Settings</h4>
    <div class="field">
      <label class="label">Width</label>
      <input type="text" class="input" value="100%">
    </div>
  </div>
</div>
```

Click the trigger to toggle. Clicking outside closes it.

### Command Palette

```html
<button class="btn" onclick="Ranju.command.open('cmd')">Open (Ctrl+K)</button>

<div class="command-overlay" id="cmd" data-state="closed">
  <div class="command-dialog">
    <div class="command-input-wrapper">
      <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
      </svg>
      <input class="command-input" placeholder="Type a command...">
    </div>
    <div class="command-list">
      <div>
        <div class="command-group-label">Pages</div>
        <div class="command-item">Home <span class="command-shortcut">G H</span></div>
        <div class="command-item">Settings <span class="command-shortcut">G S</span></div>
      </div>
      <div>
        <div class="command-group-label">Actions</div>
        <div class="command-item" onclick="Ranju.theme.toggle();Ranju.command.close('cmd')">
          Toggle Theme <span class="command-shortcut">T T</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

Pressing `Ctrl+K` (or `Cmd+K`) opens the first command palette on the page. The search input filters items in real time.

### Calendar

```html
<!-- Auto-initializes -->
<div class="calendar"></div>

<!-- Manual init with callback -->
<div class="calendar" data-manual id="my-cal"></div>
<script>
Ranju.calendar(document.getElementById('my-cal'), {
  onSelect: function(date) {
    console.log('Selected:', date);
  }
});
</script>
```

### Input & Textarea

```html
<!-- Basic input -->
<div class="field">
  <label class="label">Username</label>
  <input type="text" class="input" placeholder="Enter username">
  <div class="field-hint">Must be at least 3 characters.</div>
</div>

<!-- Required label -->
<div class="field">
  <label class="label label-required">Email</label>
  <input type="email" class="input" placeholder="you@example.com">
</div>

<!-- Error state -->
<div class="field">
  <label class="label">Password</label>
  <input type="password" class="input input-error" value="123">
  <div class="field-error">Password must be at least 8 characters.</div>
</div>

<!-- Input group with addon -->
<div class="field">
  <label class="label">Website</label>
  <div class="input-group">
    <span class="input-group-text">https://</span>
    <input type="text" class="input" placeholder="example.com">
  </div>
</div>

<!-- Textarea -->
<div class="field">
  <label class="label">Bio</label>
  <textarea placeholder="Tell us about yourself..."></textarea>
</div>
```

### Checkbox & Radio

```html
<!-- Checkboxes -->
<label class="checkbox">
  <input type="checkbox" checked>
  <span class="checkbox-mark"></span>
  Accept terms and conditions
</label>

<label class="checkbox">
  <input type="checkbox">
  <span class="checkbox-mark"></span>
  Subscribe to newsletter
</label>

<!-- Radio group -->
<label class="radio">
  <input type="radio" name="plan" checked>
  <span class="radio-mark"></span>
  Free
</label>

<label class="radio">
  <input type="radio" name="plan">
  <span class="radio-mark"></span>
  Pro — $29/mo
</label>
```

### Switch

```html
<label class="switch">
  <input type="checkbox" checked>
  <span class="switch-track"><span class="switch-thumb"></span></span>
  Dark mode
</label>

<label class="switch">
  <input type="checkbox">
  <span class="switch-track"><span class="switch-thumb"></span></span>
  Notifications
</label>
```

### Toggle

```html
<!-- Single toggles -->
<button class="toggle active" aria-pressed="true">Bold</button>
<button class="toggle" aria-pressed="false">Italic</button>

<!-- Toggle group (single select) -->
<div class="toggle-group">
  <button class="toggle active" aria-pressed="true">Left</button>
  <button class="toggle" aria-pressed="false">Center</button>
  <button class="toggle" aria-pressed="false">Right</button>
</div>

<!-- Multi-select toggle group -->
<div class="toggle-group" data-multiple>
  <button class="toggle" aria-pressed="false">B</button>
  <button class="toggle" aria-pressed="false">I</button>
  <button class="toggle" aria-pressed="false">U</button>
</div>
```

### Slider

```html
<div class="field">
  <label class="label">Volume — <span id="vol">50</span>%</label>
  <div class="slider">
    <input type="range" min="0" max="100" value="50"
           oninput="document.getElementById('vol').textContent=this.value">
  </div>
</div>
```

### Combobox

```html
<div class="combobox" data-state="closed" style="max-width:300px">
  <input class="combobox-input input" placeholder="Search frameworks...">
  <ul class="combobox-list">
    <li class="combobox-option">React</li>
    <li class="combobox-option">Vue</li>
    <li class="combobox-option">Svelte</li>
    <li class="combobox-option">Angular</li>
    <li class="combobox-option">Solid</li>
  </ul>
</div>
```

Typing in the input filters options. Clicking an option fills the input and closes the dropdown.

### Data Table

```html
<div class="table-wrapper">
  <table class="table-hover">
    <thead>
      <tr>
        <th data-sortable>Name</th>
        <th data-sortable>Status</th>
        <th data-sortable>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alice Chen</td>
        <td><span class="badge badge-success badge-dot">Active</span></td>
        <td>Admin</td>
        <td><button class="btn btn-ghost btn-sm">Edit</button></td>
      </tr>
      <tr>
        <td>Bob Smith</td>
        <td><span class="badge badge-ghost badge-dot">Inactive</span></td>
        <td>Member</td>
        <td><button class="btn btn-ghost btn-sm">Edit</button></td>
      </tr>
    </tbody>
  </table>
</div>
```

Add `data-sortable` to `<th>` elements to make columns sortable on click. Add class `table-striped` for alternating row colors.

### Breadcrumb

```html
<ol class="breadcrumb">
  <li><a href="#">Home</a></li>
  <li><a href="#">Settings</a></li>
  <li><span aria-current="page">Profile</span></li>
</ol>
```

### Pagination

```html
<nav class="pagination">
  <a class="pagination-item" href="#">«</a>
  <a class="pagination-item" href="#">1</a>
  <a class="pagination-item active" aria-current="page" href="#">2</a>
  <a class="pagination-item" href="#">3</a>
  <span class="pagination-ellipsis">…</span>
  <a class="pagination-item" href="#">12</a>
  <a class="pagination-item" href="#">»</a>
</nav>
```

### Navbar & Menubar

```html
<!-- Navbar -->
<nav class="navbar">
  <a href="#" class="navbar-brand">MyApp</a>
  <ul class="navbar-nav">
    <li><a href="#" class="navbar-link" aria-current="page">Home</a></li>
    <li><a href="#" class="navbar-link">Docs</a></li>
    <li><a href="#" class="navbar-link">Pricing</a></li>
  </ul>
</nav>

<!-- Menubar (app-style) -->
<div class="menubar">
  <div class="menubar-item">File</div>
  <div class="menubar-item">Edit</div>
  <div class="menubar-item">View</div>
  <div class="menubar-item">Help</div>
</div>
```

### Sidebar

```html
<div class="sidebar" style="height:400px;width:260px">
  <div class="sidebar-header">
    <div class="font-semibold text-sm">Workspace</div>
  </div>
  <div class="sidebar-content">
    <div class="sidebar-label">Menu</div>
    <a class="sidebar-item active" href="#">Dashboard</a>
    <a class="sidebar-item" href="#">Projects</a>
    <a class="sidebar-item" href="#">Settings</a>
  </div>
  <div class="sidebar-footer">
    <button class="btn btn-ghost btn-sm w-full" data-sidebar-toggle="sidebar-id">
      Toggle Sidebar
    </button>
  </div>
</div>
```

`data-sidebar-toggle="id"` toggles the `sidebar-collapsed` class, which collapses the sidebar to 60px and hides text labels.

### Progress

```html
<!-- Determinate -->
<div class="progress"><div class="progress-fill" style="width:65%"></div></div>

<!-- Sizes -->
<div class="progress progress-sm"><div class="progress-fill" style="width:40%"></div></div>
<div class="progress progress-lg"><div class="progress-fill" style="width:85%"></div></div>

<!-- Indeterminate (animated) -->
<div class="progress progress-indeterminate"><div class="progress-fill"></div></div>
```

### Meter

```html
<div class="meter"><div class="meter-fill" style="width:45%"></div></div>
<div class="meter meter-warning"><div class="meter-fill" style="width:78%"></div></div>
<div class="meter meter-destructive"><div class="meter-fill" style="width:92%"></div></div>
```

### Spinner

```html
<!-- Circle spinners -->
<div class="spinner spinner-sm"></div>
<div class="spinner"></div>
<div class="spinner spinner-lg"></div>
<div class="spinner spinner-xl"></div>

<!-- Dot bounce -->
<div class="spinner-dots"><span></span><span></span><span></span></div>

<!-- Bar wave -->
<div class="spinner-bar"><span></span><span></span><span></span><span></span></div>
```

### Skeleton

```html
<div class="flex gap-4">
  <div class="skeleton skeleton-avatar"></div>
  <div class="flex-1">
    <div class="skeleton skeleton-heading"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
  </div>
</div>
<div class="skeleton skeleton-image mt-4"></div>
<div class="flex gap-2 mt-4">
  <div class="skeleton skeleton-btn"></div>
  <div class="skeleton skeleton-btn"></div>
</div>
```

### Carousel

```html
<div class="carousel" style="height:200px">
  <div class="carousel-track">
    <div class="carousel-slide">Slide 1</div>
    <div class="carousel-slide">Slide 2</div>
    <div class="carousel-slide">Slide 3</div>
  </div>
  <button class="carousel-btn carousel-prev">‹</button>
  <button class="carousel-btn carousel-next">›</button>
  <div class="carousel-dots">
    <button class="carousel-dot"></button>
    <button class="carousel-dot"></button>
    <button class="carousel-dot"></button>
  </div>
</div>

<!-- Auto-play every 5 seconds -->
<div class="carousel" data-autoplay="5000">
  ...
</div>
```

### Context Menu

```html
<!-- Right-click target -->
<div data-context-menu="my-ctx-menu" class="p-8 border rounded text-center">
  Right-click this area
</div>

<!-- Menu (hidden until right-click) -->
<ul class="context-menu" id="my-ctx-menu">
  <li class="context-menu-item">Cut <span class="shortcut">Ctrl+X</span></li>
  <li class="context-menu-item">Copy <span class="shortcut">Ctrl+C</span></li>
  <li class="context-menu-item">Paste <span class="shortcut">Ctrl+V</span></li>
  <li class="context-menu-separator"></li>
  <li class="context-menu-item" data-disabled>Delete</li>
</ul>
```

### Hover Card

```html
<div class="hover-card">
  <a href="#">@username</a>
  <div class="hover-card-content">
    <div class="flex items-center gap-3 mb-2">
      <div class="avatar" style="background:var(--primary);color:white">U</div>
      <div>
        <div class="font-semibold text-sm">Username</div>
        <div class="text-xs text-muted">@username</div>
      </div>
    </div>
    <p class="text-sm text-muted">Full-stack developer. Building cool things.</p>
  </div>
</div>
```

### Collapsible

```html
<div class="collapsible" data-state="closed">
  <button class="btn btn-outline btn-sm collapsible-trigger">Toggle</button>
  <div class="collapsible-content">
    <div class="mt-4 p-4 border rounded">
      Hidden content revealed on click.
    </div>
  </div>
</div>
```

### Separator

```html
<!-- Horizontal -->
<hr class="separator">

<!-- Vertical -->
<div class="flex items-center gap-4">
  <span>Left</span>
  <div class="separator-vertical" style="height:1.5rem"></div>
  <span>Right</span>
</div>

<!-- With label -->
<div class="separator-label">or continue with</div>
```

### Kbd

```html
<kbd>Ctrl</kbd> + <kbd>C</kbd>
<kbd>⌘</kbd> + <kbd>K</kbd>
<kbd>Esc</kbd>
```

### Empty State

```html
<div class="empty-state">
  <div class="empty-state-title">No results found</div>
  <div class="empty-state-description">Try adjusting your search or filter.</div>
  <button class="btn btn-sm">Clear Filters</button>
</div>
```

### Scroll Area

```html
<div class="scroll-area" style="height:200px">
  <p>Long scrollable content...</p>
  <p>More content...</p>
  <p>Even more content...</p>
</div>
```

Applies thin custom scrollbars automatically.

### Resizable

```html
<div class="resizable border rounded" style="height:150px">
  <div class="resizable-panel p-4">Left Panel</div>
  <div class="resizable-handle"></div>
  <div class="resizable-panel p-4">Right Panel</div>
</div>

<!-- Vertical -->
<div class="resizable resizable-vertical border rounded" style="height:300px">
  <div class="resizable-panel p-4">Top</div>
  <div class="resizable-handle"></div>
  <div class="resizable-panel p-4">Bottom</div>
</div>
```

### Item Group

```html
<div class="item-group border rounded">
  <div class="item item-clickable">
    <div class="item-content">
      <div class="item-title">Dashboard</div>
      <div class="item-description">Overview of your workspace</div>
    </div>
    <span class="badge badge-ghost text-xs item-action">New</span>
  </div>
  <div class="item item-clickable">
    <div class="item-content">
      <div class="item-title">Profile</div>
      <div class="item-description">Manage your account settings</div>
    </div>
  </div>
</div>
```

---

## Utilities

### Display & Visibility

`sr-only` (screen reader only), `overflow-hidden`, `overflow-auto`, `relative`, `absolute`, `sticky`, `inset-0`.

### Sizing

`w-full`, `h-full`.

### Text Clipping

`truncate`, `line-clamp-2`, `line-clamp-3`.

### Interaction

`pointer-events-none`, `cursor-pointer`, `select-none`.

### Borders & Shadows

`rounded`, `rounded-sm`, `rounded-lg`, `rounded-xl`, `rounded-full`, `border`, `border-t`, `border-b`, `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`.

### Animation

`animate-fade-in`, `animate-slide-up`, `animate-slide-down`, `animate-scale-in`, `animate-pulse`, `transition`.

### Responsive Helpers

`hide-mobile` (hidden below 768px), `show-mobile` (visible only below 768px), `hide-tablet` (hidden between 769–1024px).

### Aspect Ratio

`aspect-auto`, `aspect-square` (1:1), `aspect-video` (16:9), `aspect-photo` (4:3).

---

## Individual Components

Each component is available as a standalone file in `src/css/` and `src/js/`. Use them if you only need a subset:

```html
<!-- Only load button and card styles -->
<link rel="stylesheet" href="src/css/00-base.css">
<link rel="stylesheet" href="src/css/button.css">
<link rel="stylesheet" href="src/css/card.css">
```

Full list:

```
src/css/00-base.css        CSS variables, reset, base styles
src/css/01-typography.css  Headings, text utilities
src/css/grid.css           Layout, flex, spacing
src/css/accordion.css      Accordion
src/css/alert.css          Alert
src/css/avatar.css         Avatar, aspect ratio
src/css/badge.css          Badge
src/css/breadcrumb.css     Breadcrumb
src/css/button.css         Button, button group
src/css/calendar.css       Calendar
src/css/card.css           Card
src/css/carousel.css       Carousel
src/css/checkbox.css       Checkbox, radio
src/css/collapsible.css    Collapsible
src/css/combobox.css       Combobox, select
src/css/command.css        Command palette
src/css/context-menu.css   Context menu
src/css/dialog.css         Dialog, sheet, drawer
src/css/dropdown.css       Dropdown
src/css/empty-state.css    Empty state
src/css/form.css           Input, textarea, field, label
src/css/hover-card.css     Hover card
src/css/kbd.css            Kbd
src/css/menubar.css        Menubar, navbar
src/css/meter.css          Meter
src/css/pagination.css     Pagination
src/css/popover.css        Popover
src/css/progress.css       Progress
src/css/resizable.css      Resizable panels
src/css/responsive.css     Responsive breakpoints, print
src/css/scroll-area.css    Scroll area
src/css/separator.css      Separator
src/css/sidebar.css        Sidebar
src/css/skeleton.css       Skeleton
src/css/slider.css         Slider
src/css/spinner.css        Spinner
src/css/switch.css         Switch, toggle
src/css/table.css          Data table
src/css/tabs.css           Tabs
src/css/toast.css          Toast
src/css/tooltip.css        Tooltip
src/css/utilities.css      Utilities, animations, item group
```

```
src/js/base.js             Helpers, theme system
src/js/accordion.js        Accordion toggle
src/js/alert.js            Alert dismiss
src/js/calendar.js         Calendar renderer
src/js/carousel.js         Carousel navigation
src/js/collapsible.js      Collapsible toggle
src/js/combobox.js         Combobox filter/select
src/js/command.js          Command palette
src/js/context-menu.js     Context menu
src/js/dialog.js           Dialog/sheet/drawer
src/js/dropdown.js         Dropdown toggle
src/js/init.js             Auto-initialization
src/js/popover.js          Popover toggle
src/js/resizable.js        Resizable panels
src/js/sidebar.js          Sidebar collapse
src/js/table.js            Table sorting
src/js/tabs.js             Tab switching
src/js/toast.js            Toast notifications
src/js/toggle.js           Toggle buttons
src/js/tooltip.js          Tooltip positioning
```

---

## Build

Concatenate source files into the bundles:

```bash
make dist     # builds ranju.css + ranju.js
make css      # CSS only
make js       # JS only
make clean    # remove built files
make size     # print bundle sizes
```

---

## Project Structure

```
RanjuUI/
├── src/
│   ├── css/              42 individual component CSS files
│   └── js/               20 individual component JS files
├── examples/
│   ├── index.html        Examples gallery
│   ├── saas-landing.html SaaS landing page
│   └── dashboard.html    Dashboard app
├── ranju.css             Concatenated CSS bundle
├── ranju.js              Concatenated JS bundle
├── index.html            Documentation & live demo
├── Makefile              Build system
├── package.json          npm package config
├── LICENSE               MIT
└── README.md
```

---

## Examples

Full pages built entirely with RanjuUI components:

- **[SaaS Landing Page](https://alps-is-core.github.io/RanjuUI/examples/saas-landing.html)** — Hero, features grid, pricing cards, testimonials, FAQ accordion, CTA
- **[Dashboard App](https://alps-is-core.github.io/RanjuUI/examples/dashboard.html)** — Sidebar, stat cards, data table, tabs, command palette, toasts, dialogs

[View all examples →](https://alps-is-core.github.io/RanjuUI/examples/)

---

## Browser Support

Chrome, Firefox, Safari, Edge — all modern browsers. Standard CSS custom properties and ES5 JavaScript.

---

## License

[MIT](LICENSE)
