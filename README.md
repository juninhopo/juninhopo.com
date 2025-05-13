# juninhopo.com

Personal website for Darlan Jr.

## Refactoring Overview

This website has been refactored from a backend-rendered Markdown site to a static HTML/CSS site for improved performance.

### Changes Made:

1. Converted all Markdown content to static HTML files
2. Simplified the server to just serve static files
3. Removed unnecessary dependencies (markdown-it, etc.)
4. Added modern responsive design with CSS variables
5. Organized content into separate HTML files for better maintainability

### Structure:

- `public/` - Contains all static assets (HTML, CSS, images)
- `server.js` - Simple Express server to serve static files

## Running the Site

### Development

```bash
npm install
npm run dev
```

The site will be available at http://localhost:3000

### Production

```bash
npm install
npm start
```

## Technologies Used

- Express.js (minimal usage for static file serving)
- HTML5
- CSS3
