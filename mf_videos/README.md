# mf_videos

Este é um projeto Node.js utilizando Express para gerenciar um servidor que serve arquivos estáticos e manipula rotas para duas páginas HTML diferentes.

## Configuração do Projeto

### Instalação

Aplicação feita utilizando Node.JS v19.6.0. Para instalar as dependências do projeto, utilize o npm:

npm install

### Execução

Para iniciar o servidor, utilize o seguinte comando:

npm start ou node server.js

O servidor será iniciado em http://localhost:8080 por padrão.

## Funcionalidades

- **Página Home**: Acessível através de `/home`, esta página exibe vídeos baseados em consultas. Por padrão do projeto, ficará http://localhost:8080/home/.
- **Página Favoritos**: Acessível através de `/favoritos`, esta página exibe os vídeos marcados como favoritos. Por padrão do projeto, ficará http://localhost:8080/favoritos/.

## Dependências

- **Express**: Utilizado para configurar e executar o servidor HTTP.

express v4.19.2


# Construir a imagem Docker:
Este projeto pode ser executado em um contêiner Docker. Certifique-se de ter o Docker instalado localmente. Para construir e executar a imagem Docker, utilize os seguintes comandos:

docker build -t mf_videos .

Executar o contêiner Docker:

docker run -p 8080:8080 mf_videos

O servidor estará acessível em http://localhost:8080 dentro do contêiner Docker.

# Observações importantes

Certifique-se que a porta 8080 esteja livre antes de executar. Certifique-se de estar na pasta `mf_videos` para os comandos `npm install` e `npm start`.

O projeto utiliza o Backend For Frontend (BFF) e é obrigatório o uso do BFF para o funcionamento correto da aplicação.

Com o BFF rodando, você pode utilizar desta aplicação.
