// No arquivo routes/youtube.ts
import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

router.get('/search', async (req: Request, res: Response) => {
  const query = req.query.q;
  if (typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter "q" must be a string' });
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.message });
    } else if (error.request) {
      res.status(500).json({ error: 'Erro de rede ao tentar acessar o servidor' });
    } else {
      res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
  }
});

export default router;
