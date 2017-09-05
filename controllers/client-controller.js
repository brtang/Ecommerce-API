var bodyParser = require('body-parser'); 

// API end point for returning customers in DB
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

// Task 6: An API end point that returns the orders for a customer
exports.returnCustomersOrder = function(req, res, next){
    
    if(!req.body.id){
        return res.json({
            success: false,
            message: 'Id value required in request body'
        });
    
    }else{
        var customer_id = req.body.id;
    }
    
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

// Task 3: Returns the categories purchased and quantity for a customer
exports.viewCustomersCategories = function(req, res, next){
    db.customers.viewCustomerCategories()
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

// Task 5: An API end point that accepts a date range and a day, week, or month and returns a breakdown of products sold by quantity per day/week/month
exports.returnBreakdownByDateRange = function(req, res, next){

    if(!req.body.startdate){
        return res.json({
            success: false,
            message: 'Start date required in request body'
        });    
    }
    if(!req.body.enddate){
        return res.json({
            success: false,
            message: 'End date required in request body'
        });    
    }
    
    switch(req.body.range){
        case 'month':
            db.customers.returnProductsByMonth({
                startDate: req.body.startdate,
                endDate: req.body.enddate
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
            break;
        case 'week': 
            db.customers.returnProductsByWeek({
                startDate: req.body.startdate,
                endDate: req.body.enddate
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
            break;
        default:
            db.customers.returnProductBreakdown({
                startDate: req.body.startdate,
                endDate: req.body.enddate
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
    
}