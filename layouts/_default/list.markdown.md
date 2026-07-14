{{- /* Markdown representation of a section list (blog, projects, bookshelf). */ -}}
# {{ .Title }}
{{ with .RawContent }}
{{ . }}{{ end }}
{{ range .Pages }}- [{{ .Title }}]({{ .RelPermalink }}){{ with .Date }}{{ if not .IsZero }} — {{ .Format "2006-01-02" }}{{ end }}{{ end }}
{{ end }}
