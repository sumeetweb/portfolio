# {{ site.Title }}

{{ site.Params.role }}

I build APIs, automate infrastructure, and turn ideas into useful software.

## Technologies
{{ range hugo.Data.technologies.groups }}
- {{ .name }}: {{ range $i, $item := .items }}{{ if $i }}, {{ end }}{{ $item.name }}{{ end }}
{{ end }}
## Pages

{{ range site.Menus.main }}- [{{ .Name }}]({{ .URL }})
{{ end }}
- [About](/about/)
- [Resume](/resume/)
- [Now](/now/)
- [Bookshelf](/bookshelf/)
- [Uses](/uses/)

[Get in touch](mailto:{{ site.Params.email }}) · [GitHub]({{ site.Params.github }})
