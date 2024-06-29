const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

// Rota para salvar favoritos
router.post('/favoritos', async (req, res) => {
  try {
    const { videos } = req.body;

    // Validação simples para verificar se videos é um array
    if (!Array.isArray(videos)) {
      return res.status(400).json({ error: 'Formato inválido. Deve ser um array de videos.' });
    }

    // Aqui você pode implementar a lógica para salvar os favoritos no seu sistema
    const dataToSave = JSON.stringify({ videos });
    await fs.writeFile('favoritos.json', dataToSave);

    res.status(200).json({ message: 'Dados de favoritos salvos com sucesso.' });
  } catch (error) {
    console.error('Erro ao salvar dados de favoritos:', error);
    res.status(500).json({ error: 'Erro ao salvar dados de favoritos.' });
  }
});

// Rota para obter favoritos
router.get('/favoritos', async (req, res) => {
  try {
    // Aqui você pode implementar a lógica para ler os favoritos do seu sistema
    const data = await fs.readFile('favoritos.json', 'utf8');
    const { videos } = JSON.parse(data);

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

    // Lógica para ler os favoritos atuais
    const data = await fs.readFile('favoritos.json', 'utf8');
    const { videos } = JSON.parse(data);

    // Encontrar o índice do videoId na lista de favoritos
    const index = videos.findIndex(video => video.id === videoId);

    if (index !== -1) {
      // Remover o videoId da lista de favoritos
      videos.splice(index, 1);

      // Salvar a lista atualizada de favoritos
      const dataToSave = JSON.stringify({ videos });
      await fs.writeFile('favoritos.json', dataToSave);

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
