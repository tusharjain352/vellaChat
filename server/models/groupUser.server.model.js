var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var groupUserSchema = new Schema({
    groupid:{ type: Schema.Types.ObjectId, ref: 'group' },
    userid:{ type: Schema.Types.ObjectId, ref: 'User' },
    phoneNumber:String, 
    role:String, //'admin,subadmin'
    addedDate:Date,
    addedBy:{ type: Schema.Types.ObjectId, ref: 'User' }
    
},{strict:false});


mongoose.model('groupUser', groupUserSchema);