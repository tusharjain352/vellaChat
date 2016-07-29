var ObjectId = require('mongoose').Types.ObjectId; 
var User = require('mongoose').model('User');
var Chat = require('mongoose').model('chat');
exports.oneChat = function(chatData,rClient,io,socket){
	var sender = chatData.sender;
	var reciever = chatData.reciever;
	var message = chatData.message;

	rClient.hmget("users",[sender,reciever],function(err,data){
		if(err) throw err;
		
		var senderId = data[0];
		var recieverId = data[1];
		// console.log(senderId+" 000000");
		// console.log(recieverId+"  11111111");
		/*var obj= {
		  "sender":sender,
		  "reciever":reciever,
		  "message":chatData.message,
		  "date":new Date()
		}*/


		var chatDetails = {
			"senderid":sender,
			"recieverid":reciever,
			"chatType":"oneToOne",
			"messageChat":message,
			"status":0,
			"createdDate":new Date()
		}

		var chatSave = new Chat(chatDetails);
		chatSave.save(function(err,chatData){
			if(!err){
				console.log(chatData);
				if(io.sockets.connected[senderId] && io.sockets.connected[recieverId]){
				// console.log('-------------',obj)
				User.find({"_id":new ObjectId(sender)},function(err,user){
					if(err){
						console.log(err);
					}
					else{
						var userData = user[0];
						// console.log('userData----------',userData);
						// console.log('--------**********',user[0]);
						var email = user[0].email;
						// console.log('email--------',email);
						chatDetails["user"] = userData;
						// console.log('obj----------',chatDetails);
						socket.emit('messageEvent1',chatDetails);
						
			  			io.to(recieverId).emit('messageEvent1',chatDetails);
			  			
					}
			})
	  	/*socket.emit('messageEvent1',obj);
	  	io.to(recieverId).emit('messageEvent1',obj);*/
		}
			}
			else
			{
				console.log(err);
			}
		})

		// var chatDetails = new 

			
		/*if(io.sockets.connected[senderId] && io.sockets.connected[recieverId]){
			// console.log('-------------',obj)
			User.find({"_id":new ObjectId(sender)},function(err,data){
				if(err)
					console.log(err);
				var userData = data[0];
				console.log('userData----------',userData);
				console.log('--------**********',data[0]);
				var email = data[0].email;
				console.log('email--------',email);
				obj["user"] = userData;
				console.log('obj----------',obj);
				socket.emit('messageEvent1',obj);
	  			io.to(recieverId).emit('messageEvent1',obj);
			})*/

	  	/*socket.emit('messageEvent1',obj);
	  	io.to(recieverId).emit('messageEvent1',obj);*/
		//}
	});
}