var express=require('express');
var router=express.Router();
var sd=require('silly-datetime');

console.log(sd.format(new Date(),'YYYY-MM-DD'));


var mongo=require('mongodb');
var host="localhost";
var port="27017";

var db=new mongo.Db('CCFmeeting',new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});

var results=new Array();

	db.open(function (err,db) {
	db.collection('meetingList',function (err,collection) {
		if(err) throw err;
		else{
			collection.find({'date':{'$gte':sd.format(new Date(),'YYYY-MM-DD')}}).toArray(function (err,docs) {
				if(err) throw err;
				else{
					results=results.concat(docs);
					console.log(results);
					db.close();
				}
			})
		}
	})
});


router.get('/',function (req,res,next) {
	res.render('index',{confList:results});
});

// router.get('/delete/:name', function(req, res) {
// 	console.log(req.params.name);
// 	var id=req.params.name;
// 	id=id.replace(':','');
//    db.open(function (err,db) {
//    		db.collection('meetingList',function (err,collection) {
//    			if(err) throw err;
//    			else{
//    				collection.remove({'id':id},function (err,result) {
//    					if(err) throw err;
//    					else{
//    						console.log('删除数据'+id);
//    						db.close();
//    					}
//    				})
//    			}
//    		})
//    })
// });


module.exports=router;