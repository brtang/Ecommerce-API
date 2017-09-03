var bodyParser = require('body-parser'); 

exports.viewCustomers = function(req, res, next) {
    console.log("Made it to viewCustomers route");
    
    db.customers.viewCustomers()
    .then(data => {
        console.log("Query: ", data);
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