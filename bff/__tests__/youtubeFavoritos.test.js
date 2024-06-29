const request = require('supertest');
const express = require('express');
const router = require('../src/routes/favoritosRoutes'); // Substitua pelo caminho correto do seu router
const fs = require('fs').promises;

const app = express();
app.use(express.json());
app.use('/api/youtube', router);

describe('POST /api/youtube/favoritos', () => {
    it('should save favorite videos', async () => {
        const videoData = { videos: [{ id: '1', title: 'Video 1' }, { id: '2', title: 'Video 2' }] };

        const response = await request(app)
            .post('/api/youtube/favoritos')
            .send(videoData)
            .expect(200);

        expect(response.body.message).toBe('Dados de favoritos salvos com sucesso.');

        // Verifica se os dados foram salvos corretamente no arquivo
        const data = await fs.readFile('favoritos.json', 'utf8');
        const savedData = JSON.parse(data);
        expect(savedData.videos).toEqual(videoData.videos);
    });

    it('should return error for invalid format', async () => {
        const invalidData = { video: { id: '1', title: 'Video 1' } };

        const response = await request(app)
            .post('/api/youtube/favoritos')
            .send(invalidData)
            .expect(400);

        expect(response.body.error).toBe('Formato inválido. Deve ser um array de videos.');
    });
});

describe('GET /api/youtube/favoritos', () => {
    it('should get favorite videos', async () => {
        const response = await request(app)
            .get('/api/youtube/favoritos')
            .expect(200);

        expect(response.body.videos).toBeDefined();
        // Você pode adicionar mais asserções para verificar o formato dos dados retornados
    });
});

describe('DELETE /api/youtube/favoritos/:videoId', () => {
    it('should delete a favorite video', async () => {
        const videoIdToDelete = '1';

        // Primeiro, adicionamos um vídeo como favorito
        await request(app)
            .post('/api/youtube/favoritos')
            .send({ videos: [{ id: videoIdToDelete, title: 'Video Teste' }] })
            .expect(200);

        const response = await request(app)
            .delete(`/api/youtube/favoritos/${videoIdToDelete}`)
            .expect(200);

        expect(response.body.message).toBe(`Favorito ${videoIdToDelete} removido com sucesso.`);

        // Verifica se o vídeo foi removido corretamente
        const data = await fs.readFile('favoritos.json', 'utf8');
        const savedData = JSON.parse(data);
        const deletedVideo = savedData.videos.find(video => video.id === videoIdToDelete);
        expect(deletedVideo).toBeUndefined();
    });

    it('should return error for non-existent videoId', async () => {
        const nonExistentVideoId = '999';

        const response = await request(app)
            .delete(`/api/youtube/favoritos/${nonExistentVideoId}`)
            .expect(404);

        expect(response.body.error).toBe(`Favorito ${nonExistentVideoId} não encontrado.`);
    });
});
