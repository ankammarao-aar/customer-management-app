-- CREATE TABLE customers(
--     id INTEGER NOT NULL PRIMARY KEY,
--     first_name TEXT NOT NULL,
--     last_name TEXT NOT NULL,
--     phone_number TEXT NOT NULL UNIQUE
-- );

-- INSERT INTO customers(id, first_name, last_name, phone_number)
-- VALUES (1, "kumar", "a", "9944532169");

-- SELECT * FROM customers;
-----------------------------------------------------------------

-- CREATE TABLE addresses(
--     id INTEGER NOT NULL PRIMARY KEY,
--     customer_id INTEGER,
--     address_details TEXT NOT NULL,
--     city TEXT NOT NULL,
--     state TEXT NOT NULL,
--     pin_code TEXT NOT NULL,
--     FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
-- );

-- INSERT INTO addresses(id, customer_id, address_details, city, state, pin_code)
-- VALUES (1, 1, "Prakash Nagar", "NRT", "AP", "522016"),
-- (2, 3, "Market", "Guntur", "AP", "520015"),
-- (3, 1, "Vijayawada", "Vijayawada", "AP", "521234"),
-- (4, 2, "Au Campus", "Visakhapatnam", "AP", "520894");


-- SELECT * FROM addresses;

-- PRAGMA TABLE_INFO(addresses);