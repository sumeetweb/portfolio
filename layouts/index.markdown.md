{{- /* Markdown representation of the home page. */ -}}
# {{ .Site.Params.name }}

_{{ .Site.Params.role }}_

{{ .Site.Params.heroTitle }}

{{ .Site.Params.intro }}

{{ .Site.Params.introMuted }}

## Current focus

{{ range .Site.Params.focus }}- {{ .text }}
{{ end }}
## Pages

{{ range .Site.Menus.main }}- [{{ .Name }}]({{ .URL }})
{{ end }}
## Links

- GitHub: {{ .Site.Params.github }}
- X / Twitter: {{ .Site.Params.twitter }}
- LinkedIn: {{ .Site.Params.linkedin }}
