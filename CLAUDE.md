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

Single-page portfolio with sections `#hero`, `#sobre`, `#tecnologias`, `#projetos`, `#contato` in one `index.html`. Design inspired by BootstrapMade SnapFolio template.

**CSS design system** — `css/styles.css` opens with CSS custom properties (`:root`) that define all colors and shadows. Any visual change should go through those variables first (`--color-accent`, `--color-bg`, `--color-dark`, etc.) rather than hardcoding values.

**Responsive navbar** — The navbar is a vertical sidebar fixed to the left edge at ≥1200px (achieved purely with CSS; `body` gets `padding-left: 224px`). Below that breakpoint it collapses to a standard top hamburger menu. Styling for both states lives in `css/styles.css` inside the corresponding `@media` blocks.

**JavaScript** (`js/main.js`) — vanilla, IIFE-wrapped. Handles: AOS init, Typed.js, PureCounter, skill bar IntersectionObserver, portfolio filter, scrollspy, smooth scroll, mobile sidebar toggle, back-to-top, and profile image fallback.

**Vendor libraries (CDN — require internet on first load):**
- Bootstrap Icons 1.11.3
- AOS 2.3.4 (scroll animations)
- Typed.js 2.1.0 (hero typing effect)
- PureCounter (animated counters in Sobre section)

**Bootstrap** is vendored locally (`css/bootstrap.min.css` + `js/bootstrap.bundle.min.js`).

## Content to update before publishing

- Profile photo: the image is at `images/perfil.png`.
- WhatsApp link in `index.html`: replace `5500000000000` with the real number.
- Contact e-mail (`mailto:` in the `#contato` section).
- Project card links (`href` on "Ver Projeto" / "GitHub" buttons in the `#projetos` section).