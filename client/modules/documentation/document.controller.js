'use strict';

var app = angular.module('swaggerApp');

app.controller('docController', function($scope, $rootScope, $state, $http, $stateParams, documentService, settings) {
	console.log('doc init');
	$scope.apiList = [];

	/*	get swagger json file name service
	*	This service gets the name of the swagger files
	*/
	$scope.getJsonData = function() {
		documentService.getFileName().then(function(success) {
			// console.log('getting jsons = ', success.data);
			var swagFiles = success.data;
			$rootScope.projName = [];
			swagFiles.forEach(function(fileName) {
			// console.log(fileName);
				documentService.getJsonFile(fileName).then(function(jsonObj) {
					// console.log('item = ', jsonObj);
					$scope.definitions = jsonObj.data.definitions;
					$rootScope.projName.push({title: jsonObj.data.info.title, fileName: fileName});
					for(var key in jsonObj.data.paths) {
						var newObj = {},
							temp = null;
						newObj['title'] = jsonObj.data.info.title;
						newObj['fileName'] = fileName;
						newObj['api'] = key;
						temp = Object.keys(jsonObj.data.paths[key]);
						newObj['requestType'] = temp[0];
						newObj['data'] = jsonObj.data.paths[key][Object.keys(jsonObj.data.paths[key])];
						if(jsonObj.data.paths[key][Object.keys(jsonObj.data.paths[key])].tags) 
							newObj['tags'] = jsonObj.data.paths[key][Object.keys(jsonObj.data.paths[key])].tags[0];
						$scope.apiList.push(newObj);
						// console.log(jsonObj.data);
					}

				}, function(error) {
					//error to be handeled
					console.log('error = ', error);
				});
			});
		}, function(err) {
			console.log('getting jsons = ', err);
		});
	}

	$scope.toSwagger = function(swagObj) {
		// console.log(swagObj);
		var apiUrl = null;
		var urlLen = swagObj.url.length;
		apiUrl = (swagObj.url[0] === '/' ? swagObj.url.substring(1) : swagObj.url);
		apiUrl = (apiUrl[urlLen-2] === '/' ? apiUrl.replace(/\/$/, '') : apiUrl);
		apiUrl = apiUrl.replace(/\//g, '_');
		apiUrl = apiUrl.replace(/[\{\}]/g, '');
		apiUrl = swagObj.requestType+'_'+apiUrl;

		// console.log('apiUrl = ', apiUrl, 'tags = ', swagObj.tag);
		
		$state.go('swagger', {
			parentUrl: swagObj.tag.trim(),
			dynamicUrl: apiUrl.trim(),
			param: swagObj.fileName
		});
	}

	$scope.getPageDetails = function() {
		
		$scope.apiObject = $stateParams.apiObj;
		$scope.ref = $stateParams.definitions;
		$scope.showRequestBody = false;
		for(var key in $scope.apiObject.data.parameters) {
			if($scope.apiObject.data.parameters[key].schema) {
				// console.log('parameters = ', $scope.apiObject.data.parameters[key].schema);
				var tempVar = $scope.apiObject.data.parameters[key].schema['$ref'].split('definitions/');
				$scope.requestBody = angular.copy($scope.ref[tempVar[1]]);
				if($scope.ref[tempVar[1]]) {
					$scope.requestBody = angular.copy($scope.ref[tempVar[1]].properties);
				}
				$scope.showRequestBody = true;
			}
		}

		// console.log('apiObj = ', $scope.apiObject, 'ref = ', $scope.ref);
		var responses = angular.copy($scope.apiObject.data.responses);
		$scope.responses = [];
		for(var key in responses) {
			// console.log('^^^^ = ', key);
			var obj = {};
			// console.log('0 keys = ', responses[key].schema);
			if(responses[key].schema) {
				console.log('1 schemas = ', responses[key].schema["$ref"]);
				var tempVar = responses[key].schema["$ref"].split("definitions/");
				obj["schemaRef"] = tempVar[1];
				if(key == '200') {
					$scope.responseFields(tempVar[1]); // sending reference schema name
				}
			}
			console.log('2');
			obj["responseName"] = key;
			obj["description"] = responses[key].description;
			$scope.responses.push(obj);
			// console.log('responses = ', $scope.responses);
		}

		setTimeout(function() {
			if($scope.ref) {
				console.log('here');
				document.getElementById('_0').click();
			}
		}, 1500);
	};

	$scope.getResponseSchema = function(schema) {
		console.log('schema = ', $scope.ref[schema]);
		$scope.selectedSchema = angular.copy($scope.ref[schema]);
		if($scope.ref[schema]) {
			$scope.selectedSchema = angular.copy($scope.ref[schema].properties);
		} else {
			console.log('else schema = ', $scope.ref);
		}
		// console.log('selectedSchema = ', $scope.selectedSchema);
	};

	$scope.responseFields = function(schema) {
		console.log('3');
		if($scope.ref[schema]) {
			console.log('4');
			$scope.responseParams = angular.copy($scope.ref[schema]);
		}
	}
});