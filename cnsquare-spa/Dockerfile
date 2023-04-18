# For production only

FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

COPY . .

ENV VITE_API_URL=https://cnsquare-api.herokuapp.com/

RUN yarn build

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/dist .

RUN npm install -g serve

ENTRYPOINT ["/bin/sh", "-c", "serve -s -p $PORT"]
