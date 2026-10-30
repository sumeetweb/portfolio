# {{ .Title }}

{{ range (where site.RegularPages "Section" "in" (slice "notes" "blog")).ByDate.Reverse }}- {{ .Date.Format "2006-01-02" }} · [{{ .Title }}]({{ .RelPermalink }})
{{ end }}
