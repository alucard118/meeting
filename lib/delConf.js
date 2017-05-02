var mongo=require('mongodb');
var host="localhost";
var port="27017";
var ObjectId=mongo.ObjectID;


function delConf(id,callback) {

	var db=new mongo.Db('CCFmeeting',new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
	db.open(function (err,db) {
		db.collection('meetingList',function (err,collection) {
			if(err) throw err;
			else{
				collection.find({'_id':ObjectId(id)}).toArray(function (err,docs) {
					// body...
				
					if (err) throw err;
					else{

						//console.log(docs);
						if(docs.length!=0){
							collection.remove({'_id':ObjectId(id)},function (err,result) {
							if(err) throw err;
							else{
								console.log('成功删除数据:'+result);
								db.close();
							}
							
							})
						}
						else
							{callback(docs);
								db.close();
							}
					}
				});
				
			}
		})
	})
}
exports.delConf=delConf;