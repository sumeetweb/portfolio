{{- /* Markdown representation of a single page (blog posts, now/uses/resume). */ -}}
# {{ .Title }}
{{ with .Date }}{{ if not .IsZero }}
_{{ .Format "January 2, 2006" }}_
{{ end }}{{ end }}
{{ .RawContent }}
