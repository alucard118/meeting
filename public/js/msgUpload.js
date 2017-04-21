

function msgUpload() {
    var opCode=$('#opCode').val();
    var roomNum=$('#roomNum').val();
    var meetingName=$('#meetingName').val();
    var startTime=$('#startTime').val();
    var endTime=$('#endTime').val();
    var bookName=$('#bookName').val();
    var bookDetail=$('#bookDetail').val();

    if(opCode!==""&&roomNum!==""&&meetingName!==""&&startTime!==""&&endTime!==""&&bookName!=="")
    	$.ajax({
    		type:'post',
    		url:'/book',
    		data:{
    			opCode:opCode,
    			roomNum:roomNum,
    			meetingName:meetingName,
    			startTime:startTime,
    			endTime:endTime,
    			bookName:bookName,
    			bookDetail:bookDetail
    		},
    		success:function (data) {
    			
    		},
    		error:function () {
    			alert('failed');
    			return;
    		}
    	});

    }

  function sendMail() {
  	var mail=$('#bookEmail').val();
  	if(mail!=="")
  		$.ajax({
  			type:'post',
  			url:'/book/:mail',
  			data:{bookEmail:mail},
  			success:function (data) {
  				console.log(data); 
  				if(data=="-1")
  					{$('#sendNote').text('请输入正确的CCF邮箱');
  						$('#sendNote').fadeIn('slow');}
  				if(data=="1")
  					{
								var countdown=60;
								function setTime(){
									if(countdown==0){
										$('#sendCode').removeAttr('disabled');
										$('#sendNote').fadeOut('slow');
										$('#sendCode').text('发送');
										countdown=60;
									}

									else
										{
											$('#sendCode').text(countdown+" s");
											countdown-=1;
											setTimeout(function(){setTime()},1000);
										}

							}
  						
  						$('#sendNote').text('发送成功，请查收邮件');
  						$('#sendNote').fadeIn('slow');
  						$('#sendCode').attr('disabled','disabled');
  						setTime();
  						
  					}
  				if(data=="2")
  					{$('#sendNote').text('服务宕了，管理员Where are you...');
  						$('#sendNote').fadeIn('slow');}
  			},
  			error:function () {
  				console.log('failed');
  				return;
  			}

  		});
  }

  function delConf() {
  	var code=$('#getCode').val();
  	var conId=$('#delCon').attr('data-id');
  	if(code!==""&&conId!==""){
  			$.ajax({
  				type:'post',
  				url:'/:id',
  				data:{opCode:code,id:conId},
  				success:function (data) {
  					console.log(data);
  					
  				},
  				error:function () {
  					console.log('failed');
  					return;
  				}
  			});
  	}
  }
    // $.ajax(  
    //     {  
    //         type: 'post',  
    //         url: '/login',  
    //         data: {  
    //             name: name,  
    //             password: password  
    //         },  
    //         dataType: 'json',  
    //         success: function (data) {  
    //             if (data) {  
    //             }  
    //         },  
    //         error: function () {  
    //             alert('登录失败!');  
    //             return;  
    //         }  
    //     }); 
 