//定时生成最新随机码存入数据库中，使用时与第一个进行比对。
//http://cnodejs.org/topic/51b8811df78196a85c85dad3
var mongo=require('mongodb');
var host="localhost";
var port="27017";
var birthCode=function (callback) {
	var code="";	
	var arr=['0','1','2','3','4','5','6','7','8','9',
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
	];

	var date=new Date();
	var today=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	var db=new mongo.Db('CCFmeeting',new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
//console.log(date);


	db.open(function (err,db) {
		db.collection('codeList',function (err,collection) {
			if(err) throw err;
			else{
				collection.find({date:today}).toArray(function (err,docs) {
					if(err) throw err;
					else{
						
						if(docs.length==0){
							
							console.log('none code');
							for(var i=0;i<5;i++){
								var rnd=Math.floor(Math.random()*arr.length);
								code=code+arr[rnd];
								
								
							}
							
							collection.insert({date:today,code:code});
							return callback(code);
							db.close();
						}
						else{
							code=docs[0]['code'];
							//callback(docs[0]['code']);
							return callback(code);
							//console.log(docs);
							db.close();

							
						}

						
					}
				})
			}
		})
	});
	
	
}

exports.birthCode=birthCode;
