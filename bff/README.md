# Backend For Frontend (BFF) com Node.js e API do YouTube

Este é um projeto de Backend For Frontend (BFF) desenvolvido em Node.js para intermediar requisições entre microfrontends e a API do YouTube.

## Pré-requisitos

Antes de iniciar, certifique-se de ter o seguinte instalado em seu ambiente de desenvolvimento:

- Node.js versão 19.6.0
- npm (gerenciador de pacotes do Node.js)
- Docker (opcional, para execução em contêineres)

## Instalação

Clone o repositório e instale as dependências necessárias.

cd bff
npm install

## Dependências

{
  "axios": "^0.21.1",
  "dotenv": "^10.0.0",
  "express": "^4.17.1",
  "cors": "^2.8.5"
}

## Configuração

Crie um arquivo .env na raiz do projeto e adicione suas variáveis de ambiente.

YOUTUBE_API_KEY=SuaChaveDeAPIAqui

Substitua SuaChaveDeAPIAqui pela sua chave de API do YouTube.

Caso não possua uma chave, crie em https://console.cloud.google.com/apis/credentials/key/ e restrinja a chave para YouTube Data API v3.

## Execução

Para iniciar o servidor localmente:

npm start

O servidor será iniciado na porta 3000 por padrão.

## Docker

Se preferir executar em um contêiner Docker:

Construa a imagem Docker:

docker build -t bff .

Execute o contêiner:

docker run -p 3000:3000 -d bff

Ao rodar a imagem no Docker, não esqueça de configurar o ambiente com:

YOUTUBE_API_KEY=SuaChaveDeAPIAqui

## Uso

### Endpoint da API

GET /api/youtube/videos

Retorna uma lista de vídeos do YouTube baseado na query fornecida.

Exemplo de requisição:

Retorna vídeos aleatórios:
http://localhost:3000/api/youtube/videos

Retorna vídeos específicos onde ?query=exemplo video
GET http://localhost:3000/api/youtube/videos?query=joji

Nesse exemplo, retorna vídeos do Joji.

### Resposta

{
  "items": [
    {
      "title": "Título do Vídeo",
      "videoId": "videoId",
      "thumbnail": "URL da Thumbnail"
    },
    // Outros vídeos...
  ]
}

## Testes

Os testes unitários podem ser executados com:

npm test

## Notas

- Certifique-se de que a porta 3000 esteja livre antes de rodar a aplicação.
- Certifique-se de estar na pasta bff para rodar npm install e npm start.

Essa aplicação é o backend para mf_drawer e mf_videos.
