FROM node:8.11.1

WORKDIR /usr/mock-premier-league

COPY ./ ./

RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]