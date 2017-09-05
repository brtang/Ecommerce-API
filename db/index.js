var config = require('../config/config');

// Repos containing DB queries
var repos = {
      customers: require('./repos/customers')
};

// Extend database protocol with our custom repos
var options = {
   
    extend: obj => {
        obj.customers = repos.customers(obj, pgp);          
    }

};

// Database connection parameters:
var config = {
  user: config.user,
  password: config.password,
  host: config.host,
  database: config.database,
  port: config.port, 
};

// Initialize pg-promise:
var pgp = require('pg-promise')(options);

// Create DB instance:
var db = pgp(config);

// Check if DB connection is successful
db.connect()
    .then(obj => {
        console.log("DB connected");
        obj.done(); 
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

module.exports = db;