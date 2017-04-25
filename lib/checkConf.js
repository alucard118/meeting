var mongo=require('mongodb');
var host="localhost";
var port="27017";


function checkConf(roomId,date,callback) {
	console.log(roomId,date);
	date=date.split(' ')[0];
	var db=new mongo.Db('CCFmeeting',new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
	db.open(function (err,db) {
		db.collection('meetingList',function (err,collection) {
			if(err) throw err;
			else{
				collection.find({'roomId':roomId,'date':date}).sort({'startTime':1}).toArray(function (err,docs) {
				
					if (err) throw err;
					else{

						callback(docs);
						
					}
				});
				
			}
		})
	})
}
exports.checkConf=checkConf;