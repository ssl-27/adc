# For production only

FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

COPY . .

ENV VITE_API_URL=https://cnsqaure-api.heroku.com/

RUN yarn build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/dist .

WORKDIR /etc/nginx/conf.d/

COPY --from=builder /app/.nginx/nginx.conf.template nginx.conf.template

CMD envsubst < nginx.conf.template > default.conf && nginx -g 'daemon off;'

# CMD nginx -g 'daemon off;'
