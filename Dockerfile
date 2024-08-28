FROM node:20-alpine
WORKDIR /usr/src/app

RUN ls -la

COPY . .
COPY ./.env.docker ./.env

RUN mv .env .env.local
RUN mv .env.docker .env

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3000

CMD [ "pnpm", "run", "start:dev" ]