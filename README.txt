Shipt coding challenge for Brian Tang

Basic API application, where a customer can have an order that is made up of products

This API application was written using Node.JS and Express. Data and queries were stored and tested in PostgreSQL. 
To use this application, a local Postgres and Node.JS client is required. 
First install NPM modules using 'npm install' command on the Node.JS command line.
Using the Postgres client, create a database and load the tables and sample data into the database using '\i load_table.sql' command. 
Then navigate to config/config.js and enter user, database, and password credentials for your database. 
Start the Express server using 'node server.js'; An error will be reported if the database connection was unsuccessful  

# File structure
config/config.js contains an object for database credentials and future configuration parameters
controllers/ contains logic for handling API requests. Using the database object, each function makes its own query into the database
db/ contains database connection code as well as queries using the pg-promise library
routes/index.js contains API endpoints. Business logic is delegated to a controller function
load_table.sql creates SQL tables and enters some sample data
queries.sql was used to test queries through the Postgres client before using them in the API

# API Documentation

Responses with status code 200 will have data sent in JSON format

GET /view-customers

GET /view-customer-categories

POST /view-product-breakdown

parameter name: startdate,
Required: Yes,
Description: Start date for date filter, format must be in MM/DD/YYYY

parameter name: enddate,
Required: Yes,
Description: End date for date filter, format must be in MM/DD/YYYY

parameter name: range,
Required: No,
Description: Specifies breakdown by day, week, or month. Default is by day. Breakdown by week requires 'week'. Breakdown by month requires 'month'.

POST /view-order

parameter name: id,
Required: Yes,
Description: Customer_Id for which the API will return the orders for


# Additional questions

- We want to give customers the ability to create lists of products for one-click ordering of bulk items. How would you
design the tables, what are the pros and cons of your approach?

The simplest solution would be to have a table for orders based on customer_id and another table for products_orders based on order_id.
Products_orders table contains a mapping of each product and the quantity of that product within an order.
In this way, orders can have multiple products simulating a list of products. 
The cons to this approach is that placing an order of a list of products has an overhead from having to insert multiple columns into two tables.
An entry for each different product would have to be inserted into the products_order table and an entry for the order would have to be inserted into orders table.
Furthermore, lookup of an order requires a join which adds more overhead to a query. 

- If Shipt knew exact inventory of stores, and when facing a high traffic and limited supply of particular item, how do
you distribute the inventory among customers checking out?

If facing a limited supply of a particular item, the UI should inform the user that the particular product is low in quantity when a user views that item (eg. 100 items left). 
In this way, the user is informed that there is a low number items in the case that the user was planning on purchasing a higher quantity of items that there is available. 
Secondly, Shipt should focus on maximizing the number of satisfied customers rather than a first-come-first-serve algorithm. 
The problem with a first-come-first-serve approach is say with 100 items left of a product, the first customer to order within the high traffic of customers orders 90 of the 100 items. 
If Shipt allows this customer to place their order, at best only 10 other customers will be able to place their orders assuming they order only one item of the product. 
Therefore only 11 customers will be satisfied while the rest of the customers in the high traffic are left dissatisfied. 
With that being said, a dynamic programming approach works best with the goal in mind being to maximize the amount of satisfied customers. 
Customers placing an order should be placed into a waiting queue with their order quantity for the product. 
The customers who want to purchase the least amount of the product in the queue should have their orders placed to maximize the amount of satisfied customers. 
If there are multiple customers who want to purchase the least amount, a first-come-first-serve algorithm will be used to determine among those orders, whose order is placed first.
The algorithm will continue placing orders in the waiting queue for whom are ordering the least amount of product in the queue until everybody in the waiting queue has been served or the inventory runs out.
If the inventory runs out, customers in the waiting queue who were not able to have their order placed should be informed that they will be notified when the product is back in stock. 
With this approach, Shipt is able to satisfy and distribute their limited inventory to the most amount of customers.

