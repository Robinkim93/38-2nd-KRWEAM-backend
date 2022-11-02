-- migrate:up
CREATE TABLE interested_items (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    size_id INT NOT NULL,
    CONSTRAINT interested_items_products_fkey FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT interested_items_users_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT interested_items_sizes_fkey FOREIGN KEY (size_id) REFERENCES sizes (id),
    CONSTRAINT product_id_users_id_size_id_ukey UNIQUE (product_id, user_id, size_id)
)

-- migrate:down
DROP TABLE interested_items
