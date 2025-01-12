import { MongoClient } from "mongodb";
import configure from "./config.js";
import logger from "./logger.js";

const uri = configure.MONGODB_URI;
const client = new MongoClient(uri);

const dbConfig = {
	db: null,
	portfolioCollection: null,
	connect: async () => {
		try {
			await client.connect();
			const db = client.db(configure.MONGODB_DATABASE);
			const portfolioCollection = db.collection(configure.DATABASE_COLLECTION);

			dbConfig.db = db;
			dbConfig.portfolioCollection = portfolioCollection;
		} catch (error) {
			logger.error("MongoDB connection error:", error);
		}
	},
};

export default dbConfig;