const { JSDOM } = require('jsdom');

describe('scripts.js', () => {
  let dom;
  let document;
  let window;
  let sidebarFrame;
  let contentFrame;
  let changeContent;

  beforeEach(() => {
    // Cria uma nova instância do JSDOM
    dom = new JSDOM(`
      <html>
        <body>
          <iframe id="sidebarFrame"></iframe>
          <iframe id="contentFrame"></iframe>
        </body>
      </html>
    `, { url: 'http://localhost:8080' });

    document = dom.window.document;
    window = dom.window;
    sidebarFrame = document.getElementById('sidebarFrame');
    contentFrame = document.getElementById('contentFrame');

    // Adiciona a função changeContent ao escopo global
    changeContent = jest.fn((url) => {
      contentFrame.src = url;
    });

    // Adiciona o script ao escopo global
    window.changeContent = changeContent;

    // Código do script original
    window.addEventListener('message', function(event) {
      if (event.origin !== 'http://localhost:8081') {
        return;
      }
      const message = event.data;
      switch (message) {
        case 'videos':
          changeContent('http://localhost:8080/home');
          break;
        case 'favoritos':
          changeContent('http://localhost:8080/favoritos');
          break;
        default:
          console.error('Mensagem desconhecida recebida:', message);
      }
    });
  });

  afterEach(() => {
    // Limpa a instância do JSDOM após cada teste
    dom.window.close();
  });

  it('deve alterar o conteúdo do iframe para a página de vídeos quando a mensagem "videos" for recebida', () => {
    const messageEvent = new window.MessageEvent('message', {
      origin: 'http://localhost:8081',
      data: 'videos'
    });

    window.dispatchEvent(messageEvent);

    expect(changeContent).toHaveBeenCalledWith('http://localhost:8080/home');
    expect(contentFrame.src).toBe('http://localhost:8080/home');
  });

  it('deve alterar o conteúdo do iframe para a página de favoritos quando a mensagem "favoritos" for recebida', () => {
    const messageEvent = new window.MessageEvent('message', {
      origin: 'http://localhost:8081',
      data: 'favoritos'
    });

    window.dispatchEvent(messageEvent);

    expect(changeContent).toHaveBeenCalledWith('http://localhost:8080/favoritos');
    expect(contentFrame.src).toBe('http://localhost:8080/favoritos');
  });

  it('não deve alterar o conteúdo do iframe para uma origem inesperada', () => {
    const messageEvent = new window.MessageEvent('message', {
      origin: 'http://localhost:8082', // Origem inesperada
      data: 'videos'
    });

    window.dispatchEvent(messageEvent);

    expect(changeContent).not.toHaveBeenCalled();
    expect(contentFrame.src).toBe('');
  });
});
