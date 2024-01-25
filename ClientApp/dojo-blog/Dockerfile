FROM node:18-alpine
WORKDIR /client

COPY /public /public
COPY /src /src
COPY package.json /.
COPY .env /.
COPY .env.development /.
COPY .env.local /.

RUN npm install

CMD ["npm", "start"]