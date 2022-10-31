const Database = require("../util/dataSourceWrapperClass");

const createUser = async (nickname, phoneNumber, email, hashPwd) => {
  await Database.query(
    `
    INSERT INTO users (nickname, phone_number, email, password) 
    VALUES (?, ?, ?, ?)
  `,
    [nickname, phoneNumber, email, hashPwd]
  );
};

const searchUser = async (email) => {
  const data = await Database.query(
    `SELECT id, email, nickname, password
    FROM users
    WHERE email = ?`,
    [email]
  );

  return data[0];
};

module.exports = { createUser, searchUser };
