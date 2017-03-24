(function(){
	'use strict';
	
	angular
		.module('flickrApp')
		.config(config);

	config.$inject = ['$routeProvider'];
	
	function config($routeProvider){
		// '$uibModal', '$uibModalInstance'
	//, $uibModal, $uibModalInstance
		$routeProvider
				.when('/', {
					templateUrl: 'templates/states/home.html'
				})

				.when('/:id', {
					templateUrl: 'templates/states/home.html',
					reloadOnSearch: true,
					controller: function($scope, $routeParams, $location) {

						$scope.setCurrentPhoto($routeParams.id);
						if (!$scope.currentPhoto || $scope.loading) {
							$location.path('/');
							return;
						}
						//$uibModal.open()
					},
					resolve: {
						contact: ['PhotoInfo', '$stateParams', function(PhotoInfo, $stateParams) {
							return PhotoInfo.get({ id: $stateParams.id });
						}]
					}
				})
	}
})();