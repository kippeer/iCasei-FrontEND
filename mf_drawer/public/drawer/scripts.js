// scripts.js
document.getElementById('videosBtn').addEventListener('click', function() {
  window.location.href = 'http://localhost:8080/home';
});

document.getElementById('favoritesBtn').addEventListener('click', function() {
  window.location.href = 'http://localhost:8080/favoritos';
});


// scripts.js

let favoritesCount = -1; // Inicializa o contador de favoritos

// Função para buscar o número atual de favoritos da API
async function fetchFavoritesCount() {
  try {
    const response = await fetch('http://localhost:3000/api/youtube/favoritos');
    if (!response.ok) {
      throw new Error('Erro ao obter dados da API');
    }
    const data = await response.json();
    favoritesCount = data.videos.length; // Atualiza o contador com o número de favoritos
    updateFavoritesCounter(); // Atualiza o contador visualmente
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error.message);
  }
}

// Atualiza o contador visualmente
function updateFavoritesCounter() {
  const favoritesCounter = document.getElementById('favoritesCounter');
  favoritesCounter.textContent = favoritesCount.toString();
}

// Inicializa a página buscando o número inicial de favoritos
fetchFavoritesCount();

// Exemplo: Incrementar o contador manualmente (apenas para exemplo, pode ser ajustado conforme necessidade)
document.getElementById('favoritesBtn').addEventListener('click', function() {
  favoritesCount++;
  updateFavoritesCounter();
});
