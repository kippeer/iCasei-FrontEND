// script no shell
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('message', function(event) {
      if (event.origin !== 'http://localhost:8081') return; // Verifica a origem da mensagem
  
      const data = event.data;
  
      if (data.type === 'navigate' && data.url) {
        const iframeMain = document.getElementById('iframeMain');
        iframeMain.src = data.url;
      }
    });
  });
  