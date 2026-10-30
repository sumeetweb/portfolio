# {{ .Title }}

{{ .Description }}
{{ range site.Data.projects.items }}
## {{ .name }}{{ with .status }} ({{ . }}){{ end }}

{{ .summary }}

Stack: {{ delimit .stack ", " }}

[Source code]({{ .source }}){{ with .details }} · [Project details]({{ . }}){{ end }}
{{ end }}
