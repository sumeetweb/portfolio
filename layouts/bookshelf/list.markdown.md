{{- /* Markdown representation of the Bookshelf section (front-matter-driven). */ -}}
{{- define "_book" -}}
{{ if .link }}[{{ .title }}]({{ .link }}){{ else }}{{ .title }}{{ end }}
{{- end -}}
# {{ .Title }}

{{ .Params.lead }}
{{ with .Params.bucketList }}
## Bucket List

{{ range . }}- {{ template "_book" . }}
{{ end }}{{ end }}
{{- with .Params.ongoing }}
## Ongoing

{{ range . }}- {{ template "_book" . }}
{{ end }}{{ end }}
{{- range .Params.years }}
## {{ .year }}

{{ range .books }}- {{ template "_book" . }}
{{ end }}{{ end }}
