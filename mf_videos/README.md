# mf_videos

Este é um projeto Node.js utilizando Express para gerenciar um servidor que serve arquivos estáticos e manipula rotas para duas páginas HTML diferentes.

## Configuração do Projeto

### Instalação

Para instalar as dependências do projeto, utilize o npm:


npm install


Execução
Para iniciar o servidor, utilize o seguinte comando:


npm start ou node server.js

O servidor será iniciado em http://localhost:8080 por padrão.



Funcionalidades
Página Home: Acessível através de /home, esta página exibe vídeos baseados em consultas.
Por padrao do projeto ficará http://localhost:8080/home/

Página Favoritos: Acessível através de /favoritos, esta página exibe os vídeos marcados como favoritos.
Por padrao do projeto ficará http://localhost:8080/favoritos/


Dependências
Express: Utilizado para configurar e executar o servidor HTTP. 

"express": "^4.19.2",

---------------------------------------------------------------------------------------

Este projeto pode ser executado em um contêiner Docker. Certifique-se de ter o Docker instalado localmente. Para construir e executar a imagem Docker, utilize os seguintes comandos:

Construir a imagem Docker:


docker build -t mf_videos .
Executar o contêiner Docker:


docker run -p 8080:8080 mf_videos
O servidor estará acessível em http://localhost:8080 dentro do contêiner Docker.

caso altere o localhost do docker , lembrar de alterar a do projeto
-----------------------------------------------------------------------------------------------
CERTIFIQUE-SE QUE A PORTA 8080 ESTEJA LIVRE ANTES DE EXECUTAR
CERTIFIQUE-SE DE ESTAR NA PASTA mf_videos PARA OS COMANDOS npm install e npm start
O PROJETO USA O BACKEND DO BFF É OBRIGATORIO O USO DO BFF PARA O FUNCIONAMENTO DO PROJETO

COM O BFF RODANDO , VOCÊ PODE UTILIZAR DESSA APLICAÇÂO