var express=require('express');
var router=express.Router();
var sd=require('silly-datetime');
var bodyParser=require('body-parser');
var mail=require('./sendMail');
var async=require('async');
var checkConf=require('../lib/checkConf');
var updateConf=require('../lib/updateConf');
var getCode=require('./code');
var address=require('./address.js');



router.use(bodyParser.urlencoded({ extended:true }));
router.use(bodyParser.json());

var mongo=require('mongodb');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://ccfmeeting:ccfmeeting@localhost:27017/CCFmeeting";
var ObjectId=mongo.ObjectID;

router.get('/:id',function (req,res,next) {
	var id=req.params.id.split('#')[0];
	MongoClient.connect(url,function (err,db) {
	db.collection('meetingList',function (err,collection) {
		if(err) throw err;
		else{
			collection.find({'_id':ObjectId(req.params.id.replace(':',''))}).toArray(function (err,docs) {
				if(err) throw err;
				else{
					console.log(docs);
					res.render('update',{confList:docs});
					db.close();
					MongoClient.close();
				}
			})
		}
	})
});
	
});


router.post('/',function (req,res) {
	var confDate=req.body.startTime.split(' ')[0];
	var startTime=req.body.startTime.split(' ')[1];
	var endTime=req.body.endTime.split(' ')[1];
	var date=new Date();
	date=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();
	console.log(date);
	async.waterfall([function (callback) {
		getCode.birthCode(function (res) {
			callback(null,res);
		});
	},function (res,callback) {
		if(req.body.opCode==res){
			updateConf.updateConf(req.body.id,confDate,startTime,endTime,req.body.meetingName,req.body.bookName,date,req.body.roomNum,req.body.bookDetail);
			callback(null,'true');
		}
		else
			callback(null,'false');
	}],function (err,result) {
		if(result=='true'){
			res.send('1');
		}
		else{
			res.send('-1');
		}
	});
})
router.post('/check',function (req,res) {
		
		var checkPromise=new Promise(function (resolve,reject) {
			checkConf.checkConf(req.body.roomNum,req.body.startTime,function (data) {
				resolve(data);
			});
			
		});
		checkPromise.then(function (msg) {
			res.send(msg);
		}).catch(function (reason) {
			console.log(reason);
			res.send('2');
		})
	

})
router.post('/:mail',function (req,res) {
	console.log(req.body.bookEmail);
	 
	if (address.nameList()[req.body.bookEmail]!==undefined) {
		//mail.sendMail(req.body.bookEmail);
		var mailPromise=new Promise(function (resolve,reject) {
			mail.sendMail(req.body.bookEmail);
			//res.send('{result:1}');
			resolve(address.nameList()[req.body.bookEmail]);
		});
		mailPromise.then(function (msg) {
			res.send(msg);
		}).catch(function (reason) {
			console.log(reason);
			res.send('2');
		});
	}else{
		res.send('-1');
	}
})


module.exports=router;