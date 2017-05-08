var mongo=require('mongodb');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://ccfmeeting:ccfmeeting@localhost:27017/CCFmeeting";
var ObjectId=mongo.ObjectID;


function updateConf(id,date,startTime,endTime,confName,userName,bookTime,roomId,remark) {

	MongoClient.connect(url,function (err,db) {
		db.collection('meetingList',function (err,collection) {
			if(err) throw err;
			else{
				collection.update({'_id':ObjectId(id)},{'date':date,'startTime':startTime,'endTime':endTime,'confName':confName,'userName':userName,'bookTime':bookTime,'roomId':roomId,'remark':remark}),function (err,docs) {
						if (err) throw err;
						else{
							console.log('成功修改会议：'+docs);
							db.close();
						}
				
					}
				
			}
		})
	})
}
exports.updateConf=updateConf;