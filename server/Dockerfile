# server/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

# Jalankan server dengan nodemon untuk development
CMD ["npx", "nodemon", "index.js"]
