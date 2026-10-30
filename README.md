# Sumeet’s personal site

A local Hugo portfolio based on the approved **Personal visual light** Pencil design. Includes a stationary technology circle around the portrait, Notes, Blog, Archive, and a pull-chain lamp for light/dark mode. No npm dependencies or theme downloads are required.

## Run locally

Requires Hugo Extended (verified with 0.164.0).

```sh
npm run dev
```

Open <http://localhost:1313/>. There are no external font requests, analytics, or hosted services in the site.

```sh
npm run build
```

Output is written to `public/` (ignored). Nothing is committed, pushed, or deployed by these commands.

## Production publishing

The live domain `sumeetnaik.com` is connected to `sumeetweb/portfolio` on GitHub. Pushing its `main` branch triggers Cloudflare Pages. The older `sumeetweb/sumeetnaik.com` repository is attached to a separate Pages project and does not publish the custom domain.

Keep the existing Pages middleware, response headers, public IndexNow verification file, and RSS redirect when publishing. Hugo generates Markdown representations for content negotiation alongside HTML; `/rss.xml` redirects to `/index.xml` for existing subscribers.

## Add a technology

1. Put its SVG logo in `static/images/technologies/`.
2. Add an entry to the appropriate group in `data/technologies.toml`:

```toml
[[groups.items]]
name = "SQLAlchemy"
icon = "sqlalchemy.svg"
```

The homepage places technologies in two concentric rings around the portrait, to the right of the introduction on desktop and below it on mobile. Positions are calculated from the number of items. Add a new `[[groups]]` with a `name` to create another category. Hover, keyboard focus, or tap reveals the technology and category below the circle; every button also has an accessible name. The circle stays stationary. Review the smallest supported viewport after adding items so the targets stay separated. For an entirely monochrome black icon, set `monochrome = true` to invert it in dark mode. For a multi-color logo requiring a dark variant, use `dark_icon = "name-dark.svg"`.

Logos come from [Devicon](https://github.com/devicons/devicon). The list describes tools used hands-on, not a proficiency rating. MLOps experience is described accurately as exploration on About and Resume.

## Add a short note

```sh
hugo new content --kind note notes/my-note.md
```

Write the note and change `draft = true` to `draft = false` when ready. Published notes automatically appear on Notes, Archive, and RSS. They do not appear on the homepage. Notes start empty by request; no posting history has been invented.

## Add a blog post

```sh
hugo new content --kind blog blog/my-post.md
```

Add a description and body, then set `draft = false`. It appears on Home, Blog, Archive, and RSS. Use `hugo server -D` to preview drafts locally.

## Content and navigation

- `content/blog/`: the two existing articles from the current local portfolio.
- `content/notes/`: short updates.
- `content/archive/`: combined chronological index, generated from Notes and Blog.
- `content/resume.md`, `content/uses.md`, `content/now.md`, `content/bookshelf/`: existing content retained from the newer local portfolio.
- `config.toml`: the four main navigation links. Footer links live in `layouts/partials/footer.html`.
- `assets/css/portfolio.css`: design tokens, responsive layouts, and motion.
- `assets/js/portfolio.js`: lamp pointer, keyboard, persistence, and reduced-motion behavior.
- `portfolio-directions.pen`: Pencil concepts; `design-previews/`: exported previews.

The older `content/reading.md` and `content/posts/` URLs remain available. Legacy theme files are retained but are no longer used by the independent site layout.

## Lamp behavior

A short 24 px tug clicks the switch while the chain is still held; pulling farther adds gentle resistance. The curved cord flexes sideways and springs back on release. You can also click it or use Enter or Space. Drags below the threshold spring back without changing themes. The theme is remembered locally. View Transitions reveal the new theme from the lamp, with a warm glow/fade fallback. Reduced motion keeps a static curved cord and turns off sway and the animated reveal.
