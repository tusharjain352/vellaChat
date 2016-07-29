chatApp.controller('homeCtrl',function($scope,$state,socket,$rootScope,httpFactory){

    $scope.logindata = {};

    socket.on('gethistory',function(data){
        console.log('ALL history of chats',data);
        $rootScope.historyOfChat = data;

    });

    $scope.signup = function(){
        $state.go('signup');;
    };

    $scope.login = function(){
        httpFactory.loginUser($scope.logindata,function(err,result){
            if(!err){
                // console.log("registered ---",result);
                $rootScope.userLoggedIn = $scope.logindata.email;
                // console.log('CUREBT SENDER',result.data.result[0]);
                $rootScope.currentSenderUser = result.data.result[0];
                var uid= result.data.result[0]._id;
                $rootScope.currentUserID = uid;
               
                socket.emit('getOfflineData',uid);
                socket.emit('createOnline',uid);
                socket.on('allusers',function(postdata){
                    //console.log("online usres -",postdata);
                // console.log('POSTDATATATA-------',postdata);
                // var index;
                for(var i =0;i<postdata.length;i++){
                    
                    if(postdata[i]["_id"] == uid){
                         postdata.splice(i,1);
                    }else{
                       postdata[i]['count'] = 0; 
                       console.log('___________',postdata)
                    }
                   
                }
                    $rootScope.allUsers = postdata;
                    $state.go('chat');
                }) 
            }else{
                alert(err.data.error);
                $scope.logindata = {};
            }
        })
    }

})
