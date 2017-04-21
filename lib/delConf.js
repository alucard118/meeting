var mongo=require('mongodb');
var host="localhost";
var port="27017";


function delConf(id) {
	var db=new mongo.Db('CCFmeeting',new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
	db.open(function (err,db) {
		db.collection('meetingList',function (err,collection) {
			if(err) throw err;
			else{
				collection.remove({id:id},function (err,result) {
					if(err) throw err;
					else{
						console.log('成功删除 %d 数据',result);
						db.close();
					}
				})
			}
		})
	})
}
exports.delConf=delConf;