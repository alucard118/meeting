var MongoClient=require('mongodb').MongoClient;
var url="mongodb://ccfmeeting:ccfmeeting@localhost:27017/CCFmeeting";
var mongo=require('mongodb');
var ObjectId=mongo.ObjectID;


function bookConf(date,startTime,endTime,confName,userName,bookTime,roomId,remark) {

	MongoClient.connect(url,function (err,db) {
		db.collection('meetingList',function (err,collection) {
			if(err) throw err;
			else{
				collection.insert({'date':date,'startTime':startTime,'endTime':endTime,'confName':confName,'userName':userName,'bookTime':bookTime,'roomId':roomId,'remark':remark}),function (err,docs) {
						if (err) throw err;
						else{
							console.log('成功创建会议：'+docs);
							db.close();
						}
				
					}
				
			}
		})
	})
}
exports.bookConf=bookConf;