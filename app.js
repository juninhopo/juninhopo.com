const express = require('express')
const fs = require('fs')
const path = require('path')
const MarkdownIt = require('markdown-it')

const app = express()
const md = new MarkdownIt()

// Defina o diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// Rota para renderizar o Markdown
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'index.md')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Erro ao ler o arquivo Markdown.')
      return
    }
    const htmlContent = md.render(data)

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Juninhopo</title>
          <link rel="stylesheet" href="/styles.css">
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `)
  })
})

// Iniciar o servidor
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server is Running in port: http://localhost:${PORT}/`)
})
