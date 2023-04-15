FROM node:lts-hydrogen

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

COPY . .

ENTRYPOINT [ "yarn", "start" ]
