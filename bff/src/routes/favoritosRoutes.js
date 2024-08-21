const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db('youtube').collection('favoritos'); // Substitua 'your-db-name' pelo nome do seu banco de dados
}

// Rota para salvar favoritos
router.post('/favoritos', async (req, res) => {
  try {
    const { videos } = req.body;

    if (!Array.isArray(videos)) {
      return res.status(400).json({ error: 'Formato inválido. Deve ser um array de vídeos.' });
    }

    const collection = await connectDB();
    await collection.updateOne({}, { $set: { videos } }, { upsert: true });

    res.status(200).json({ message: 'Dados de favoritos salvos com sucesso.' });
  } catch (error) {
    console.error('Erro ao salvar dados de favoritos:', error);
    res.status(500).json({ error: 'Erro ao salvar dados de favoritos.' });
  }
});

// Rota para obter favoritos
router.get('/favoritos', async (req, res) => {
  try {
    const collection = await connectDB();
    const result = await collection.findOne({});
    const { videos } = result || { videos: [] };

    res.status(200).json({ videos });
  } catch (error) {
    console.error('Erro ao obter dados de favoritos:', error);
    res.status(500).json({ error: 'Erro ao obter dados de favoritos.' });
  }
});

// Rota para deletar um favorito específico
router.delete('/favoritos/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;

    const collection = await connectDB();
    const result = await collection.findOne({});
    let { videos } = result || { videos: [] };

    const index = videos.findIndex(video => video.id === videoId);

    if (index !== -1) {
      videos.splice(index, 1);
      await collection.updateOne({}, { $set: { videos } });

      res.status(200).json({ message: `Favorito ${videoId} removido com sucesso.` });
    } else {
      res.status(404).json({ error: `Favorito ${videoId} não encontrado.` });
    }
  } catch (error) {
    console.error(`Erro ao remover favorito ${videoId}:`, error);
    res.status(500).json({ error: `Erro ao remover favorito ${videoId}.` });
  }
});

module.exports = router;
