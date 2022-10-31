-- migrate:up
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    english_name VARCHAR(100) NOT NULL,
    korean_name VARCHAR(100) NOT NULL,
    thumbnail VARCHAR(3000) NOT NULL,
    model_number VARCHAR(100),
    relseased_price DECIMAL NOT NULL,
    category_id INT NOT NULL,
    gender_id INT NOT NULL,
    brand_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT products_category_fkey FOREIGN KEY (category_id) REFERENCES categories (id),
    CONSTRAINT products_gender_fkey FOREIGN KEY (gender_id) REFERENCES genders (id),
    CONSTRAINT products_brand_fkey FOREIGN KEY (brand_id) REFERENCES brands (id)
)

-- migrate:down
DROP TABLE products
