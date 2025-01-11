const info = (...params) => {
  //TODO: setup test environ
  // if (process.env.NODE_ENV !== "test") {
  // 	console.log(...params);
  // }
  console.log(...params);
};

const error = (...params) => {
  // if (process.env.NODE_ENV !== "test") {
  // 	console.log(...params);
  // }
  console.error(...params);
};

const logger = { info, error };

export default logger;
