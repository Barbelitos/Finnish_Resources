require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Require Routes
const allRoutes = require('./routes/routes');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use(express.static('public'))


app.use('/', allRoutes);


app.listen( process.env.PORT || 3000, process.env.IP, function(){
    console.log('Server Started');
});