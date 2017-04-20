var express=require('express');
var router=express.Router();
var sd=require('silly-datetime');
var bodyParser=require('body-parser');
var mail=require('./sendMail');

var mailList=[
	'info2@ccf.org.cn',
	'jyang@ccf.org.cn'
];
var nameList={
	'info2@ccf.org.cn':'白羽',
	'jyang@ccf.org.cn':'杨婧'
}

router.use(bodyParser.urlencoded({ extended:true }));
router.use(bodyParser.json());

router.get('/',function (req,res,next) {
	res.render('book');
	
});

router.post('/',function (req,res) {
	console.log(req.body.opCode);
	console.log(req.body.roomNum);
	console.log(req.body.meetingName);
	console.log(req.body.startTime);
	console.log(req.body.endTime);
	console.log(req.body.bookName);
	console.log(req.body.bookDetail);
})

router.post('/:mail',function (req,res) {
	console.log(req.body.bookEmail);
	 
	if (mailList.indexOf(req.body.bookEmail)!==-1) {
		//mail.sendMail(req.body.bookEmail);
		var mailPromise=new Promise(function (resolve,reject) {
			mail.sendMail(req.body.bookEmail);
			//res.send('{result:1}');
			resolve('{result:1}');
		});
		mailPromise.then(function (msg) {
			res.send(msg);
		}).catch(function (reason) {
			console.log(reason);
			res.send('{result:2}');
		});
	}else{
		res.send('{result:-1}');
	}
})


module.exports=router;