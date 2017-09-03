// NPM packages 
var express = require('express');
    bodyParser = require('body-parser');
    db = require('./db');
    
// Custom imports
var routes = require('./routes');
var config = require('./config/config');

// Initialiaze Express server    
var app = express();
app.set('port', process.env.PORT || 8080);

// Middleware

app.use(bodyParser.urlencoded({ extended: true}));
routes(app);


// Configure server's port
app.listen(app.get('port'), function(){
   console.log('Express started on http://localhost:' + 
   app.get('port') + '; press Ctrl-C to terminate.');
});