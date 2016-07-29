var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var chatSchema = new Schema({
    senderid:{ type: Schema.Types.ObjectId, ref: 'User' },
    recieverid:{ type: Schema.Types.ObjectId, ref: 'User' },
    chatType:String,
    groupid:{ type: Schema.Types.ObjectId, ref: 'group' },
    messageChat:String,
    phoneNumber:String,
    mediaUrl:String,
    mediaThumb:String,
    type:String,
    status:String,
    localmsgid:String,
    createdDate:Date,
    modifiedDate:Date
},{strict:false});


mongoose.model('chat', chatSchema);