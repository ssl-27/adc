# For production only

FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

COPY . .

# Change to https://cnsquare-api.herokuapp.com/ for production

ENV VITE_API_URL=http://localhost:3000/

RUN yarn build

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/dist .

ENV PORT=5173

EXPOSE $PORT

RUN npm install -g serve

ENTRYPOINT ["/bin/sh", "-c", "serve -s -p $PORT"]
