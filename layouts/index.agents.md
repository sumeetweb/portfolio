# {{ site.Title }}

Role: {{ site.Params.role }}

{{ site.Params.description }}

## Technologies used
{{ range hugo.Data.technologies.groups }}
- {{ .name }}: {{ range $i, $item := .items }}{{ if $i }}, {{ end }}{{ $item.name }}{{ end }}
{{ end }}
## Pages

- [About]({{ "about/" | absURL }})
- [Notes]({{ "notes/" | absURL }})
- [Blog]({{ "blog/" | absURL }})
- [Projects]({{ "projects/" | absURL }})
- [Archive]({{ "archive/" | absURL }})
- [Resume]({{ "resume/" | absURL }})

MLOps and model serving are areas of exploration through the personal ModelForge project, rather than established production MLOps experience.

Contact: {{ site.Params.email }}
