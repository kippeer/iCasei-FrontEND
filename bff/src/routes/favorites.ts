// src/routes/favorites.ts
import express from 'express';

const router = express.Router();
let favorites: any[] = [];

router.get('/', (req, res) => {
  res.json(favorites);
});

router.post('/', (req, res) => {
  const video = req.body;
  favorites.push(video);
  res.status(201).json(video);
});

router.delete('/:id', (req, res) => {
  const videoId = req.params.id;
  favorites = favorites.filter(video => video.id.videoId !== videoId);
  res.status(204).send();
});

export default router;
