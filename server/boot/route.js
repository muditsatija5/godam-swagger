module.exports = function(app) {
	
	var utilController = require('../api/util/util.controller.js');
	var route = app.loopback.Router();
	var util = new utilController;
	route.get('/getJsonName', util.getJsonFileName);
	app.use(route);
}

