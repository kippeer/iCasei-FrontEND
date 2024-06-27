import express from 'express';
import cors from 'cors';
import youtubeRoutes from './routes/youtube';
import favoritesRoutes from './routes/favorites';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/youtube', youtubeRoutes);
app.use('/api/favorites', favoritesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
