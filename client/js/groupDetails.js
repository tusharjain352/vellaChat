chatApp.controller('groupDetailsCtrl',function($scope,$state,$stateParams,$rootScope,socket,httpFactory){

	console.log('stateParams-----------',$stateParams);
	$scope.usersInCurrentGroup = [];
	if($stateParams && $stateParams.myparams){
		$scope.currentGroup = $stateParams.myparams;
	}

	$scope.usersToBeAdded = $rootScope.allUsers;

	$scope.addInGroup = function(user){
		$scope.usersInCurrentGroup.push(user);
		console.log('$scope.usersInCurrentGroup--------',$scope.usersInCurrentGroup);

	}
	socket.emit('sendUserInGroup',$scope.usersInCurrentGroup)

	// console.log($scope.usersInCurrentGroup);


});