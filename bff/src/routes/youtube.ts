import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();
const YOUTUBE_API_KEY = 'AIzaSyBJbe15qFM_mlbY6B3jwPjSE9Ond048mVc';

router.get('/search', async (req: Request, res: Response) => {
  const query = req.query.q;
  if (typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter "q" must be a string' });
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error: any) {
    if (error.response) {
      // O servidor respondeu com um status de erro
      res.status(error.response.status).json({ error: error.message });
    } else if (error.request) {
      // A requisição foi feita, mas não recebeu resposta
      res.status(500).json({ error: 'Erro de rede ao tentar acessar o servidor' });
    } else {
      // Ocorreu um erro durante o processamento da requisição
      res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
  }
});

export default router;
