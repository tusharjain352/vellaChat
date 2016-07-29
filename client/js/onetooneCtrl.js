chatApp.controller('oneToOneCtrl',function($scope,$state,$stateParams,$rootScope,socket,httpFactory){

console.log("oneToOneCtrl load----")
    console.log('------',$stateParams.myparams);
    $scope.data = {};
    $scope.chatHistory = [];
    $scope.historyOfChat = [];
    console.log('HISTORY----------',$scope.historyOfChat);
    if($stateParams && $stateParams.myparams){
        $scope.data.reciever = $stateParams.myparams.reciever._id;
        $scope.data.sender = $stateParams.myparams.sender._id;
        $scope.data.recieverEmail = $stateParams.myparams.email;
    }
    $scope.data.date = new Date();

    // console.log('chatHistoryDetails-------------',$rootScope.chatHistoryDetails);
    // $scope.data.chatHistoryDetails = $rootScope.chatHistoryDetails;
    $scope.userLoggedIn = $rootScope.userLoggedIn;

    var oneToOne = {
        "sender" : $scope.data.sender,
        "reciever" : $scope.data.reciever
    }
    socket.emit('chatHistory',oneToOne);

    socket.on('messageEvent1',function(data){

        console.log('messageEvent1-----',data)
        $scope.chatHistory.push(data);
    })

    socket.on('recievingChat',function(chatdata){
        console.log('cHATDDDDDD---------',chatdata);
        $scope.historyOfChat.push(chatdata);
    })

    $scope.sendMessage = function(){
        console.log('oneToOne send message--------');
        
       var oneToOneChat = {
            "sender" : $scope.data.sender,
            "reciever" : $scope.data.reciever,
            "message" : $scope.data.message,
            "type" : "oneToOne"
         }
        socket.emit('sendMessage',oneToOneChat);
        $scope.data.message = "";
    }

});