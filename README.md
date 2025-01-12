This is a [Node JS](https://nodejs.org/en) project deployed to [Fly.io](https://fly.io/) using Github Actions.
## Getting Started

- Clone the repo into your project directory
```
	git clone https://github.com/codinci/cryptoTradeList.git
```

- Run the command ``` npm install ``` to install dependencies

- Create a .env file and register the following
```
	PORT = 8000
	MONGODB_DATABASE =
	DATABASE_COLLECTION =
	COINAPI_KEY=
	COINAPI_URL=https://rest.coinapi.io/v1/exchangerate
	MONGODB_URI =
```
- Create an api key from [CoinAPI](https://www.coinapi.io/) and create a cluster in [MongoDB](https://www.mongodb.com/) and insert the COINAPI_KEY, MONGODB_URI, MONGODB_DATABASE and DATABASE_COLLECTION

- After run ``` npm run dev ``` to run the application locally.

Open [http://localhost:8000/api/cryptos](http://localhost:8000/api/cryptos) with your browser to see the result.

This should run the project on the local server 127.0.0.1:8000

- To run docker

```
 docker-compose up -d --build
```
Open [http://localhost:8000/api/cryptos](http://localhost:8000/api/cryptos) with your browser to see the result.

- To run tests run ``` npm test ```
- To run linting run ``` npm run lint ```

## Learn More

The following articles and documentation were used in the building of this application:
- [Linting](https://medium.com/@sindhujad6/setting-up-eslint-and-prettier-in-a-node-js-project-f2577ee2126f)
- [FlyIo with Github Actions](https://fly.io/docs/launch/continuous-deployment-with-github-actions/)
- [Swagger Documentation](https://medium.com/swlh/restful-api-documentation-made-easy-with-swagger-and-openapi-6df7f26dcad)

## Live Site
 You can view the live site of the application on [CryptoTradeListBackend](https://cryptotradelist.fly.dev/)