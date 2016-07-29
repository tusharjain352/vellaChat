exports.logout = function(user,onlineUsers,socket,io,rClient){
	console.log("logout user");
	rClient.hdel("users",user,function(err,data){
		if(err)
			throw err;
		
	});
}