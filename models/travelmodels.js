var mongoose = require('mongoose');

var willvisitSchema = mongoose.Schema({ 
    country: String,
    priority: String
}, {collection : "willvisit"});

var visitedSchema = mongoose.Schema({ 
    rank : Number, 
    country: String
}, {collection : "visited"});

var willvisit = mongoose.model('willvisit', willvisitSchema);
var visited = mongoose.model('visited', visitedSchema);

module.exports = { willvisit : willvisit, visited : visited };
