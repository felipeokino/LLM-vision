FROM node:20-alpine
WORKDIR /usr/src/app

RUN ls -la

COPY . .
COPY .env ./


RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3000

CMD [ "pnpm", "run", "start:dev"] 