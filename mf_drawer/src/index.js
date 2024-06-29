"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const videosLink = document.getElementById('videos-link');
const favoritesLink = document.getElementById('favorites-link');
const content = document.getElementById('content');
const favoritesCount = document.getElementById('favorites-count');
let favorites = [];
function updateFavoritesCount() {
    favoritesCount.textContent = String(favorites.length);
}
videosLink.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:3001/index.html');
    const text = yield response.text();
    content.innerHTML = text;
    // Carregar e executar o JS do mf_videos
    const script = document.createElement('script');
    script.src = 'http://localhost:3001/index.js';
    content.appendChild(script);
}));
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
