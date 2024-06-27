const searchButton = document.getElementById('search-button');
const searchQuery = document.getElementById('search-query') as HTMLInputElement;
const videosContainer = document.getElementById('videos');

let favorites = [];

async function searchVideos() {
  const query = searchQuery.value;
  const response = await fetch(`http://localhost:3000/api/youtube/search?q=${query}`);
  const data = await response.json();
  displayVideos(data.items);
}

function displayVideos(videos) {
  videosContainer.innerHTML = '';
  videos.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.innerHTML = `
      <h3>${video.snippet.title}</h3>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <button class="favorite-button" data-video='${JSON.stringify(video)}'>☆</button>
    `;
    videosContainer.appendChild(videoElement);
  });

  document.querySelectorAll('.favorite-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const video = JSON.parse(button.getAttribute('data-video'));
      if (favorites.find(fav => fav.id.videoId === video.id.videoId)) {
        favorites = favorites.filter(fav => fav.id.videoId !== video.id.videoId);
      } else {
        favorites.push(video);
      }
      window.parent.postMessage({ type: 'updateFavorites', favorites }, '*');
    });
  });
}

searchButton.addEventListener('click', searchVideos);
