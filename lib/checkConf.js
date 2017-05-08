var MongoClient=require('mongodb').MongoClient;
var url="mongodb://ccfmeeting:ccfmeeting@localhost:27017/CCFmeeting";

function checkConf(roomId,date,callback) {
	//console.log(roomId,date);
	date=date.split(' ')[0];
	MongoClient.connect(url,function (err,db) {
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