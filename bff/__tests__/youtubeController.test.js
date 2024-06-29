const youtubeController = require('../src/controllers/youtubeController');
const axios = require('axios');

jest.mock('axios');

describe('YouTube Controller', () => {
  it('should fetch videos from YouTube API', async () => {
    const mockResponse = {
      data: {
        items: [
          {
            snippet: { title: 'Test Video' },
            id: { videoId: 'testId' },
            snippet: { thumbnails: { default: { url: 'testThumbnail' } } }
          }
        ]
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    const query = 'test';
    const result = await youtubeController.searchVideos(query);

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        q: query,
        part: 'snippet',
        type: 'video'
      }
    });
  });
});
//Este teste verifica se a função searchVideos no controlador do YouTube está buscando vídeos corretamente da API do YouTube.