var express=require('express');
var router=express.Router();
var delconf=require('../lib/delConf')
var indexShow=require('../lib/indexShow');
var getCode=require('./code');
var async=require('async');
var date=new Date();
var today=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();


//console.log(sd.format(new Date(),'YYYY-MM-DD'));


//显示会议页面
router.get('/',function (req,res) {
	indexShow.indexShow(function (docs) {
		res.render('index',{confList:docs});
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



module.exports=router;