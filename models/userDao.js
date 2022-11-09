const { database } = require("../util/dataSourceWrapperClass");
const { point } = require("./enums");

const createUserWithEmail = async (nickName, phoneNumber, email, password) => {
  const result = await database.query(
    `
	  INSERT INTO users (
				nickname, 
                    phone_number,
				email, 
				password,
                    point
		) VALUES (
				?,
				?, 
				?, 
				?,
                    ?
		)`,
    [nickName, phoneNumber, email, password, point]
  );
  return result.insertId;
};

const getUserByEmail = async (email) => {
  const result = await database.query(
    `
		SELECT 
               id,
               email,
               password
		FROM users
		WHERE email=?`,
    [email]
  );
  return result[0];
};

const getUserById = async (id) => {
  const result = await database.query(
    `
		SELECT *
		FROM users
		WHERE id=?`,
    [id]
  );
  return result[0];
};

const getUserByKaKaoId = async (kakao_id) => {
  const result = await database.query(
    `
          SELECT *
          FROM users
          WHERE kakao_id=?`,
    [kakao_id]
  );
  return result;
};

const createUserWithKakao = async (nickName, kakao_id) => {
  const result = await database.query(
    `
          INSERT INTO users (
                       nickname, 
                       kakao_id,
                       point
             ) VALUES (
                       ?,
                       ?,
                       ? 
             )`,
    [nickName, kakao_id, point]
  );
  return result.insertId;
};

const getMyPageUserInfo = async (userId) => {
  return await database.query(`
          SELECT
          u.nickname,
          u.email,
          u.point
          FROM users AS u
          WHERE u.id = ${userId}
     `);
};

module.exports = {
  createUserWithEmail,
  getUserByEmail,
  getUserById,
  getUserByKaKaoId,
  createUserWithKakao,
  getMyPageUserInfo,
};
