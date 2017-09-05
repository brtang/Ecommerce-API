var routes = require('express').Router();
    express = require('express');
    config = require('../config/config');      
    clientController = require('../controllers/client-controller');
     
  


module.exports = function(app){
    app.get('/view-customers', clientController.viewCustomers);
    
    // Task 3
    app.get('/view-customer-categories', clientController.viewCustomersCategories);
    
    //Task 5
    app.post('/view-product-breakdown', clientController.returnBreakdownByDateRange);  
    
    // Task 6
    app.post('/view-order', clientController.returnCustomersOrder);
    
};