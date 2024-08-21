const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Importando o pacote CORS
const youtubeRoutes = require('./routes/youtubeRoutes');
const favoritosRoutes = require('./routes/favoritosRoutes');

dotenv.config();
const app = express();

// Middleware para parsing de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para CORS
app.use(cors());

// Rotas para API do YouTube
app.use('/api/youtube', youtubeRoutes);

// Rotas para Favoritos
app.use('/api/favoritos', favoritosRoutes);

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

module.exports = app;
