{{- /* Markdown representation of the front-matter-driven Now page. */ -}}
# {{ .Title }}

_{{ .Params.metaNote }}_
{{ range .Params.sections }}
## {{ .heading }}

{{ .body }}
{{ end }}
