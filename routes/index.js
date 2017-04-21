var express=require('express');
var router=express.Router();
var sd=require('silly-datetime');
var delconf=require('../lib/delConf')
var getCode=require('./code');
var date=new Date();
var today=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
var code=getCode.birthCode(today);

//console.log(sd.format(new Date(),'YYYY-MM-DD'));


var mongo=require('mongodb');
var host="localhost";
var port="27017";

var db=new mongo.Db('CCFmeeting',new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});

var results=new Array();

	db.open(function (err,db) {
	db.collection('meetingList',function (err,collection) {
		if(err) throw err;
		else{
			collection.find({'date':{'$gte':sd.format(new Date(),'YYYY-MM-DD')}}).sort({'roomId':1,'date':1,'startTime':1}).toArray(function (err,docs) {
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

router.post('/:id',function (req,res) {
	if(req.body.opCode==code){
		var delPromise=new Promise(function (resolve,reject) {
			delconf.delConf(req.body.id);
			resove('1');
		});
		delPromise.then(function (msg) {
			res.send(msg);
		}).catch(function (reason) {
			console.log(resson);
			res.send('2');
		});

	}
	else{
		res.send('-1');
	}
})

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