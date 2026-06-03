# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

This is a fully static site with no build step. Open `index.html` directly in a browser, or serve it with any static HTTP server:

```
npx serve .
# or
python -m http.server 8080
```

There are no dependencies to install, no linting tools, and no test suite.

## Architecture

Single-page portfolio with five anchor sections (`#home`, `#sobre`, `#tecnologias`, `#projetos`, `#contato`) in one `index.html`.

**CSS design system** — `css/styles.css` opens with CSS custom properties (`:root`) that define all colors and shadows. Any visual change should go through those variables first (`--color-accent`, `--color-bg`, `--color-dark`, etc.) rather than hardcoding values.

**Responsive navbar** — The navbar is a vertical sidebar fixed to the left edge at ≥1200px (achieved purely with CSS; `body` gets `padding-left: 224px`). Below that breakpoint it collapses to a standard top hamburger menu. Styling for both states lives in `css/styles.css` inside the corresponding `@media` blocks.

**JavaScript** (`js/main.js`) — vanilla, IIFE-wrapped, no dependencies beyond Bootstrap. It handles three things:
1. Adds `is-scrolled` to the navbar after 12px of scroll (for the drop shadow).
2. Scrollspy: walks sections on scroll and toggles `active` on the matching nav link.
3. Hides the `<img class="profile-photo">` and reveals the `.profile-fallback` initials block when the image fails to load.

**Bootstrap** is vendored locally (`css/bootstrap.min.css` + `js/bootstrap.bundle.min.js`) so the site works offline and on GitHub Pages without a CDN.

## Content to update before publishing

- Profile photo: the image is at `images/perfil.png`.
- WhatsApp link in `index.html`: replace `5500000000000` with the real number.
- Contact e-mail (`mailto:` in the `#contato` section).
- Project card links (`href` on "Ver Projeto" / "GitHub" buttons in the `#projetos` section).