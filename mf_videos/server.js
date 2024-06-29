const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'src')));

// Rota para página inicial (home)
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'home', 'index.html'));
});

// Rota para página de favoritos
app.get('/favoritos', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'favoritos', 'index.html'));
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor frontend rodando em http://localhost:${port}`);
});
