-- migrate:up
CREATE TABLE sell_prices (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    price DECIMAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT sell_prices_products_fkey FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT sell_prices_users_fkey FOREIGN KEY (user_id) REFERENCES users (id)
)

-- migrate:down
DROP TABLE sell_prices