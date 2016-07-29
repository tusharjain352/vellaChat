chatApp.factory("httpFactory" , function ($http){

	var serverUrl = "http://localhost:9000/api/"
	return {
		registerUser:function(userObj,callback){
			var req = {
				method: 'POST',
				url: serverUrl +"SignUp",
				headers: {
				'Content-Type': 'application/json'
				},
				data: userObj
			}

			$http(req).then(function(success){
				callback(null,success);
			},function(err){
				callback(err,null);
			});
		},
		loginUser:function(userObj,callback){
			console.log('loginuser',userObj);
			var req = {
				method: 'POST',
				url: serverUrl +"login",
				headers: {
				'Content-Type': 'application/json'
				},
				data: userObj
			}

			$http(req).then(function(success){
				callback(null,success);
			},function(err){
				callback(err,null);
			});
		},
		/*createGroup:function(userObj,callback){
			console.log('hiiiiiii',userObj);
			var req = {
				method: 'POST',
				url: serverUrl+"createGroup",
				headers: {
					'Content-Type': 'application/json'
				},
				data: userObj
			}

			$http(req).then(function(success){
				callback(null,success);
			},function(err){
				callback(err,null);
			});
		}*/
	}	

})