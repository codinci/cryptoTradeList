import http from "http";
import app from "./app.js";
import logger from "./utils/logger.js";
import configure from "./utils/config.js";

const server = http.createServer(app);

server.listen(configure.PORT, () => {
logger.info(`Server listening on port: ${configure.PORT}`);
});
