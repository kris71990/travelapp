var travelList = require('../models/travelmodels');
var bodyParser = require('body-parser');

module.exports = function(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	
	app.get('/api/travelList/:priority', function(req, res) {
		travelList.find({ priority: req.params.priority }, function(err, travelList) {
            if (err) throw err;
            res.send(travelList);
        });
	});
	
	
	app.post('/api/travellist', function(req, res) {
		
		if (req.body.id) {
			travelList.findByIdAndUpdate(req.body.id, { place : req.body.place, 
			priority : req.body.priority, hasGone : req.body.hasGone }, 
			function(err, list) {
				if (err) throw err;
				res.send('Success');
			});
		} else {
			var newEntry = travelList({
				place : req.body.place,
				priority : req.body.priority,
				hasGone : req.body.hasGone
			});
			newEntry.save(function(err) {
				if (err) throw err;
				res.send('Success');
			});
		};
	});
	
	app.delete('/api/travellist', function(req, res) {
		travelList.findByIdAndRemove(req.body.id, function(err) {
			if (err) throw err;
			res.send('Success');
		});
	});
}