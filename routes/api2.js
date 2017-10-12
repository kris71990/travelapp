var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/travelmodels');
var router = express.Router();

router.get('/api2', function(req, res) {   
    models.visited.find({}, function(err, countries) {
       res.send(countries);
    })
});

module.exports = router;