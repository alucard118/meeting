var express=require('express');
var router=express.Router();
var sd=require('silly-datetime');
var bodyParser=require('body-parser');
var mail=require('./sendMail');


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
	mail.sendMail(req.body.bookEmail);

})


module.exports=router;