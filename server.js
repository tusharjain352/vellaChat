var mongoose = require('./config/mongoose'),
	express = require('./config/express'),


	db = mongoose(),
	http = express();


http.listen(9000, function(){
  console.log('listening on *:9000');
});
 /*var mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	db = mongoose(),
	http = express(),
	cluster = require("cluster"),
  	numCPUs = require("os").cpus().length;


  	if(cluster.isMaster){
  		var i =0;
  		while(i<numCPUs){
  			cluster.fork();
  			i++;
  			cluster.on('fork',function(worker){
  				console.log('forked worker ' + worker.process.pid); 
  			})
  			cluster.on('listening',function(worker,address){
  				console.log("worker " + worker.process.pid + " is now connected to " + address.address + ":" + address.port); 
  			})
  			cluster.on('exit',function(worker, code, signal){
  				console.log("worker " + worker.process.pid + " died"); 
  			})
  		}
  	}else{
  		http.listen(9000, function(){
		  console.log('listening on *:9000');
		});
  	}*/