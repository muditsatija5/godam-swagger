'use strict';

var app = angular.module('swaggerApp');

app.controller('swagController', function($scope, $rootScope, $state, $stateParams) {
	console.log('init');

	// console.log('params = ', $stateParams);

	var fileName = $stateParams.param;
	
	$(function () {
      var url = window.location.search.match(/url=([^&]+)/);
      if (url && url.length > 1) {
        url = decodeURIComponent(url[1]);
      } else {
        url = "/swagger_jsons/" + fileName;
      }

      hljs.configure({
        highlightSizeThreshold: 5000
      });

      // Pre load translate...
      if(window.SwaggerTranslator) {
        window.SwaggerTranslator.translate();
      }
      
      
      window.swaggerUi = new SwaggerUi({
        url: url,
        dom_id: "swagger-ui-container",
        onComplete: function(swaggerApi, swaggerUi){
          if(typeof initOAuth == "function") {
            initOAuth({
              clientId: "your-client-id",
              clientSecret: "your-client-secret-if-required",
              realm: "your-realms",
              appName: "your-app-name",
              scopeSeparator: ",",
              additionalQueryStringParams: {}
            });
          }

          console.log("yessssssss");

          if(window.SwaggerTranslator) {
            window.SwaggerTranslator.translate();
          }

          $('pre code').each(function(i, e) {
            hljs.highlightBlock(e)
          });
        },
        onFailure: function(data) {
          log("Unable to Load SwaggerUI");
        },
        docExpansion: "",
        jsonEditor: false,
        apisSorter: "alpha",
        defaultModelRendering: 'schema',
        showRequestHeaders: false
      });

      window.swaggerUi.load();


        // function addApiKeyAuthorization(){
        //   // var key = encodeURIComponent($('#input_apiKey')[0].value);
        //   if(key && key.trim() != "") {
        //     console.log('hi');
              // var apiKeyAuth = new SwaggerClient.ApiKeyAuthorization("api_key", key, "query");
              // swaggerUi.api.clientAuthorizations.add("key", new SwaggerClient.ApiKeyAuthorization("Authorization", key, "header"));
              // swaggerUi.api.clientAuthorizations.add("key", new SwaggerClient.ApiKeyAuthorization("X-Mashape-Key", "token 94ffa55afb5e31244385f2a0bd6238f947e7e2ba", "header"));
              // log("added key " + key);
      //     }
      // }

      // $('#input_apiKey').change(addApiKeyAuthorization);

      // if you have an apiKey you would like to pre-populate on the page for demonstration purposes...
      
        // var apiKey = "token 94ffa55afb5e31244385f2a0bd6238f947e7e2ba";
        // $('#input_apiKey').val(apiKey);
      

      // window.swaggerUi.load();

      function log() {
        if ('console' in window) {
          // console.log.apply(console, arguments);
        }
      }
  	});
});