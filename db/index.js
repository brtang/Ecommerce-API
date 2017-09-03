var config = require('../config/config');

var repos = {
  //  users: require('./repos/users'),
      customers: require('./repos/customers')
};


var options = {
   
    // Extending the database protocol with our custom repositories:
    extend: obj => {
        obj.customers = repos.customers(obj, pgp);
        //obj.users = repos.users(obj, pgp);
       
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

// Load and initialize pg-promise:
var pgp = require('pg-promise')(options);

// Create the database instance:
var db = pgp(config);

db.connect()
    .then(obj => {
        console.log("DB connected");
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

module.exports = db;