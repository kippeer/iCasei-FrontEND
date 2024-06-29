// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const videosBtn = document.getElementById('videosBtn');
    const favoritesBtn = document.getElementById('favoritesBtn');
  
    videosBtn.addEventListener('click', function() {
      // Redirecionamento para a rota /videos
      window.location.href = '/videos';
    });
  
    favoritesBtn.addEventListener('click', function() {
      // Redirecionamento para a rota /favorites
      window.location.href = '/favorites';
    });
  });
  