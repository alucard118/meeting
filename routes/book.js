var express=require('express');
var router=express.Router();
var sd=require('silly-datetime');





router.get('/',function (req,res,next) {
	res.render('book');
	
});


module.exports=router;