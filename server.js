require("dotenv").config();

const http = require("http");
const { createApp } = require("./krweam");
const { krweamDataSource } = require("./util/dataSourceWrapperClass");

const startServer = async () => {
  const app = createApp();
  const server = http.createServer(app);
  const PORT = process.env.PORT;

  app.get("/ping", (req, res, next) => {
    return res.status(200).json({ message: "pong" });
  });

  server.listen(PORT, () => {
    console.log(`open server with ${PORT}`);
    krweamDataSource
      .initialize()
      .then(() => {
        console.log(`typeORM dataSource init success`);
      })
      .catch((error) => {
        console.error(`typeORM dataSource init failed`, error);
      });
  });
};

startServer();
