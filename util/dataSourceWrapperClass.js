const { DataSource } = require("typeorm");

class Database {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async query(sql, params) {
    return await this.dataSource.query(sql, params);
  }

  async initialize() {
    return await this.dataSource.initialize();
  }

  async destroy() {
    return await this.dataSource.destroy();
  }
}

const typeOrmDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

const database = new Database(typeOrmDataSource);

module.exports = database;
