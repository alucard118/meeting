var nodemailer=require('nodemailer');
var getCode=require('./code');
var date=new Date();
var today=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();

var code=getCode.birthCode();
var msg="<font style='font-size:16px;''>今日操作码： "+code+"<br><br>"+today


function sendMail(add) {
	let transporter=nodemailer.createTransport({
		host:'mail.ccf.org.cn',
		auth:{
			user:'ccfdigital@ccf.org.cn',
			pass:'ccf-2017-info2'
		}
	});

	let mailOptions={
		from:'CCF Dgital <ccfdigital@ccf.org.cn>',
		to:add,
		subject:'会议功能操作码',
		html:msg
	};
	transporter.sendMail(mailOptions,(error,info)=>{
		if(error){
			return console.log(error);
		}
		console.log('Message %s sent to %s',info.messageId,info.response);
	});

}

exports.sendMail=sendMail;

// var transporter=nodemailer.createTransport('SMTP',{
// 		host:"mail.ccf.org.cn",
// 		secureConnection:true,
// 		port:465,
// 		auth:{
// 			user:'ccfdigital@ccf.org.cn',
// 			pass:'ccf-2017-info2',
// 		}
// 	});

// var sendmail=function (html) {
// 		var option={
// 			from:"ccfdigital@ccf.org.cn",

// 		}
// 		option.subject='预订会议室操作码';
// 		option.html=html;
// 	}