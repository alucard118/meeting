
//ajax 预订会议
function msgUpload() {
    var opCode=$('#opCode').val();
    var roomNum=$('#roomNum').val();
    var meetingName=$('#meetingName').val();
    var startTime=$('#startTime').val();
    var endTime=$('#endTime').val();
    var bookName=$('#bookName').val();
    var bookDetail=$('#bookDetail').val();

    if(opCode!==""&&roomNum!==""&&meetingName!==""&&startTime!==""&&endTime!==""&&bookName!==""&& $('#timeNote').css('display')=='none')
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
          if(data=='1'){
              var alertWidth=($(document.body).width()-$('#alert').outerWidth())/2;
              var alertHeight=($(window).height()-$('#alert').outerHeight())/3;
              $('#success button').attr('onclick',"javascript:location.href='/#"+roomNum+"'");
              $('#success').css({'left':alertWidth,'top':alertHeight});
              $('#dark2').css('height',$(window).height());
              $('#success').fadeIn();
              $('#dark2').fadeIn();
          }
          else{
            $('#opCode').css('border-color','rgb(244,63,63)');
            return false;
          }
    			
    		},
    		error:function () {
    			alert('failed');
    			return false;
    		}
    	});

    }

//ajax 发送验证码
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
  				
  				else if(data=="2")
  					{$('#sendNote').text('服务宕了，管理员Where are you...');
  						$('#sendNote').fadeIn('slow');
            }
          else{
                $('#bookName').val(data);
                var countdown=60;
                function setTime(){
                  if(countdown==0){
                    $('#sendCode').removeAttr('disabled');
                    $('#sendNote').fadeOut('slow');
                    $('#sendCode').text('发送');
                    
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

  			},
  			error:function () {
  				console.log('failed');
  				return;
  			}

  		});
  }

//ajax 删除会议
  function delConf() {
  	var code=$('#getCode').val();
  	var conId=$('#delCon').attr('data-id');
  	if(code!==""&&conId!==""){
  			$.ajax({
  				type:'post',
  				url:'/id',
  				data:{opCode:code,id:conId},
  				success:function (data) {
  					console.log(data);
            if(data=="1"){
              $('#closeNote').text('会议已删除，窗口将自动关闭');

              var countdown=3;
              function setTime(){
                  if(countdown==0){
                    $('#alert').fadeOut('slow');
                    $('#delCon').removeAttr('disabled');
            
                    location.reload();
                    $('#getCode').val('');
                  }

                  else
                    {
                      $('#delCon').text(countdown+" s");
                      countdown-=1;
                      setTimeout(function(){setTime()},1000);
                    }

              }
              $('#closeNote').text('已删除，窗口将自动关闭');
              $('#closeNote').fadeIn('slow');
              $('#delCon').attr('disabled','disabled');
              setTime();
            }
            else{
              $('#getCode').css('border-color','rgb(244,63,63)');
                return false;
            }
  					
  				},
  				error:function () {
  					console.log('failed');
  					return;
  				}
  			});
  	}
  }

  //ajax修改会议
  function msgUpdate() {
    var id=location.href.split(':')[3].split('#')[0];
    var opCode=$('#opCode').val();
    var roomNum=$('#roomNum').val();
    var meetingName=$('#meetingName').val();
    var startTime=$('#startTime').val();
    var endTime=$('#endTime').val();
    var bookName=$('#bookName').val();
    var bookDetail=$('#bookDetail').val();

    if(opCode!==""&&roomNum!==""&&meetingName!==""&&startTime!==""&&endTime!==""&&bookName!==""&& $('#timeNote').css('display')=='none')
      $.ajax({
        type:'post',
        url:'/update',
        data:{
          id:id,
          opCode:opCode,
          roomNum:roomNum,
          meetingName:meetingName,
          startTime:startTime,
          endTime:endTime,
          bookName:bookName,
          bookDetail:bookDetail
        },
        success:function (data) {
          if(data=='1'){
              var alertWidth=($(document.body).width()-$('#alert').outerWidth())/2;
              var alertHeight=($(window).height()-$('#alert').outerHeight())/3;
              $('#success button').attr('onclick',"javascript:location.href='/#"+roomNum+"'");
              $('#success').css({'left':alertWidth,'top':alertHeight});
              $('#dark2').css('height',$(window).height());
              $('#success').fadeIn();
              $('#dark2').fadeIn();
          }
          else{
            $('#opCode').css('border-color','rgb(244,63,63)');
            return false;
          }
          
        },
        error:function () {
          alert('failed');
          return false;
        }
      });

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
 