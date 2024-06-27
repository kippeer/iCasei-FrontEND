const videosLink = document.getElementById('videos-link');
const favoritesLink = document.getElementById('favorites-link');
const content = document.getElementById('content');
const favoritesCount = document.getElementById('favorites-count');

let favorites = [];

function updateFavoritesCount() {
  favoritesCount.textContent = String(favorites.length);
}

videosLink.addEventListener('click', async () => {
  const response = await fetch('http://localhost:3001/index.html');
  const text = await response.text();
  content.innerHTML = text;
  // Carregar e executar o JS do mf_videos
  const script = document.createElement('script');
  script.src = 'http://localhost:3001/index.js';
  content.appendChild(script);
});

favoritesLink.addEventListener('click', () => {
  content.innerHTML = '';
  favorites.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.textContent = video.title;
    content.appendChild(videoElement);
  });
});

window.addEventListener('message', (event) => {
  if (event.data.type === 'updateFavorites') {
    favorites = event.data.favorites;
    updateFavoritesCount();
  }
});

updateFavoritesCount();
