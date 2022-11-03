-- migrate:up
ALTER TABLE categories DROP english_name 

-- migrate:down
DROP TABLE categories

