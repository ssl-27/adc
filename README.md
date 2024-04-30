# Australia Dairy Company - E-Commerce Platform

To run the prototype server locally, (1) docker or (2) yarn can be used.

## (1) Docker Compose - Recommended

Check if `docker` is installed, otherwise see [Get Docker | Docker Documentation](https://docs.docker.com/get-docker/)

```shell
docker --version
```

Check if `docker compose` is installed, otherwise see [Overview | Docker Documentation](https://docs.docker.com/compose/install/)

```shell
docker compose version
```

Navigate to the project root directory `cnsquare/` and run the prototype server

```shell
docker compose up -d
```

Visit the web application at `http://localhost:5173/`

## (2) Yarn

Check if `npm` is installed, otherwise see [Download | Node.js](https://nodejs.org/en/download)

```shell
npm version
```

Install `yarn`

```shell
npm install -g yarn
```

Start the API server

```shell
cd cnsquare-api/
yarn install
yarn start
```

Start the web server

```shell
cd cnsquare-spa/
yarn install
yarn dev
```

Visit the web application at `http://localhost:5173/`
