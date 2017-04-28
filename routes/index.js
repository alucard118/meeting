var express=require('express');
var router=express.Router();
var sd=require('silly-datetime');
var delconf=require('../lib/delConf')
var getCode=require('./code');
var async=require('async');
var date=new Date();
var today=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();


//console.log(sd.format(new Date(),'YYYY-MM-DD'));


var mongo=require('mongodb');
var host="localhost";
var port="27017";

//显示会议页面
router.get('/',function (req,res) {
	var db=new mongo.Db('CCFmeeting',new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
	db.open(function (err,db) {
	db.collection('meetingList',function (err,collection) {
		if(err) throw err;
		else{
			collection.find({'date':{'$gte':sd.format(new Date(),'YYYY-MM-DD')}}).sort({'roomId':1,'date':1,'startTime':1}).toArray(function (err,docs) {
				if(err) throw err;
				else{
					res.render('index',{confList:docs});
					db.close();
				}
			})
		}
	})
});
	
});

//删除会议
router.post('/id',function (req,res) {
	async.waterfall([function (callback) {
		getCode.birthCode(function (res) {
			callback(null,res);
		});
	},function (code,callback) {
		if(req.body.opCode==code){
		var delPromise=new Promise(function (resolve,reject) {
			delconf.delConf(req.body.id.replace('#',''),function (res) {
				callback(null,res);
			});
			resolve('1');
		});
		delPromise.then(function (msg) {
			res.send(msg);
		}).catch(function (reason) {
			console.log(reason);
			res.send('2');
		});

	}
	else{
		res.send('-1');
	}
	}],function (err,results) {
		console.log(results);
	});
	
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