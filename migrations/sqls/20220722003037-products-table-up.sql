CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(150) NOT NULL,
    category varchar(150),
    price INTEGER NOT NULL 
    )