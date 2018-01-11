var express=require('express');
var router=express.Router();
var fs=require('fs');
var fsExists=require('../lib/fsExist.js');
var dbController=require('../models/dbController.js');
var util=require('util');


//创建指定目录
router.get('/',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.redirect('/admin/staff');

	}
	else {
		res.redirect('/noprevelige');
	}
	
})



router.get('/staff',function (req,res) {
	if(req.session.role=='superAdmin'){
		//console.log(__dirname);
		dbController.selectStaff(1,function (docs) {
			console.log(docs);
			res.render('./admin/admin_ccfStaff.ejs',{user:req.session.user,staff:docs})
		})
		
	}
	else{
		res.redirect('/noprevelige');
	}
	
});

router.get('/room',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_meetingRoom',{user:req.session.user});
	}
	else{
		res.redirect('/noprevelige');
	}
	
});

router.get('/allMeeting',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_allMeeting',{user:req.session.user});
	}
	else{
		res.redirect('/noprevelige');
	}
	
});

router.get('/setOp',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_setOp',{user:req.session.user});
	}
	else{
		res.redirect('/noprevelige');
	}
	
});


router.get('/logout',function (req,res) {
	req.session.destroy(function (err) {
		res.redirect('/login');
	})
	
});


module.exports=router;