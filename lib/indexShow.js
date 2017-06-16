var sd=require('silly-datetime');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://ccfmeeting:ccfmeeting@localhost:27017/CCFmeeting";

function indexShow(callback) {
	MongoClient.connect(url,function (err,db) {
	db.collection('meetingList',function (err,collection) {
		if(err) throw err;
		else{
			collection.find({'date':{'$gte':sd.format(new Date(),'YYYY-MM-DD')}}).sort({'roomId':1,'date':1,'startTime':1}).toArray(function (err,docs) {
					if(err) throw err;
					else{
						db.close();
						
						return callback(docs);
						}

				})
			}
		})
	});
}
exports.indexShow=indexShow;