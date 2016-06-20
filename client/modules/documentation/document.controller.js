'use strict';

var app = angular.module('swaggerApp');

app.controller('docController', 
	function($scope, $rootScope, $state, $http, $stateParams, documentService, settings) {
	
		$rootScope.projName = [];

		$scope.apiList = [];
		$scope.responses = [];
		$scope.definitions = null;
		$scope.apiObject = null;
		$scope.ref = null;
		$scope.showRequestBody = null;
		$scope.requestBody = null;
		$scope.responseParams = null;
		$scope.selectedSchema = null;
		$scope.error = false;
		$scope.errorMsg = null;

		/*
		*	This service gets the name of the swagger files
		*/
		$scope.getJsonData = function() {
			documentService.getFileName().then(function(success) {
				// console.log('getting jsons = ', success.data);
				var swagFiles = success.data;
				
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
						$scope.errorMsg = error;
						$scope.error = true;
					});
				});
			}, function(err) {
				$scope.errorMsg = err;
				$scope.error = true;
			});
		}

		/*
		*Redirects to swagger UI with custom URL
		*/
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
			console.log('inside');
			$scope.apiObject = $stateParams.apiObj;
			$scope.ref = $stateParams.definitions;
			$scope.showRequestBody = false;
			for(var key in $scope.apiObject.data.parameters) {
				if($scope.apiObject.data.parameters[key].schema) {
					// console.log('parameters = ', $scope.apiObject.data.parameters[key].schema);
					var tempVar = $scope.apiObject.data.parameters[key].schema['$ref'].split('definitions/');
					$scope.requestBody = angular.copy($scope.ref[tempVar[1]]);
					if($scope.ref[tempVar[1]]) {
						// console.log('reqBodyAvail');
						$scope.showRequestBody = true;
						$scope.requestBody = angular.copy($scope.ref[tempVar[1]].properties);
					} else {
						// console.log('request body not available');
						$scope.showRequestBody = false;
					}
				}
			}

			// console.log('apiObj = ', $scope.apiObject, 'ref = ', $scope.ref);
			var responses = angular.copy($scope.apiObject.data.responses);
			var counter = 0;
			for(var key in responses) {
				// console.log('key = ', key);
				var obj = {};
				// console.log('0 keys = ', responses[key].schema);
				if(responses[key].schema) {
					// console.log('1 schemas = ', responses[key].schema["$ref"]);
					var tempVar = responses[key].schema["$ref"].split("definitions/");
					obj["schemaRef"] = tempVar[1];
					if(key == '200') {
						responseFields(tempVar[1]); // sending reference schema name to responseFields() function.
					}
				}
				// console.log('2');
				obj["responseName"] = key;
				obj["description"] = responses[key].description;
				counter++;
				$scope.responses.push(obj);
				console.log('counting counting upto = ', Object.keys(responses).length, counter);
				// if(counter == Object.keys(responses).length) {
				// 	console.log('counter done counting upto = ', Object.keys(responses).length);
				// 	// document.getElementById('_0').click();
				// }
				// console.log('responses = ', $scope.responses);
			}

			// setTimeout(function() {
			// 	if($scope.ref) {
			// 		// console.log('here');
			// 		document.getElementById('_0').click();
			// 	}
			// }, 1500);
		};

		$scope.getResponseSchema = function(schema)	{
			// console.log('schema = ', $scope.ref[schema]);
			$scope.selectedSchema = angular.copy($scope.ref[schema]);
			if($scope.ref[schema]) {
				$scope.selectedSchema = angular.copy($scope.ref[schema].properties);
			} else {
				// console.log('else schema = ', $scope.ref);
				$scope.selectedSchema = {'data': 'not available'};
			}
			// console.log('selectedSchema = ', $scope.selectedSchema);
		};

		function responseFields(schema) {
			// console.log('3');
			if($scope.ref[schema]) {
				// console.log('4');
				$scope.responseParams = angular.copy($scope.ref[schema]);
			}
		}
});