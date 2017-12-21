var express=require('express');
var router=express.Router();
var fs=require('fs');
var fsExists=require('../lib/fsExist.js');
var dbController=require('../models/dbController.js');
var util=require('util');


//创建指定目录
router.get('/',function (req,res) {
	if(req.session.role=='superAdmin'){
		
		res.render('admin',{user:req.session.user});

	}
	else {
		res.redirect('/noprevelige');
	}
	
})



router.get('/home',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_home',{user:req.session.user});
	}
	else{
		res.redirect('/noprevelige');
	}
	
});



router.get('/logout',function (req,res) {
	req.session.destroy(function (err) {
		res.redirect('/login');
	})
	
})


module.exports=router;