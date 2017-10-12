var express = require('express');
var app = express();
var request = require('request');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var database = require('./models/travelmodels');
var port = process.env.PORT || 3000;

//money.js - openexchangerates.github; currency exchange rates api
var money = "https://openexchangerates.org/api/latest.json?app_id=";
var apiKey = "*****";

var uri = "mongodb://USERNAME:PASSWORD@cluster0-shard-00-00-2u9zo.mongodb.net:27017,cluster0-shard-00-01-2u9zo.mongodb.net:27017,cluster0-shard-00-02-2u9zo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(require('./routes/index'));
app.use(require('./routes/api'));
app.use(require('./routes/api2'));

mongoose.connect(uri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection established");
});

app.listen(port, function () {
	console.log("Listening on port: " + port);
});


/*
setupController(app);
apiController(app);

request(money + apiKey, function(error, response, body) {
	console.log(body);
});

https://openexchangerates.org/api/latest.json?app_id={key}

exchange rate api key = *****
*/
