-- migrate:up
ALTER TABLE users ADD kakao_id BIGINT NULL;
ALTER TABLE users MODIFY email VARCHAR(100) NULL;
ALTER TABLE users MODIFY password VARCHAR(200) NULL;
ALTER TABLE users MODIFY phone_number VARCHAR(30) NULL;
-- migrate:down

