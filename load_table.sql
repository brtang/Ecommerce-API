/* This table is to store all purchasable Products */
CREATE TABLE Products( 
    Product_Id SERIAL,
    PRIMARY KEY (Product_Id)

);

/* This table is to store all Categories available to Products */
CREATE TABLE Category( 
    Category_Id SERIAL,
    PRIMARY KEY (Category_Id)

);

CREATE TABLE Products_to_Category(
    Product_Id integer NOT NULL,
    Category_Id integer NOT NULL,
    PRIMARY KEY (Product_Id, Category_Id)
);

/* This table is to store all Customers in the system */
CREATE TABLE Customer(
    Customer_Id SERIAL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    PRIMARY KEY (Customer_Id)

);

/* This table is to map all Orders made by Customers */
CREATE TABLE Customer_Orders(
    Order_Id SERIAL,
    Customer_Id integer REFERENCES Customer(Customer_Id),

    PRIMARY KEY (Order_Id)
);

/* This table is to map each different Product and amount for an Order */
CREATE TABLE Customer_Ordered_Product(
    Order_Id integer REFERENCES Customer_Orders(Order_Id),
    Product_Id integer REFERENCES Products(Product_Id),
    quantity integer,
);
