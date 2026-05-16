FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY src ./src
RUN mkdir -p /app/data

ENV PORT=9377
EXPOSE 9377

CMD ["npm", "start"]
