# iCasei-FrontEND
Esta é uma aplicação microfrontend que utiliza 4 blocos principais para proporcionar uma experiência integrada aos usuários.

# Blocos da Aplicação:

# bff

Backend da aplicação que serve como um intermediário entre o frontend e a API principal. Gerencia requisições específicas para os microfrontends e a lógica de negócios associada.
# mf_drawer

Responsável pelo sidebar da aplicação. Permite a navegação entre as páginas de vídeos e favoritos, proporcionando uma transição suave entre os conteúdos.
# mf_videos

Oferece funcionalidades para visualização dos vídeos disponíveis e favoritos. Implementa as rotas /home e /favoritos para o frontend.
# shell

Unificação dos três blocos principais (bff, mf_drawer, mf_videos) em uma interface coesa e integrada. Responsável por montar a experiência final do usuário.
# Observações Importantes:
Cada pasta possui um README próprio com detalhes específicos sobre sua configuração e funcionalidades.
Para uma configuração adequada e execução da aplicação, siga a ordem recomendada de leitura dos READMEs:

BFF

mf_drawer

mf_videos

shell