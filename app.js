const express = require('express')
const fs = require('fs')
const path = require('path')
const MarkdownIt = require('markdown-it')

const app = express()
const md = new MarkdownIt()

// Definir variável para verificar o ambiente
const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000
const baseUrl = isProduction ? 'https://juninhopo.com' : `http://localhost:${PORT}`

// Defina o diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// Função para ajustar links no conteúdo do Markdown
const adjustLinks = (content) => {
  return content.replace(/https:\/\/juninhopo\.com/g, baseUrl)
}

// Rota dinâmica para renderizar qualquer arquivo Markdown
app.get('*', (req, res) => {
  // Captura o caminho da URL e remove a barra inicial
  const relativePath = req.path.slice(1)
  const fileName = `${relativePath || 'index'}.md`
  const filePath = path.join(__dirname, 'views', fileName)

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send('Arquivo Markdown não encontrado.')
      return
    }

    // Renderiza o conteúdo Markdown e ajusta os links
    const htmlContent = adjustLinks(md.render(data))

    // Envia o conteúdo renderizado como HTML
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${relativePath || 'index'}</title>
          <link rel="stylesheet" href="/styles.css">
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </head>
        <body>
          ${htmlContent}
          <footer style="position: fixed; bottom: 0; left: 0; right: 0; background: #333; color: #fff; text-align: center; padding: 10px;">
            ${isProduction ? 'Running in Production' : 'Running in Development'}
          </footer>
        </body>
      </html>
    `)
  })
})

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Server is Running in port: http://localhost:${PORT}/`)
})