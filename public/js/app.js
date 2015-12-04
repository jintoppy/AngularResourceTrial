var app = angular.module('myapp', ['ngResource'])
app.controller('MyCtrl',['$scope', 'User', 
	function($scope, User){
		$scope.user = User.get({id: 1}, function(user){
			$scope.user.name = "updated name";
			$scope.user.$update(function(){
				console.log('updated');
			});
		});

		$scope.users = User.query();
		$scope.newuser = {};
		$scope.addNewUser = function(){
			var user = new User();
			user.name = $scope.newuser.name;
			user.country = $scope.newuser.country;
			user.designation = $scope.newuser.designation;
			user.department = $scope.newuser.department;
			user.$save();
		};	
}]);


app.factory('User',['$resource', function($resource){

	return $resource('/api/users/:id', {id: '@id'},{
		update: {
			method: 'PUT'
		}
	});

}]);



