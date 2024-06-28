// DTO para representar um vídeo do YouTube
interface YouTubeVideoDTO {
  id: string;
  title: string;
  thumbnailUrl: string;
  favorite: boolean;
  favoriteState: 'default' | 'active' | 'inactive'; // Novo campo para os estados do botão
}


let favoriteVideos: string[] = [];

// Função para buscar os vídeos do YouTube usando fetch e renderizá-los
async function fetchVideos() {
  try {
    const response = await fetch('http://localhost:3000/api/youtube/videos');
    const videos = await response.json();
    const videoItems: YouTubeVideoDTO[] = videos.items.map((video: any) => ({
      id: video.id.videoId,
      title: video.snippet.title,
      thumbnailUrl: video.snippet.thumbnails.medium.url
    }));
    renderVideos(videoItems);
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
  }
}

function renderVideos(videoItems: YouTubeVideoDTO[]) {
  const videoContainer = document.getElementById('video-list');
  if (videoContainer) {
    videoContainer.innerHTML = '';
    videoItems.forEach(video => {
      const videoItem = document.createElement('div');
      videoItem.classList.add('video-item');
      videoItem.innerHTML = `
        <a class="video-link" href="https://www.youtube.com/watch?v=${video.id}" target="_blank">
          <img class="video-thumbnail" src="${video.thumbnailUrl}" alt="${video.title}">
          <h2 class="video-title">${video.title}</h2>
        </a>
        <button class="favorite-button ${video.favoriteState}" data-video-id="${video.id}">
          <i class="fas fa-star"></i>
        </button>
      `;
      videoContainer.appendChild(videoItem);

      const favoriteButton = videoItem.querySelector('.favorite-button');
      if (favoriteButton) {
        favoriteButton.addEventListener('click', () => {
          toggleFavorite(video);
          updateFavoriteState(favoriteButton, video);
        });
      }
    });
  }
}

// Função para alternar o estado de favorito e enviar para o servidor
async function toggleFavorite(video: YouTubeVideoDTO) {
  if (video.favoriteState === 'default' || video.favoriteState === 'inactive') {
    video.favoriteState = 'active';
    video.favorite = true; // Marcar como favorito
    await addFavoriteToServer(video); // Envia POST para adicionar aos favoritos
  } else {
    video.favoriteState = 'inactive';
    video.favorite = false; // Desmarcar como favorito
    await removeFavoriteFromServer(video.id); // Envia DELETE para remover dos favoritos
  }
}

const video: YouTubeVideoDTO = {
  id: 'abc123',
  title: 'Título do Vídeo',
  thumbnailUrl: 'https://example.com/thumbnail.jpg',
  favorite: true,
  favoriteState: 'active'
};

// Chama a função para adicionar o vídeo aos favoritos no servidor
addFavoriteToServer(video);

async function addFavoriteToServer(video: YouTubeVideoDTO) {
  try {
    const response = await fetch('http://localhost:3000/api/youtube/favoritos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ video })
    });
    if (response.ok) {
      console.log('Vídeo adicionado aos favoritos no servidor.');
    } else {
      console.error('Erro ao adicionar vídeo aos favoritos no servidor:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao adicionar vídeo aos favoritos:', error);
  }
}


async function removeFavoriteFromServer(videoId: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/youtube/favoritos/${videoId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      console.log('Vídeo removido dos favoritos no servidor.');
    } else {
      console.error('Erro ao remover vídeo dos favoritos no servidor.');
    }
  } catch (error) {
    console.error('Erro ao enviar dados de favoritos:', error);
  }
}





// Chamada para buscar e renderizar os vídeos ao carregar a página
window.onload = function () {
  fetchVideos(); // Renderiza vídeos iniciais
};
function updateFavoriteState(favoriteButton: Element, video: YouTubeVideoDTO) {
  throw new Error("Function not implemented.");
}

