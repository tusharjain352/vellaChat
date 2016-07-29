var oneToOneChat = require('./oneToOneChat');
exports.sendMessage = function(chatData,onlineUsers,socket,io,rClient){
	/*console.log('sendMessage----------',chatData);
	
	var sender = chatData.sender;
	var reciever = chatData.reciever;
	
	var obj= {
	  "name":chatData.sender,
	  "message":chatData.message,
	  "date":new Date()
	}
	rClient.hmget("users",[sender,reciever],function(err,data){
		if(err) throw err;
		
		var senderId = data[0];
		var recieverId = data[1];
		console.log(senderId+" 000000");
		console.log(recieverId+"  11111111")*/
		/*senderId = senderId.substring(2);
		recieverId = recieverId.substring(2);*/
		/*if(io.sockets.connected[senderId] && io.sockets.connected[recieverId]){
			console.log('-------------',obj)
	  	socket.emit('messageEvent',obj);
	  	io.to(recieverId).emit('messageEvent',obj);
		}
	});*/

	// console.log('sendMessage----------',chatData);
	if(chatData['type']=='oneToOne'){
		oneToOneChat.oneChat(chatData,rClient,io,socket);
	}

		 
}