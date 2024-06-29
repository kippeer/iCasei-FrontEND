# iCasei-FrontEND
 
Shell - README
Este é o shell principal que integra os microfrontends "mf_drawer" e "mf_videos" em uma aplicação única.

Pré-requisitos
Antes de iniciar, certifique-se de ter instalado:

Aplicação feita utilizando Node.JS v19.6.0
Docker (opcional, se estiver usando Docker para os microfrontends)
Configuração inicial



cd shell
Instalar dependências:
"cors": "^2.8.5",
"express": "^4.19.2"

npm install

Iniciando o Backend For Frontend (BFF)
O BFF atua como intermediário entre os microfrontends e a API do YouTube. Certifique-se de configurar as variáveis de ambiente conforme necessário, especialmente a chave da API do YouTube.


cd bff
npm start
O BFF estará acessível em http://localhost:3000.

Iniciando o microfrontend "mf_drawer"
Este microfrontend fornece a barra lateral com links para navegação entre os microfrontends.


cd mf_drawer
npm start
O "mf_drawer" estará acessível em http://localhost:8081.

Iniciando o microfrontend "mf_videos"
Este microfrontend permite buscar e exibir vídeos do YouTube.


cd mf_videos
npm start
O "mf_videos" estará acessível em http://localhost:8080.

Observações
Certifique-se de que todas as portas especificadas  estão disponíveis e não estão sendo utilizadas por outros serviços.
Os microfrontends devem ser iniciados na ordem especificada para garantir que o shell funcione corretamente.
Se preferir utilizar Docker para os microfrontends ou o BFF, consulte o arquivo Dockerfile fornecido em cada diretório para as configurações necessárias.

EM CADA MICROFRONT A UM README


PARA INCIAR 

cd shell  
npm start

o shell roda na porta [3003 ](http://localhost:3003/)


OBS: A APLICAÇÃO USA CACHE LOCAL PARA ARMAZENAMENTO, É RECOMENDADO UTILIZAR O MODO ANONIMO OU LIMPAR O CACHE 