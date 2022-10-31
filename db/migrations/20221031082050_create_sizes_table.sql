-- migrate:up
CREATE TABLE sizes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    size VARCHAR(20) NOT NULL,
    CONSTRAINT sizes_categories_fkey FOREIGN KEY (category_id) REFERENCES categories (id)
)

-- migrate:down
DROP TABLE sizes
