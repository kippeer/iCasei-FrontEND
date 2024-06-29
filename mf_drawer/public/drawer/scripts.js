let favoritesCount = 0; // Inicializa o contador de favoritos como 0

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

// Atualiza o contador a cada 10 segundos (10000 milissegundos)
setInterval(fetchFavoritesCount, 100); // Atualiza a cada 10 segundos (10000 ms)

// Evento de clique para o botão VÍDEOS
document.getElementById('videosBtn').addEventListener('click', function() {
  sendMessageToShell('videos'); // Envia uma mensagem para o shell principal carregar o microfrontend de vídeos
});

// Evento de clique para o botão FAVORITOS
document.getElementById('favoritesBtn').addEventListener('click', function() {
  sendMessageToShell('favoritos'); // Envia uma mensagem para o shell principal carregar o microfrontend de favoritos
});

// Função para enviar mensagem ao shell principal
function sendMessageToShell(message) {
  window.parent.postMessage(message, '*'); // Envie a mensagem para o shell principal (use '*' para o destinatário)
}
