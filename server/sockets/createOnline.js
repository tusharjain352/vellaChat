var User = require('mongoose').model('User');
var mongoose = require('mongoose');
var async = require('async');
exports.getOnline = function(user,onlineUsers,socket,io,rClient){
  // console.log("redis---------",rClient);
		
	if(user){
	  	var obj = {};
	  	obj[user] = socket.id;
	  	rClient.hmset("users",obj);
	}	

  	rClient.hgetall("users",function(err,data){
      // console.log('rClient-------data',data);
      if(err){
        console.log('err------',err);
      }
  		//console.log("all users --data",data);
  		var users = [];
  		var a =0;
  		for(key in data){
  			a++;
  			getUsers(key,function(err,result){
  				if(!err){
            // console.log('getUsers-------result----------',result);
            //result[0].user = socket.id;
            //console.log('result[]------',result[0]);
            var resultUsed  = {};
            resultUsed = JSON.parse(JSON.stringify(result[0]));
            // resultUsed.user = socket.id;
            resultUsed[user] = socket.id;
            // console.log('type----------',typeof(resultUsed));
            // console.log('user-----',user);
            // console.log('socketid----',socket.id);
            // console.log('resultUsed------',resultUsed);
  					users.push(resultUsed);
  					if(a == Object.keys(data).length){
  						// console.log("recived--",result);
              // console.log('ALLUSERS----------',users);
  						io.sockets.emit('allusers',users);
  					}
  				}
  			})
  		}
  	})

  	var getUsers = function(data,callback){
  		var id = mongoose.Types.ObjectId(data);
      // console.log('getUsers-------ID',id);
  		User.find({"_id":id}).exec(function(err,result){
  			if(!err){
  				callback(null,result);
  			}else{
  				callback(err,null)
  			}
  		})
  	}
}