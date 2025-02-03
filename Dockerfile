FROM node:alpine3.20

WORKDIR /app
COPY package*.json .
RUN npm install
COPY dist  ./dist
COPY Dockerfile .

EXPOSE 3000

CMD ["node", "dist/index.js"]

