(function(){
	'use strict';
	
	angular
		.module('flickrDataModule', ['ngResource'])
		.factory('dataService', dataService);
		
	dataService.$inject = ['$http', '$q'];

	function dataService($http, $q){

		var service = this;

		service.perPage =  150;
		service.api_key = "1c8c3a7a81e8908b7066c6f7dd058016";
		service.base_url= "https://api.flickr.com/services/rest/";

		service.search = function(search, page){
			var deferred = $q.defer();
			var promise = deferred.promise;

			var params = {
				api_key: service.api_key,
				per_page: service.perPage,
				format: 'json',
				nojsoncallback: 1,
				page: (page != null && page > 0) ? page : 1,
				method: (search != null && search.length > 0) ? 'flickr.photos.search' : 'flickr.photos.getRecent'
			};


			if ((search != null && search.length > 0)) {
				params.text = search;
			}

			$http({
				method: 'GET',
				url: service.base_url,
				params: params
			}).then(function successCallback(data, status, headers, config) {
				deferred.resolve(data);
				//console.log(data);
			}, function errorCallback(data, status, headers, config) {
				deferred.reject(status);
			});

			return deferred.promise;



		};

		service.getInfo = function(photoId) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			var params = {
				api_key: service.api_key,
				photo_id: photoId,
				format: 'json',
				method: 'flickr.photos.getInfo'
			};

			$http({
				method: 'GET',
				url: service.base_url,
				params: params
			}).then(function successCallback(data, status, headers, config) {
				deferred.resolve(data);
				console.log(data);
			}, function errorCallback(data, status, headers, config) {
				deferred.reject(status);
			});

			return deferred.promise;
		};

		return service;

	}
})();