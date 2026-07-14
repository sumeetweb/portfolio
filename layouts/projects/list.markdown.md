{{- /* Markdown representation of the Projects section (front-matter-driven cards). */ -}}
# {{ .Title }}

{{ .Params.lead }}
{{ range .Pages.ByWeight }}
## {{ .Title }}

{{ .Params.description }}

- Source: {{ .Params.source }}
- Tags: {{ delimit .Params.tags ", " }}
{{ end }}
