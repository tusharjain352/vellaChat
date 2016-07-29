chatApp.controller('chatCtrl',function($scope,$state,$stateParams,$rootScope,socket,httpFactory,$parse){

    $scope.data = {};
    var onlineUsers = [];
    $rootScope.notifyUser = [];
    /*if($rootScope && $rootScope.allUsers){
        $scope.users = $rootScope.allUsers;
        onlineUsers = $scope.users;
        console.log('------------')
    }*/
    // console.log('chatCtrl-----',$scope.users);
    //$scope.onlineUsers = $rootScope.allUsers;

    $rootScope.$watch('allUsers',function(newlVal,oldVal){
        // console.log("newlVal",newlVal);
        // console.log("oldVal---",oldVal);
        onlineUsers = newlVal;
    })

    $scope.chatHistory = [];
    $scope.userLoggedIn = $rootScope.userLoggedIn;
    // console.log('$scope.userLoggedIn-----------',$scope.userLoggedIn);
    
    socket.on('messageEvent1',function(data){
        //console.log('CHATCTRL messageecnt',data);
         $scope.data['className'] = 'tomato';
         
         //console.log('onlineUsers-----',onlineUsers);

         for(i=0;i<onlineUsers.length;i++){
            if(data.senderid == onlineUsers[i]._id){

                $scope.data.matchId = data.senderid;
                $rootScope.notifyUser.push(data.senderid);

                $scope.data[data.senderid] = data.messageChat;
                /*var the_string = data.senderid.toString();

                // Get the model
                var model = $parse(the_string);

                // Assigns a value to it
                model.assign($scope, data.messageChat);*/
                console.log('notifyUser---------',$rootScope.notifyUser)

            }
         }

    })
    $scope.data['className'] = 'sky';

    $scope.changeUser = function(user){
        
        $scope.data.reciever = user._id;

        
        var oneToOne = {
            "sender" : $rootScope.currentUserID,
            "reciever" : $scope.data.reciever,
            "email": user.email
        }

        var oneToOneChat = {
            "sender" : $rootScope.currentSenderUser,
            "reciever" : user,
            "email" : user.email
        }

        console.log('notifyUser.splice()',user['_id']);
        var ind = $rootScope.notifyUser.indexOf(user['_id']);
        $rootScope.notifyUser.splice(ind,1);
        $scope.data[user._id] = "";

        $state.go('chat.onToOne',{ myparams:oneToOneChat });
    }

    $scope.sendMessage = function(){
        
        var eventData = {

            "sender":$rootScope.currentUserID,
            "reciever":$scope.data.reciever,
            "message":$scope.data.message
        } 
        // console.log(eventData);
        /*socket.emit('sendMessage',eventData);
        $scope.data.message ="";*/

    }

    $scope.logout = function(){
        socket.emit('logout',$rootScope.currentUserID);
        $state.go('home');
    }

    $scope.group = function(){
        
        $state.go('group');
       /* console.log($scope.data.groupName);
        console.log('group----',$scope.data);*/
        /*httpFactory.createGroup($scope.data,function(err,result){
            if(!err){
                /*console.log("groups ---",result);
                console.log("groupresultdata",result.data.result._id);*/
                /*
                state.govar gid = result.data.result._id;
                socket.emit('createGroup',gid);

                var uid= result.data.result[0]._id;
                $rootScope.currentUserID = uid;
                socket.emit('createOnline',uid);
                socket.on('allusers',function(postdata){
                    $rootScope.groups = postdata;
                    $state.go('chat');
                }) 
            }
        })*/
    }
})