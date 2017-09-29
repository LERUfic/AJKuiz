var thoniApp = angular.module('thoniApp', ['ngRoute']);

thoniApp.controller('mainController', function($scope, $http){
	$scope.title = 'Hai';

	$scope.submitName=function(){
		var data = {
			'nama' : $scope.name
		};

		//alert($.param(data));

		$http({
			url:"http://localhost/thoni/welcome/post",
			method : "POST",
			data:data
		}).then(function success(response)
		{

			$scope.show_name=response.data.name;
			$scope.status=response.data.status;
			console.log(response.data);
		});
	}
});
