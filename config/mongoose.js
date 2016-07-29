var	mongoose = require('mongoose');
mongoose.set('debug',false);
module.exports = function() {
	var db = mongoose.connect('mongodb://127.0.0.1:27017/socketChat');

	require('../server/models/chat.server.model');
	require('../server/models/group.server.model');
	require('../server/models/groupUser.server.model');
	require('../server/models/user.server.model');

	return db;
};
