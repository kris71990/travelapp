var travelList = require('../models/travelmodels');

module.exports = function(app) {
	
	app.get('/api/setuptravelList', function (req, res) {
		
		var starterList = [
			{
				place: 'China',
				priority: 'Medium',
				hasGone: true
			},
			{
				place: 'Russia', 
				priority: 'High',
				hasGone: true
			},
			{
				place: 'Brazil',
				priority: 'Low',
				hasGone: false
			}
		];
		
		travelList.create(starterList, function(err, results) {
			res.send(results);	
		});
	});
}