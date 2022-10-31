-- migrate:up
CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    english_name VARCHAR(100) NOT NULL,
    korean_name VARCHAR(100) NOT NULL
)

-- migrate:down
DROP TABLE categories