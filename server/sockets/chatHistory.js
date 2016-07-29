var Chat = require('mongoose').model('chat');
var User = require('mongoose').model('User');
var ObjectId = require('mongoose').Types.ObjectId;
exports.getChatHistory = function(data,socket){
	console.log('getChatHistory',data);
	var sender = data.sender;
	var reciever = data.reciever;
	var chatData = [];

	// console.log('chatHistory event-----------',getChatHistorydata);
	Chat.find({$or:[{"senderid":sender,"recieverid":reciever},{"recieverid":sender,"senderid":reciever}]})
		.populate('senderid').populate('recieverid').exec(function(err,data){
			if(!err){
				// console.log('------000',data);
				data = JSON.parse(JSON.stringify(data));
				chatData = data;
				socket.emit('recievingChat',chatData);
			}
		})
		/*if(!err){
			data = JSON.parse(JSON.stringify(data));
			console.log('chatHistory event-----------',data)
			chatData = data;
			socket.emit('recievingChat',chatData);
			// console.log('recievingChatdata------------',data);
			// chatData['senderid'] = 
			// User.find()

		}*/	
}