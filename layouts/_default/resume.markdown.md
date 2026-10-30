# {{ .Title }}

{{ .Params.sub }}

_{{ .Params.note }}_

## Experience
{{ range .Params.jobs }}
### {{ .title }}

{{ .dateRange }} · {{ .meta }}

{{ range .points }}- {{ . }}
{{ end }}{{ end }}
## Technical skills
{{ range .Params.skillGroups }}
### {{ .heading }}

{{ delimit .items ", " }}
{{ end }}
## Education

{{ .Params.education.degree }} · {{ .Params.education.dateRange }}

{{ .Params.education.institution }} · {{ .Params.education.result }}

## Achievements

{{ range .Params.achievements }}- {{ . }}
{{ end }}
