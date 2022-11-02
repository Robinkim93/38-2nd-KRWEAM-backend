-- migrate:up
CREATE TABLE buy_prices (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT buy_prices_products_fkey FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT buy_prices_users_fkey FOREIGN KEY (user_id) REFERENCES users (id)
)

-- migrate:down
DROP TABLE buy_prices