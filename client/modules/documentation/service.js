'use strict';

var app = angular.module('swaggerApp');

app.service('documentService', function($http) {
	this.getJsonFile = function(fileName) {
		return $http({
			'url': 'swagger_jsons/' + fileName,
			'method': 'GET'
		});
	}
	
	this.getFileName = function() {
		return $http({
			'url': '/getJsonName',
			'method': 'GET'
		});
	}
});