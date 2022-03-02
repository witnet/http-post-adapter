FROM node:16-alpine

WORKDIR /usr/src/app

COPY . ./

RUN yarn install --production

EXPOSE 3000

CMD [ "node", "index.js" ]
