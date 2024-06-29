document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('components/search-form.html', 'search-form-container');

    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value.trim();
        if (query !== '') {
            fetchVideos(query);
        } else {
            fetchVideos(); // Se não houver query, busca os vídeos padrão
        }
    });

    async function loadComponent(url, containerId) {
        const response = await fetch(url);
        const template = await response.text();
        document.getElementById(containerId).innerHTML = template;
    }

    async function fetchVideos(query = '') {
        try {
            let url = 'http://localhost:3000/api/youtube/videos';
            if (query) {
                url += `?query=${encodeURIComponent(query)}`;
            }
            const response = await fetch(url);
            const videos = await response.json();
            const videoItems = videos.items.map(video => ({
                id: video.id.videoId,
                title: video.snippet.title,
                thumbnailUrl: video.snippet.thumbnails.medium.url,
                favorite: false, // Inicialmente não é favorito
                favoriteState: 'default' // Estado padrão do botão
            }));
            renderVideos(videoItems);
        } catch (error) {
            console.error('Erro ao buscar vídeos:', error);
        }
    }

    let favoritos = []; // Array para armazenar os vídeos marcados como favoritos
    const localStorageKey = 'youtube_favoritos'; // Chave para armazenamento local

    // Verifica se há favoritos armazenados no localStorage ao iniciar
    const storedFavorites = localStorage.getItem(localStorageKey);
    if (storedFavorites) {
        favoritos = JSON.parse(storedFavorites);
    }

    async function renderVideos(videoItems) {
        const videoContainer = document.getElementById('video-list');
        videoContainer.innerHTML = '';
        for (const video of videoItems) {
            const response = await fetch('components/video-item.html');
            const template = await response.text();
            const videoElement = document.createElement('div');
            videoElement.innerHTML = template.trim();
            const videoItem = videoElement.firstChild;

            const isFavorite = favoritos.some(fav => fav.id === video.id);
            const favoriteState = isFavorite ? 'active' : 'default';

            videoItem.querySelector('.video-title').textContent = video.title;
            const videoLink = videoItem.querySelector('.video-link');
            videoLink.href = `https://www.youtube.com/watch?v=${video.id}`;
            videoItem.querySelector('.video-thumbnail').src = video.thumbnailUrl;

            const favoriteButton = videoItem.querySelector('.favorite-button');
            favoriteButton.classList.add(favoriteState);
            favoriteButton.addEventListener('click', async () => {
                try {
                    if (favoriteButton.classList.contains('active')) {
                        favoritos = favoritos.filter(fav => fav.id !== video.id);
                        favoriteButton.classList.remove('active');
                        favoriteButton.classList.add('default');
                    } else {
                        favoritos.push(video);
                        favoriteButton.classList.remove('default');
                        favoriteButton.classList.add('active');
                    }
                    updateFavoriteButtons();
                    saveFavoritesLocally();
                    await updateBackendFavorites();
                } catch (error) {
                    console.error('Erro ao gerenciar favorito:', error);
                }
            });
            videoContainer.appendChild(videoItem);
        }
    }

    function updateFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll('.favorite-button');
        favoriteButtons.forEach(button => {
            const videoId = button.parentElement.querySelector('.video-link').getAttribute('href').split('?v=')[1];
            const isFavorite = favoritos.some(fav => fav.id === videoId);
            button.classList.remove('active', 'inactive');
            button.classList.add(isFavorite ? 'active' : 'default');
        });
    }

    async function updateBackendFavorites() {
        try {
            const response = await fetch('http://localhost:3000/api/youtube/favoritos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    videos: favoritos
                }),
            });
            if (!response.ok) {
                console.error('Erro ao atualizar favoritos no backend:', response.status);
            }
        } catch (error) {
            console.error('Erro ao atualizar favoritos no backend:', error);
        }
    }

    function saveFavoritesLocally() {
        localStorage.setItem(localStorageKey, JSON.stringify(favoritos));
    }

    fetchVideos();
});
