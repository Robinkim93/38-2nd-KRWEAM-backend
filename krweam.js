require("dotenv").config();

const http = require("http");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

const router = require("./routers");
const database = require("./util/dataSourceWrapperClass");
const { globalErrorHandler } = require("./util/globalErrorHandler");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(router);
app.use(globalErrorHandler);

app.get("/ping", (req, res, next) => {
  return res.json({ message: "pong" });
});

server.listen(PORT, () => {
  console.log(`open server with ${PORT}`);
  database
    .initialize()
    .then(() => {
      console.log(`typeORM dataSource init success`);
    })
    .catch(() => {
      console.log(`typeORM dataSource init failed`);
    });
});