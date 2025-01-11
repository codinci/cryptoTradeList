import { config } from "dotenv";

config({ path: ".env.local" });
const MONGODB_URI = process.env.MONGODB_URI;
//TODO: set up test environment
// process.env.NODE_ENV === "test"
// 	? process.env.TEST_MONGODB_URI
// 	: process.env.MONGODB_URI;

const PORT = process.env.PORT;

const configure = { MONGODB_URI, PORT };

export default configure;
