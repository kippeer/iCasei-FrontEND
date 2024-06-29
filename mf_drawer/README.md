# Descrição:
"MF_DRAWER" é um microfrontend que faz parte de uma aplicação web para buscar e gerenciar vídeos do YouTube.

# Configuração:

Requisitos de Sistema:
- Aplicação feita utilizando Node.js v19.6.0
- Docker (opcional)

# Instalação das Dependências:
Para instalar as dependências do projeto, certifique-se de estar na pasta mf_drawer e execute o seguinte comando no terminal:
npm install

# Variáveis de Ambiente:
Certifique-se de configurar as seguintes variáveis de ambiente em um arquivo .env na raiz do projeto:
PORT=8081 # Porta em que o servidor será executado. No caso do "mf_drawer", configurado para 8081.

# Iniciando:
No diretório do projeto, você pode executar os seguintes comandos:
npm start: Executa o aplicativo em modo de produção. Abra http://localhost:8081 para visualizá-lo no navegador.


# Docker:
Para executar o aplicativo usando Docker, certifique-se de ter o Docker instalado e execute os seguintes comandos:
# Construir a imagem do Docker
docker build -t mf_drawer .
# Executar o contêiner Docker
docker run -p 8081:8081 mf_drawer

Isso iniciará o aplicativo dentro de um contêiner Docker, acessível em http://localhost:8081.

Certifique-se de que a porta 8081 esteja livre e que as aplicações BFF e MF_VIDEOS estejam rodando para integração adequada.
