import { config } from "dotenv";

config({ path: ".env.local" });
const MONGODB_URI = process.env.MONGODB_URI;
//TODO: set up test environment
// process.env.NODE_ENV === "test"
// 	? process.env.TEST_MONGODB_URI
// 	: process.env.MONGODB_URI;

const PORT = process.env.PORT;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
const DATABASE_COLLECTION = process.env.DATABASE_COLLECTION;

const configure = { MONGODB_URI, PORT, MONGODB_DATABASE, DATABASE_COLLECTION };

export default configure;
