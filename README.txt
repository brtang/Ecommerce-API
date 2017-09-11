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


