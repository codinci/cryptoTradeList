import express from "express";
import logger from "./utils/logger.js";
import router from "./routes/crypto.js";
import configure from "./utils/config.js";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();

app.use(express.json());
app.use('/api/cryptos', router)

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
		// Connect the client to the server	(optional starting in v4.7)
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

export default app;
