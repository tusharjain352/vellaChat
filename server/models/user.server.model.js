var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    notification:String,
    birthDate: Date,
    createdDate:Date,
    gender: String,
    image: String,
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    mobile: String,
    zipCode: String,
    password: String,
    status: Number,
    modifiedDate: Date,
    address:String,
    location : [],
    count:Number,
    lastSeen:Date,
    statusChat:Number,

});


UserSchema.index({ location: '2dsphere' });
mongoose.model('User', UserSchema);