var onlineUsers = {};
var rooms = [];
var createOnlineEvent = require('./createOnline');
var sendMessageEvent = require('./sendMessage');
var disconnectEvent = require('./disconnect');
var logoutEvent = require('./logout');
var createGroupEvent = require('./createGroup');
var getOfflineDataEvent = require('./offlineData');
var chatHistoryEvent = require('./chatHistory');


exports.getEvents = function(io,rClient){
  io.on('connection', function(socket){
  	//console.log("user connected--");

    socket.on('createOnline',function(user){
      createOnlineEvent.getOnline(user,onlineUsers,socket,io,rClient);
    });

    socket.on('sendMessage',function(chatData){
      sendMessageEvent.sendMessage(chatData,onlineUsers,socket,io,rClient);
    });

    socket.on('disconnect',function(data){
      disconnectEvent.disconnect(data,onlineUsers,socket,io,rClient);
    });

    socket.on('logout',function(data){
      logoutEvent.logout(data,onlineUsers,socket,io,rClient);
    });

   /* socket.on('createGroup',function(groupData){
      createGroupEvent.createGroup(groupData,socket,io,rClient);
    });*/

    socket.on('getOfflineData',function(offlineData){
      getOfflineDataEvent.getUserData(offlineData,socket);
    });

    socket.on('chatHistory',function(chatHistory){
      chatHistoryEvent.getChatHistory(chatHistory,socket);
    });

    socket.on('sendUserInGroup',function(useInCurrentGroup){
      createGroupEvent.createGroup(socket,useInCurrentGroup);
    })

  });
}
