var express=require('express');
var router=express.Router();
var sd=require('silly-datetime');
var mail=require('./sendMail');
var async=require('async');
var dbController=require('../models/dbController.js');
var getCode=require('./code');
var address=require('./address.js');


router.get('/',function (req,res,next) {
	res.render('book');
	
});

router.post('/check',function (req,res) {
		
		var checkPromise=new Promise(function (resolve,reject) {
			dbController.checkMeeting(req.body.roomNum,req.body.startTime,function (data) {
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

router.post('/',function (req,res) {
	var confDate=req.body.startTime.split(' ')[0];
	var startTime=req.body.startTime.split(' ')[1];
	var endTime=req.body.endTime.split(' ')[1];
	var date=new Date();
	date=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();
	async.waterfall([function (callback) {
		getCode.birthCode(function (res) {
			callback(null,res);
		});
	},function (res,callback) {
		if(req.body.opCode==res){
			dbController.bookMeeting(confDate,startTime,endTime,req.body.meetingName,req.body.bookName,date,req.body.roomNum,req.body.bookDetail);
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