FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
ENV DockerDB=db
CMD ["node", "./dist/server.js"]
EXPOSE 8000