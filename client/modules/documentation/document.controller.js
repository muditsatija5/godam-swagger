'use strict';

var app = angular.module('swaggerApp');

app.controller('docController', 
	function($scope, $rootScope, $state, $http, $stateParams, documentService) {
	
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
				var swagFiles = success.data;
				
				swagFiles.forEach(function(fileName) {
					documentService.getJsonFile(fileName).then(function(jsonObj) {
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
			var apiUrl = null;
			var urlLen = swagObj.url.length;
			apiUrl = (swagObj.url[0] === '/' ? swagObj.url.substring(1) : swagObj.url);
			apiUrl = (apiUrl[urlLen-2] === '/' ? apiUrl.replace(/\/$/, '') : apiUrl);
			apiUrl = apiUrl.replace(/\//g, '_');
			apiUrl = apiUrl.replace(/[\{\}]/g, '');
			apiUrl = swagObj.requestType+'_'+apiUrl;

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
					var tempVar = $scope.apiObject.data.parameters[key].schema['$ref'].split('definitions/');
					$scope.requestBody = angular.copy($scope.ref[tempVar[1]]);
					if($scope.ref[tempVar[1]]) {
						$scope.showRequestBody = true;
						$scope.requestBody = angular.copy($scope.ref[tempVar[1]].properties);
					} else {
						$scope.showRequestBody = false;
					}
				}
			}

			var responses = angular.copy($scope.apiObject.data.responses);
			var counter = 0;
			for(var key in responses) {
				var obj = {};
				if(responses[key].schema) {
					var tempVar = responses[key].schema["$ref"].split("definitions/");
					obj["schemaRef"] = tempVar[1];
					if(key == '200') {
						responseFields(tempVar[1]); // sending reference schema name to responseFields() function.
					}
				}
				obj["responseName"] = key;
				obj["description"] = responses[key].description;
				counter++;
				$scope.responses.push(obj);
			}
		};

		$scope.getResponseSchema = function(schema)	{
			$scope.selectedSchema = angular.copy($scope.ref[schema]);
			if($scope.ref[schema]) {
				$scope.selectedSchema = angular.copy($scope.ref[schema].properties);
			} else {
				$scope.selectedSchema = {'data': 'not available'};
			}
		};

		function responseFields(schema) {
			if($scope.ref[schema]) {
				$scope.responseParams = angular.copy($scope.ref[schema]);
			}
		}
});