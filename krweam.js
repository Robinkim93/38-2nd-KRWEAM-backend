const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routers");
const { globalErrorHandler } = require("./util/globalErrorHandler");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));
  app.use(router);
  app.use(globalErrorHandler);

  return app;
};

module.exports = { createApp };
