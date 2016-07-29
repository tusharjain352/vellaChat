var User = require('mongoose').model('User');
var async = require("async");
var Group = require('mongoose').model('group');

exports.signup = function(req,res,next){
	// console.log("req data--",req.body);
	if(!req.body || req.body == undefined || req.body == ''){
		/*res.json({"error":1,"errorMsg":"Parameters Missing"});
        return true;*/
        res.status(500);
  		res.render('error', { error: err });
	}
	var userData = {
		'firstName':req.body.firstName,
		'lastName':req.body.lastName,
		'birthDate':req.body.dob,
		'gender':req.body.gender,
		'email':req.body.email,
		'mobile':req.body.mobile,
		'zipCode':req.body.postcode,
		'password':req.body.password,
		'modifiedDate':new Date(),
		'address':req.body.address,
		'status':1
	};

	var UserSave = new User(userData);
	User.find({'email':req.body.email}).exec(function(err,data){
		if(!err){
			if(data & data.length > 0){
				res.json({"error":1,"errorMsg":"User already Exist"});
            	return true;	
			}else{
				UserSave.save(function(err,result){
					if(!err){
						res.json({"error":0,"errorMsg":"Registered success.", "result": result});
			            return true;
					}else{
						res.json({"error":1,"errorMsg":err});
			            return true;
					}
				})
			}
		}else{
			res.json({"error":1,"errorMsg":err});
            return true;
		}
	})
	
	// res.send("success");
}

exports.login = function(req,res,next){
	if(!req.body || req.body == undefined || req.body == ''){
		res.json({"error":1,"errorMsg":"Parameters Missing"});
        return true;
	}

	User.find({'email':req.body.email,'password':req.body.password}).exec(function(err,data){
		if(!err){
			if(data && data.length > 0){
				res.json({"error":0,"errorMsg":"success","result":data});
				return true;
			}else{
				res.status(500).json({"error":"no user found"})
			}
		}else{
			res.json({"error":1,"errorMsg":err});
        	return true;		
		}
	})
}


exports.createGroup = function(req,res,next){
	console.log('reqq----------',req.body);
	if(!req.body || req.body == undefined || req.body == ''){
		res.json({"error":1,"errorMsg":"Parameters Missing"});
        return true;
	}

	var groupDetails = {
		'groupname' : req.body.groupname,
		'imgUrl' : req.body.imgUrl,
		'createdBy' : req.body.createdBy,
		'phoneNumber' : req.body.phoneNumber,
		'createdDate' : new Date()
	}

	var groupCreated = new Group(groupDetails);

	groupCreated.save(function(err,result){
		console.log('result---------',result)
		if(!err){

				res.json({"error":0,"errorMsg":"Registered success.", "result": result});
	            return true;
			}else{
				res.json({"error":1,"errorMsg":err});
	            return true;
			}
	});
}