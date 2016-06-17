module.exports = function(app) {
	console.log('routes initialised');
	
	var utilController = require('../api/util/util.controller.js');
	var route = app.loopback.Router();

	var util = new utilController;

	console.log('before hitting route = ', util);

	route.get('/getJsonName', util.getJsonFileName);
	app.use(route);
}

