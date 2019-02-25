
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(150) NOT NULL,
  department_name VARCHAR(150) NOT NULL,
  price DECIMAL(6,3),
  stock_quantity INTEGER(10) UNSIGNED NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUE 
 ("Sega Station 4", "Video Games", 300.00, 400),
 ("Game Pad", "Video Games", 59.99, 800),
 ("The amazing Lizard", "Video Games", 99.99, 300),
 ("TV", "Electronics", 300.00, 10),
 ("Sound bar", "Electronics", 400.00, 20),
 ("Web Camera", "Electronics", 99.99, 30),
 ("Keyboard", "Electronics", 150.00, 40),
 ("Mouse", "Electronics", 100.00, 40);

SELECT * FROM items


