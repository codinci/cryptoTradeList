import { MongoClient } from "mongodb";
import configure from "./config.js";

const uri = configure.MONGODB_URI;
const dbName = configure.MONGODB_DATABASE;
const dbCollection = configure.DATABASE_COLLECTION;
// Connect to MongoDB
const client = new MongoClient(uri);
await client.connect();
const db = client.db(dbName);
const portfolioCollection = db.collection(dbCollection);

const dbConfig = { db, portfolioCollection };

export default dbConfig;
