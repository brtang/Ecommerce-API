var bodyParser = require('body-parser'); 

exports.viewCustomers = function(req, res, next) {
 
    db.customers.viewCustomers()
    .then(data => {     
        return res.send(data);
    })
     .catch(error => {
        console.log("Error: ", error);
        return res.json({
            success: false,
            error: error.message || error
        });
    });

}

//Task 6: An API end point that returns the orders for a customer
exports.returnCustomersOrder = function(req, res, next){
   
    var customer_id = req.body.id;
    
    db.customers.returnCustomersOrder({
        customer_id: customer_id
    })
    .then(data => {      
        return res.send(data);
    })
    .catch(error => {
        console.log("Error: ", error);
        return res.json({
            success: false,
            error: error.message || error
        });
    });
}

//Task 3: Returns the categories purchased and quantity for a customer
exports.returnCustomersCategories = function(req, res, next){
    
}

//Task 5: An API end point that accepts a date range and a day, week, or month and returns a breakdown of products sold by quantity per day/week/month
exports.returnBreakdownByDateRange = function(req, res, next){

}