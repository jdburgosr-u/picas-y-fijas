FROM node:24-slim
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY memoria.js ./
COPY src/ ./src/
COPY public/ ./public/

EXPOSE 3000
CMD ["node", "src/juego.js"]