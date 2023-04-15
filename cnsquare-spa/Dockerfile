# Create a product build of cnsqaure-spa
FROM node:lts-hydrogen AS builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN npm install -g yarn
RUN yarn

COPY . .
ENV VITE_API_URL=http://localhost:3000/

RUN yarn build

# Build the container image
FROM nginx:stable

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
