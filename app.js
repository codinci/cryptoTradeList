import express from "express";
import logger from "./utils/logger.js";
import router from "./routes/crypto.js";
import swaggerJSDoc from "swagger-jsdoc";
import configure from "./utils/config.js";
import swaggerUi from "swagger-ui-express";
import dbConfig from "./utils/databaseConfig.js";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();

app.use(express.json());
app.use("/api/cryptos", router);

const client = new MongoClient(configure.MONGODB_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		await dbConfig.connect();
		logger.info(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);
	} finally {
		await client.close();
	}
}
run().catch(console.dir);

// Swagger definition
const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
		title: "Cryptocurrency API",
		version: "1.0.0",
		description: "API documentation for managing cryptocurrency portfolios",
		},
		servers: [
		{
			url: `http://localhost:${configure.PORT}`,
		},
		],
		components: {
		securitySchemes: {
			bearerAuth: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT",
			},
		},
		},
		security: [
		{
			bearerAuth: [],
		},
		],
	},
	apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Log the documentation URL
logger.info(
	`Swagger documentation is available at http://localhost:${configure.PORT}/api/docs`
);

export default app;
