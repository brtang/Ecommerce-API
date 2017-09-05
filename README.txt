Shipt coding challenge for Brian Tang

Basic API application, where a customer can have an order that is made up of products

This API application was written using Node.JS and Express. Data and queries were stored and tested in PostgreSQL. 
To use this application, a local Postgres and Node.JS client is required. 
First install NPM modules using 'npm install' command on the Node.JS command line.
Using the Postgres client, create a database and load the tables and sample data into the database using '\i load_table.sql' command. 
Then navigate to config/config.js and enter user, database, and password credentials for your database. 
Start the Express server using 'node server.js'; An error will be reported if the database connection was unsuccessful  

#File structure
config/config.js contains an object for database credentials and future configuration parameters
controllers/ contains logic for handling API requests. Using the database object, each function makes its own query into the database
db/ contains database connection code as well as queries using the pg-promise library
routes/index.js contains API endpoints. Business logic is delegated to a controller function


#Additional questions
