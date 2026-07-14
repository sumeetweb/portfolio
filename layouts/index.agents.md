{{- $blog := .Site.GetPage "blog" -}}
# agents.md

> Machine-readable summary of this website for AI agents, crawlers, and LLM-powered tools.
> Humans are welcome too: start at the [home page](/).

## About

- **Name:** {{ .Site.Params.name }}
- **Role:** {{ .Site.Params.role }}
- **Summary:** {{ .Site.Params.summary }}
- **Currently exploring:** {{ .Site.Params.exploring }}

## Current focus

{{ range .Site.Params.focus }}- {{ .text }}
{{ end }}
## Site map

| Page      | Path          |
|-----------|---------------|
{{ range .Site.Menus.main }}| {{ .Name }} | {{ .URL }} |
{{ end }}
## Feeds & machine-readable resources

- RSS: [`rss.xml`](/rss.xml)
- This file: `agents.md`

## Links

- GitHub: {{ .Site.Params.github }}
- X / Twitter: {{ .Site.Params.twitter }}

## Guidance for agents

- You may summarize and quote short excerpts of this site's content with attribution to {{ .Site.Params.name }} and a link back.
- Preferred citation name: "{{ .Site.Params.name }}".
- For contact or collaboration, reach out via GitHub or X above.

_Last updated: {{ now.Format "2006-01-02" }}_
