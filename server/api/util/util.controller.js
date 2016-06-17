var path = require('path'),
	fs = require('fs');
var util = function(app) {
	console.log('getting initialised');
	console.log('working');
	// app.res('yess');
	this.getJsonFileName = function(req, res) {
		var files = [];
		fs.readdir('../client/swagger_jsons/', function(err,list){
		    if(err) throw err;
		    for(var i=0; i<list.length; i++)	{
	            console.log(list[i]); //print the file
	            files.push(list[i]); //store the file name into the array files
		    }
		    res.status('swager files sent successfully').send(files);
		});
	}
}

module.exports = util;