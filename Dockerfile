FROM node:16-alpine

WORKDIR /usr/src/app

COPY . ./

RUN yarn

EXPOSE 3000

CMD [ "node", "index.js" ]
