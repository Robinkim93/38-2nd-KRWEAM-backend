const { DataSource } = require("typeorm");

class Database {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }
  async query(sql, params) {
    return await this.dataSource.query(sql, params);
  }
};

const krweamDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

const database = new Database(krweamDataSource);

module.exports = { database, krweamDataSource };
