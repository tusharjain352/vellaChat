chatApp.controller('groupCtrl',function($scope,$state,$stateParams,$rootScope,socket,httpFactory){

	$scope.groupdata = {};
	$scope.groups = [];
	$scope.createGroup = function(){
		console.log($scope.groupdata);
		$state.go('groupDetails',{ myparams:$scope.groupdata });
		// $scope.groups.push($scope.groupdata);

		// $state.go('groupDetails');
	}
});