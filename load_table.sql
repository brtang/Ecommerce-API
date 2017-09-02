/* Enum for status 
CREATE TYPE Status AS ENUM('Waiting', 'On its way', 'Delivered');
*/

/* This table is to store all purchasable Products */
CREATE TABLE IF NOT EXISTS Products( 
    Product_Id SERIAL,
    name varchar(50) NOT NULL,
    price double precision NOT NULL,
    PRIMARY KEY (Product_Id)
);

/*
INSERT INTO Products (name, price) VALUES ('32 GB Memory Card', 55.00), ('16 GB Memory Card', 26.50), ('Sony TV', 1150.00), ('Plasma TV', 25000.00), ('High Tech 3D TV', 999.00), ('Super Gaming High End PC', 2645.20), ( 'Retro tShirt', 35.00), ('Nike Trainers', 90.00), ('Addidas Trainers', 40.00);
*/

/* This table is to store all Categories available to Products */
CREATE TABLE IF NOT EXISTS Category( 
    Category_Id SERIAL,
    name varchar(50) NOT NULL,
    PRIMARY KEY (Category_Id)
);

/* Insert some data into Category table 
INSERT INTO Category (name) VALUES ('Memory Cards'), ('Televisions'), ('Computers'), ('Clothing'), ( 'Sports Clothing');
*/

CREATE TABLE IF NOT EXISTS Products_to_Category(
    Product_Id integer NOT NULL,
    Category_Id integer NOT NULL,
    PRIMARY KEY (Product_Id, Category_Id)
);

INSERT INTO Products_to_Category (Product_Id, Category_Id) VALUES (1, 1), (1, 3), (2, 1), (2, 3), (3, 2), (4, 2), (5, 2), (6, 3), (7, 4), (7, 5), (8, 4), (8, 5), (9, 4), (9, 5);

/* This table is to store all Customers in the system */
CREATE TABLE IF NOT EXISTS Customer(
    Customer_Id SERIAL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    PRIMARY KEY (Customer_Id)

);

/* Insert some Customer data 
INSERT INTO Customer (first_name, last_name) VALUES ('Brian', 'Tang'), ('Natasha', 'Yeh');
*/

/* This table is to map all Orders made by Customers */
CREATE TABLE IF NOT EXISTS Customer_Orders(
    Order_Id SERIAL,
    Customer_Id integer REFERENCES Customer(Customer_Id),
    Time_stamp timestamp NOT NULL,
    status Status DEFAULT 'Waiting',
    PRIMARY KEY (Order_Id)
);

/* Insert some Orders data 
INSERT INTO Customer_Orders (Customer_Id, Time_stamp, status) VALUES (1, '1/8/1999', 'Waiting'), (2, '1/9/1999', 'Waiting');
*/

/* This table is to map each different Product and amount for an Order */
CREATE TABLE IF NOT EXISTS Customer_Ordered_Product(
    Order_Id integer REFERENCES Customer_Orders(Order_Id),
    Product_Id integer REFERENCES Products(Product_Id),
    quantity integer
);

SELECT SUM(quantity) 
FROM Customer_Ordered_Product
WHERE Product_Id = 1;

/* Insert some Customer Ordered Products data  */
INSERT INTO Customer_Ordered_Product (Order_Id, Product_Id, quantity) VALUES (1, 1, 20), (1, 3, 5), (2, 4, 15), (2, 6, 18), (2, 5, 7), (2, 3, 5);
