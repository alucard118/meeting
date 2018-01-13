var mongo=require('mongodb').MongoClient;
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://ccfmeeting:ccfmeeting@localhost:27017/CCFmeeting";
var ObjectId=require('mongodb').ObjectID;
var sd=require('silly-datetime');


var dbController={
	checkUser:function (username,password,callback) {
		MongoClient.connect(url,{auto_reconnect:true},function (err,db) {
			db.collection('users',function (err,collection) {

				collection.find({'name':username,'password':password}).toArray(function (err,docs) {
					
						//console.log(docs);
						callback(docs);
					
				
				});
			});
			db.close();
		})
	},

	bookMeeting:function (date,startTime,endTime,confName,userName,bookTime,roomId,remark) {
		MongoClient.connect(url,function (err,db) {
		db.collection('meetingList',function (err,collection) {
			if(err) throw err;
			else{
				collection.insert({'date':date,'startTime':startTime,'endTime':endTime,'confName':confName,'userName':userName,'bookTime':bookTime,'roomId':roomId,'remark':remark},function (err,docs) {
						if (err) throw err;
						else{
							console.log('成功创建会议：'+docs);
							db.close();
							MongoClient.close();
						}
				
					});
				
			}
		})
	})
	},

	updateMeeting:function (id,date,startTime,endTime,confName,userName,bookTime,roomId,remark) {
		MongoClient.connect(url,function (err,db) {
		db.collection('meetingList',function (err,collection) {
			if(err) throw err;
			else{
				collection.update({'_id':ObjectId(id)},{'date':date,'startTime':startTime,'endTime':endTime,'confName':confName,'userName':userName,'bookTime':bookTime,'roomId':roomId,'remark':remark},function (err,docs) {
						if (err) throw err;
						else{
							console.log('成功修改会议：'+docs);
							db.close();
							MongoClient.close();
						}
				
					})
				
			}
		})
	})
	},
	
	delMeeting:function (id,callback) {
		MongoClient.connect(url,function (err,db) {
		db.collection('meetingList',function (err,collection) {
			if(err) throw err;
			else{
				collection.find({'_id':ObjectId(id)}).toArray(function (err,docs) {
					// body...
				
					if (err) throw err;
					else{

						//console.log(docs);
						if(docs.length!=0){
							collection.remove({'_id':ObjectId(id)},function (err,result) {
							if(err) throw err;
							else{
								console.log('成功删除数据:'+result);
								db.close();
								MongoClient.close();
							}
							
							})
						}
						else
							{callback(docs);
								db.close();
								MongoClient.close();
							}
					}
				});
				
			}
		})
	})
	},
	checkMeeting:function (roomId,date,callback) {
		date=date.split(' ')[0];
		MongoClient.connect(url,function (err,db) {
		db.collection('meetingList',function (err,collection) {
			if(err) throw err;
			else{
				collection.find({'roomId':roomId,'date':date}).sort({'startTime':1}).toArray(function (err,docs) {
				
					if (err) throw err;
					else{
						callback(docs);
						db.close();
					}
				});
				
			}
		})
	})
	},

	indexShow:function (callback) {
		MongoClient.connect(url,function (err,db) {
	db.collection('meetingList',function (err,collection) {
		if(err) throw err;
		else{
			collection.find({'date':{'$gte':sd.format(new Date(),'YYYY-MM-DD')}}).sort({'roomId':1,'date':1,'startTime':1}).toArray(function (err,docs) {
					if(err) throw err;
					else{
						db.close();
						
						return callback(docs);
						}

				})
			}
		})
	});
	},
	updateShow:function (id,callback) {
		MongoClient.connect(url,function (err,db) {
		db.collection('meetingList',function (err,collection) {
		if(err) throw err;
		else{
			collection.find({'_id':ObjectId(id)}).toArray(function (err,docs) {
				if(err) throw err;
				else{
					return callback(docs);
					db.close();
				}
			})
		}
	});
	});
	},

	addStaff:function (mail,name,department,callback) {
		
		MongoClient.connect(url,function (err,db) {
			db.collection('staff',function (err,collection) {
				if (err) throw err;
				else{
					collection.insert({'mail':mail,'name':name,'department':department},function (err,docs) {
									if(err) throw err;
									else{
										//console.log(docs);
										db.close();
									}
								})
				}
			})
		})
	},

//检测是否员工邮箱已存在
	checkEmail:function (mail,callback) {
		MongoClient.connect(url,function (err,db) {
			db.collection('staff',function (err,collection) {
				if(err) throw err;
				else{
					collection.find({'mail':mail}).toArray(function (err,docs) {
						if(err) throw err;
						else{
							return callback(docs);
							db.close();
						}
					})
				}
			})
		})
	},

//员工分页
	selectStaff:function(page,callback){
		MongoClient.connect(url,function(err,db){
			db.collection('staff',function (err,collection) {
				if(err) throw err;
				else{
					collection.find().skip(page*16-16).limit(16).toArray(function(err,docs){
						if(err) throw err;
						else{
							return callback(docs);
							db.close();
						}
					})
				}
			})
		})
	}
};
module.exports=dbController;