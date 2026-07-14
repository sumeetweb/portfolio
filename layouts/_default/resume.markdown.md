{{- /* Markdown representation of the front-matter-driven Resume page. */ -}}
# {{ .Title }}

{{ .Params.sub }}

_{{ .Params.note }}_

## Experience
{{ range .Params.jobs }}
### {{ .title }}

_{{ .dateRange }}_ — {{ .meta }}

{{ range .points }}- {{ . }}
{{ end }}{{ end }}
## Skills

{{ delimit .Params.skills ", " }}

## Education

{{ .Params.education.degree }} ({{ .Params.education.dateRange }})
