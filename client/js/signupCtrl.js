chatApp.controller('signupCtrl',function($scope,$state,$stateParams,$rootScope,socket,httpFactory){
	$scope.data = {};


	$scope.signup = function(){
        httpFactory.registerUser($scope.data,function(err,result){
            if(!err){
                /*console.log("registered ---",result.data.result);
                var uid= result.data.result._id;
                console.log('signup------id',uid);
                $rootScope.currentUserID = uid;
                socket.emit('createOnline',uid);
                socket.on('allusers',function(postdata){
                    console.log('POSTDATATATA-------',postdata);
                    $rootScope.users = postdata;
                    $state.go('chat');
                }) */
                alert("User Registered Sucessfully.Please Login to proceed further");
                $state.go('home');
            }
        })
    }
})
