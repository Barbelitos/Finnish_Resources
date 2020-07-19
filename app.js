var express = require('express');
var app = express();

//Require Routes
var pageRoutes = require('./routes/pages');

app.set('view engine', 'ejs');

app.use(express.static('public'))


app.use('/', pageRoutes);


app.listen( process.env.PORT || 3000, process.env.IP, function(){
    console.log('Server Started');
});