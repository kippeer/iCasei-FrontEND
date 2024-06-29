document.addEventListener('DOMContentLoaded', async () => {
    async function fetchFavoriteVideos() {
        try {
            const response = await fetch('http://localhost:3000/api/youtube/favoritos');
            if (!response.ok) {
                throw new Error('Erro ao buscar favoritos:', response.status);
            }
            const data = await response.json();
            renderFavoriteVideos(data.videos);
        } catch (error) {
            console.error('Erro ao buscar favoritos:', error);
        }
    }

    function renderFavoriteVideos(videos) {
        const videoContainer = document.getElementById('video-list');
        videoContainer.innerHTML = '';

        videos.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.classList.add('video-item'); // Adicione suas classes necessárias aqui

            // Estrutura do item de vídeo
            videoElement.innerHTML = `
                <div class="video-content">
                    <a class="video-link" href="https://www.youtube.com/watch?v=${video.id}">
                        <img class="video-thumbnail" src="${video.thumbnailUrl}" alt="Thumbnail">
                        <h3 class="video-title">${video.title}</h3>
                    </a>
                    <div class="space"></div>
                    <button class="favorite-button active" data-video-id="${video.id}" data-title="${video.title}" data-thumbnail="${video.thumbnailUrl}">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
            `;

            // Adicionar evento ao botão de favorito
            const favoriteButton = videoElement.querySelector('.favorite-button');
            favoriteButton.addEventListener('click', () => deleteFromBackendFavorites(video.id));

            videoContainer.appendChild(videoElement);
        });
    }

    async function deleteFromBackendFavorites(videoId) {
        try {
            const response = await fetch(`http://localhost:3000/api/youtube/favoritos/${videoId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar favorito:', response.status);
            }
            // Atualiza a lista de vídeos favoritos após a remoção
            fetchFavoriteVideos();
        } catch (error) {
            console.error('Erro ao deletar favorito:', error);
        }
    }

    fetchFavoriteVideos();
});
