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
functions/  — Cloudflare Pages Functions (edge middleware)
public/     — generated output (build artifact, not source)
hugo.toml   — site configuration
```

## Markdown content negotiation

Every page is also emitted as Markdown (Hugo's `MARKDOWN` output format →
`<path>/index.md`, via the `*.markdown.md` layouts). A request with
`Accept: text/markdown` is served that Markdown representation instead of HTML —
handy for LLM agents and CLI tools. Browsers (and anything not explicitly asking
for `text/markdown`) get HTML unchanged.

The negotiation runs at the edge in `functions/_middleware.js` (Cloudflare Pages
auto-detects the `functions/` dir). Markdown responses carry
`Content-Type: text/markdown` and an `x-markdown-tokens` header with an approximate
token count. Verify against a deployment:

```sh
curl -sD- -H 'Accept: text/markdown' https://www.sumeetnaik.com/blog/ | head
```

## License

MIT — see [LICENSE](LICENSE).
