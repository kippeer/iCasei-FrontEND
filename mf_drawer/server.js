const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analisar JSON
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para o arquivo drawer
app.get('/drawer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'drawer', 'index.html'));
});

// Middleware para tratar erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
