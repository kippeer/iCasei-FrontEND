const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3003;

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../shell/public')));

// Rota para o microfrontend mf_drawer
app.use('/drawer', express.static(path.join(__dirname, '../../mf_drawer/public')));

// Rotas para o microfrontend mf_videos
app.use('/videos/home', express.static(path.join(__dirname, '../../mf_videos/src/home')));
app.use('/videos/favoritos', express.static(path.join(__dirname, '../../mf_videos/src/favoritos')));

// Rota padrão para servir o index.html da shell
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../shell/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Shell is running on port ${PORT}`);
});
