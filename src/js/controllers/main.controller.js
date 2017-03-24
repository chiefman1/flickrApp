(function(){
	'use strict';
	
	angular
		.module('flickrApp')
		.controller('mainController', mainController);

	mainController.$inject = ['$scope','$routeParams', '$location', 'dataService'];
	
	function mainController($scope, $routeParams, $location, dataService) {
		var vm = this;

		vm.searchImage = function() {
			$scope.search($scope.text);
		};

		$scope.$watch('text', vm.searchImage);

		$scope.photos = [];
		$scope.currentPhoto = null;
		$scope.prevPhoto = null;
		$scope.nextPhoto = null;
		$scope.currentPhotoSrc = '';
		$scope.text = '';
		$scope.modalOpened = null;
		$scope.search = function(search, page){
			$scope.loading = true;
			var promise = dataService.search(search, page);
			promise.then(function(data) {
				$scope.photos = data.data.photos;
				$scope.photos = data.data.photos.photo;
				$scope.page = data.data.photos.page;
				$scope.pages = data.data.photos.pages;
				$scope.total = data.data.photos.total;
				vm.paginator();
				$scope.loading = false;

			}, function(err) {
				console.log('Failed: ' + err);
				$scope.loading = false;
			});
		};

		$scope.selectPhoto = function(id){
			$location.path( '/' + String(id) );
		};

		$scope.loading = true;

		vm.paginator = function(){

			var currentPage = $scope.page;
			var totalPages = $scope.pages;
			var pageNav = [];

			if(currentPage > 1){
				pageNav.push({text: '<< Back', number: currentPage - 1, current: false});
			}

			for(var i=1;i <= totalPages;i++){
				if(i==currentPage){
					if(currentPage==1){
						pageNav.push({text: currentPage, number: currentPage, current: true});
					}
				} else{
					if(i >= currentPage - 4 && i < currentPage + 4 ){
						pageNav.push({text: i, number: i, current: true});
					}
				}
			}
			if(currentPage < totalPages){
				pageNav.push({text: 'Next >>', number: (currentPage + 1), current: false});
			}
			$scope.pageNav = pageNav;
		};

		$scope.search();

	}
})();