FROM node:20-alpine

COPY package*.json pnpm-lock.yaml ./

# Instale as dependências do npm

# Se você precisar instalar pacotes globalmente, use USER root para garantir permissões apropriadas
USER root

# RUN mkdir ~/.npm-global

# # Instale os pacotes globais necessários

# # Defina diretório global de pacotes npm acessível ao usuário 'node'
# RUN npm config set prefix '~/.npm-global'

# # Adicione o diretório dos binários globais ao PATH e garanta que user 'node' tenha acesso
# ENV PATH=~/.npm-global/bin:$PATH
RUN chown -R node:node /usr/local/lib/node_modules/

# USER node

RUN npm install -g pnpm
RUN pnpm install

# Copie o restante da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação usará
EXPOSE 80

CMD ["pnpm", "run", "start:dev"]