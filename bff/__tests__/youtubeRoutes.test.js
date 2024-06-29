const request = require('supertest');
const express = require('express');
const youtubeRoutes = require('../src/routes/youtubeRoutes');
const youtubeController = require('../src/controllers/youtubeController');

const app = express();
app.use('/api/youtube', youtubeRoutes);

jest.mock('../src/controllers/youtubeController');

describe('YouTube Routes', () => {
  it('should return video data for valid query', async () => {
    const mockData = {
      items: [
        {
          snippet: { title: 'Test Video' },
          id: { videoId: 'testId' },
          snippet: { thumbnails: { default: { url: 'testThumbnail' } } }
        }
      ]
    };

    youtubeController.searchVideos.mockResolvedValue(mockData);

    const response = await request(app).get('/api/youtube/videos?query=test');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  it('should return error for invalid query', async () => {
    youtubeController.searchVideos.mockRejectedValue(new Error('Erro ao buscar vídeos'));

    const response = await request(app).get('/api/youtube/videos?query=test');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Erro ao buscar e salvar vídeos' });
  });
});
//Este teste verifica as rotas do YouTube, se estão respondendo corretamente com os dados de vídeo ou erros apropriados.