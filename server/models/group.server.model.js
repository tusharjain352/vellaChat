var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var groupSchema = new Schema({
    groupname:String,
    imgUrl:String,
    createdBy:{ type: Schema.Types.ObjectId, ref: 'User' },
    firstCreatedBy:{ type: Schema.Types.ObjectId, ref: 'User' },
    phoneNumber:String,
    createdDate:Date,
    modifiedDate:Date,
    // users:[{
    // 	userid:String,
	   //  phoneNumber:String, 
	   //  role:Number, //'admin,subadmin'
	   //  addedDate:Date,
	   //  addedBy:Date
    // }]
},{strict:false});


mongoose.model('group', groupSchema);