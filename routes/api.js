var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/travelmodels');
var router = express.Router();

router.get('/api', function(req, res) {   
    models.willvisit.find({}, function(err, countries) {
       res.send(countries);
    })
});

module.exports = router;
