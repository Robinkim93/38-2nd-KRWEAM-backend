-- migrate:up
ALTER TABLE products ADD COLUMN color VARCHAR(200) NULL AFTER brand_id

-- migrate:down
DROP TABLE products
