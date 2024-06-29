const sidebarFrame = document.getElementById('sidebarFrame');
    const contentFrame = document.getElementById('contentFrame');

    // Event listener para capturar mensagens enviadas pela sidebar
    window.addEventListener('message', function(event) {
      // Verifica se a mensagem veio da sidebar (pode adicionar validações adicionais se necessário)
      if (event.origin !== 'http://localhost:8081') {
        return; // Aborta se a origem da mensagem não for esperada
      }

      // Obtém a mensagem enviada pela sidebar
      const message = event.data;

      // Lógica para alterar o conteúdo do iframe principal
      switch (message) {
        case 'videos':
          changeContent('http://localhost:8080/home'); // Alterna para a página de vídeos
          break;
        case 'favoritos':
          changeContent('http://localhost:8080/favoritos'); // Alterna para a página de favoritos
          break;
        default:
          console.error('Mensagem desconhecida recebida:', message);
      }
    });

    // Função para alterar o conteúdo do iframe principal
    function changeContent(url) {
      contentFrame.src = url;
    }