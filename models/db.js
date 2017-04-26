var mongo=require('mongodb');

var host="localhost";
var port="27017";

var db=new mongo.Db('CCFmeeting',new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});

function selectList() {
	db.open(function (err,db) {
	db.collection('meetingList',function (err,collection) {
		if(err) throw err;
		else{
			collection.find({}).toArray(function (err,docs) {
				if(err) throw err;
				else{
					return(docs);
					db.close();
				}
			})
		}
	})
});
}


exports.selectList=selectList;