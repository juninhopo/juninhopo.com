const express = require('express')
const fs = require('fs')
const path = require('path')
const MarkdownIt = require('markdown-it')
const markdownItCheckbox = require('markdown-it-checkbox');

const app = express()
const md = new MarkdownIt()

// Adiciona o plugin de checkboxes ao MarkdownIt
md.use(markdownItCheckbox);

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

const generateBreadcrumbs = (path) => {
  // Remove segmentos vazios e o 'index' final do caminho
  const segments = path.split('/').filter(segment => segment && segment !== 'index');

  // Gera os breadcrumbs com links, adicionando '/index' ao final do href
  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/') + '/index'; // Adiciona '/index'
    return `<a href="${href}">${decodeURIComponent(segment)}</a>`;
  });

  return `
    <nav class="breadcrumbs">
      <a href="/">Home</a>
      ${breadcrumbs.length > 0 ? breadcrumbs.map(crumb => `<span class="separator">→</span>${crumb}`).join('') : ''}
    </nav>
  `;
};

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

    // Extrai o título da primeira linha do arquivo Markdown
    let title = '@juninhopo'
    // const lines = data.split('\n')
    // if (lines[0].startsWith('# ')) {
    //   title = lines[0].slice(2).trim()
    // }

    // Renderiza o conteúdo Markdown e ajusta os links
    const htmlContent = adjustLinks(md.render(data))

    // Gera os breadcrumbs apenas se não for a página inicial
    const breadcrumbs = (req.path === '/' || req.path === '/index' || req.path === '/index.md') 
      ? '' 
      : generateBreadcrumbs(req.path);

    // Lógica para decidir se o footer será exibido
    const footerContent = isProduction 
      ? '' 
      : `<footer style="position: fixed; bottom: 0; left: 0; right: 0; background: #333; color: #fff; text-align: center; padding: 10px;">
          ${isProduction ? 'Running in Production' : 'Running in Development'}
        </footer>`

    // Condição para não exibir os botões na home
    const isHomePage = req.path === '/' || req.path === '/index' || req.path === '/index.md';

    // Botão de Home
    const homeButton = !isHomePage ? `
      <div style="position: fixed; top: 20px; right: 20px; background: #007bff; color: white; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
        <a href="/" style="color: white; text-decoration: none;">Home</a>
      </div>
    ` : '';

    // Botão de Voltar
    const backButton = !isHomePage ? `
      <div style="position: fixed; bottom: 60px; right: 20px; background: #28a745; color: white; padding: 10px 20px; border-radius: 5px; cursor: pointer;" onclick="window.history.back()">
        Voltar
      </div>
    ` : '';

    // Envia o conteúdo renderizado como HTML
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <link rel="stylesheet" href="/styles.css">
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </head>
        <body>
          ${breadcrumbs}
          <!-- ${homeButton} --!>
          ${backButton}
          ${htmlContent}
          ${footerContent}
        </body>
      </html>
    `)
  })
})

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Server is Running in port: http://localhost:${PORT}/`)
})