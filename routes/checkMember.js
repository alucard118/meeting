var express=require('express');
var router=express.Router();
var http=require('http');
var querystring=require('querystring');

router.get('/',function (req,res) {
	res.render('checkMember');
})

router.post('/',function (req,resd) {

	var postdata={xmlString:'<xml><key>CNCC2016</key><name>'+req.body.name+'</name><cardNum>'+req.body.id+'</cardNum></xml>'};
	//console.log(postdata);
	data=querystring.stringify(postdata);
	var opt={
		method:'post',
		host:'web.ccf.org.cn',
		port:'80',
		path:'/CCF/queryData.action',
		headers:{"Content-Type": 'application/x-www-form-urlencoded',  
            "Content-Length": data.length }
	};
	var body='';
	var req=http.request(opt,function (res) {
		console.log(res.statusCode);
		res.on('data',function(data){body+=data;}).on('end',function () {
			//console.log(res.headers);
			console.log(body);
			resd.send(body);
		});
	}).on('error',function (e) {
		console.log("error:"+e.message);
	})
	req.write(data);
	req.end();
})

module.exports=router;