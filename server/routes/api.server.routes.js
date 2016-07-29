var api = require('../controllers/api.server.controller');
module.exports = function(app){
	app.get('/', function(req, res){
	  res.sendFile(__dirname + '/index.html');
	});

	app.route('/api/SignUp')
        .post(api.signup);

    app.route('/api/login')
    	.post(api.login);

    app.route('/api/createGroup')
    	.post(api.createGroup);
}