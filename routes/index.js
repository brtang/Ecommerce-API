var routes = require('express').Router();
      express = require('express');
      config = require('../config/config');      
      clientController = require('../controllers/client-controller');
     
  


module.exports = function(app){
    app.get('/customers', clientController.viewCustomers);
    
    app.post('/getOrder', clientController.returnCustomersOrder);
};