CREATE TYPE StatusOfProduct AS ENUM('pending', 'fulfilled');
CREATE TABLE orders (
    id serial PRIMARY KEY, 
    user_id INTEGER NOT NULL REFERENCES users(id), 
    status StatusOfProduct NOT NULL 
)