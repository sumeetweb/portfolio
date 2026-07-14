# Sumeet Naik

Personal website and blog, built with [Hugo](https://gohugo.io/). Includes a blog, project showcase, reading list, and short-form notes.

## Sections

- **Blog** (`content/blog`) — longer posts on backend systems, infrastructure, and engineering practices
- **Projects** (`content/projects`) — showcase of side projects
- **Bookshelf** (`content/bookshelf`) — book notes and recommendations
- **Now** / **Uses** / **Resume** — status page, tools/setup page, and resume

## Requirements

- [Hugo](https://gohugo.io/installation/) (extended version recommended)

## Local development

```sh
hugo server -D
```

Visit `http://localhost:1313` to preview the site with live reload.

## Building

```sh
hugo
```

Generates the static site into `public/`.

## Project structure

```
content/    — site content (Markdown)
layouts/    — Hugo templates and partials
static/     — static assets (CSS, JS) copied as-is to the site root
public/     — generated output (build artifact, not source)
hugo.toml   — site configuration
```

## License

MIT — see [LICENSE](LICENSE).
