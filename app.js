import express from "express";
import logger from "./utils/logger.js";
import router from "./routes/crypto.js";
import swaggerJSDoc from "swagger-jsdoc";
import configure from "./utils/config.js";
import swaggerUi from "swagger-ui-express";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();

app.use(express.json());
app.use("/api/cryptos", router);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(configure.MONGODB_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// Connect the client to the server (optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		logger.info(
		"Pinged your deployment. You successfully connected to MongoDB!"
		);
	} finally {
		// Ensures that the client will close when you finish/error
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
  apis: ["./routes/*.js"], // Path to the route files for Swagger annotations
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Log the documentation URL
logger.info(
	`Swagger documentation is available at http://localhost:${configure.PORT}/api/docs`
);

export default app;
