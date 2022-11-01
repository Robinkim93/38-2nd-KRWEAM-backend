-- migrate:up
CREATE TABLE deal_histories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sell_user_id INT NOT NULL,
    buy_user_id INT NOT NULL,
    product_id INT NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    size_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT deal_histories_sell_users_fkey FOREIGN KEY (sell_user_id) REFERENCES users (id),
    CONSTRAINT deal_histories_buy_users_fkey FOREIGN KEY (buy_user_id) REFERENCES users (id),
    CONSTRAINT deal_histories_products_fkey FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT deal_histories_sizes_fkey FOREIGN KEY (size_id) REFERENCES sizes (id)
)

-- migrate:down
DROP TABLE deal_histories
