var mongo=require('mongodb');
var host="localhost";
var port="27017";
var ObjectId=mongo.ObjectID;


function bookConf(date,startTime,endTime,confName,userName,bookTime,roomId,remark) {

	var db=new mongo.Db('CCFmeeting',new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
	db.open(function (err,db) {
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