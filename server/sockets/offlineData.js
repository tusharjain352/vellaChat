var Chat = require('mongoose').model('chat');
var ObjectId = require('mongoose').Types.ObjectId;
var check = {};
exports.getUserData = function(offlineData,socket){
	console.log('OFFFLINE---------',offlineData);
	Chat.find({$or:[{"senderid":new ObjectId(offlineData)},{"recieverid":new ObjectId(offlineData)}]},function(err,data){
		if(!err){
			// console.log('CHATHISTORY-----------',data);
			data = JSON.parse(JSON.stringify(data));
			check['chathistory'] = data;
			// console.log('CHECK----------',check);
			socket.emit('gethistory',check);

		}

	})

}