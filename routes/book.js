var express=require('express');
var router=express.Router();
var sd=require('silly-datetime');
var bodyParser=require('body-parser');
var mail=require('./sendMail');
var async=require('async');
var checkConf=require('../lib/checkConf');
var bookConf=require('../lib/bookConf');
var getCode=require('./code');

var mailList=[
	'info2@ccf.org.cn',
	'jyang@ccf.org.cn',
	'info@ccf.org.cn',
	'ybai@ccf.org.cn',
	'hlfeng@ccf.org.cn'
];
var nameList={
	'info2@ccf.org.cn':'白羽',
	'jyang@ccf.org.cn':'杨婧',
	'info@ccf.org.cn':'张建泉',
	'ybai@ccf.org.cn':'白羽',
	'hlfeng@ccf.org.cn':'冯惠丽'
}

router.use(bodyParser.urlencoded({ extended:true }));
router.use(bodyParser.json());

router.get('/',function (req,res,next) {
	res.render('book');
	
});

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

router.post('/',function (req,res) {
	var confDate=req.body.startTime.split(' ')[0];
	var startTime=req.body.startTime.split(' ')[1];
	var endTime=req.body.endTime.split(' ')[1];
	var date=new Date();
	date=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
	async.waterfall([function (callback) {
		getCode.birthCode(function (res) {
			callback(null,res);
		});
	},function (res,callback) {
		if(req.body.opCode==res){
			bookConf.bookConf(confDate,startTime,endTime,req.body.meetingName,req.body.bookName,date,req.body.roomNum,req.body.bookDetail);
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
	 
	if (mailList.indexOf(req.body.bookEmail)!==-1) {
		//mail.sendMail(req.body.bookEmail);
		var mailPromise=new Promise(function (resolve,reject) {
			mail.sendMail(req.body.bookEmail);
			//res.send('{result:1}');
			resolve(nameList[req.body.bookEmail]);
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