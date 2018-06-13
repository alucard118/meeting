$(document).ready(function(){
  var param=location.href.split('#')[1];
  if(param==0){
    $('#roomlab0').attr('class','active');
    $('#roomlab1').removeAttr('class','active');

  }
  if(param==1){
    $('#roomlab1').attr('class','active');
    $('#roomlab0').removeAttr('class','active');
    $('#room1').attr('class','tab-pane fade');
    $('#room2').attr('class','tab-pane fade active in');
    
  }

  $('#backbtn').attr('href',"/#"+param);


	$('#opNote').mouseenter(function () {
		$('#note').fadeIn('slow');
	});

	$('#dark').click(function () {
		$('.alert').fadeOut('slow');
		$(this).fadeOut('slow');
    if($('.del'))
      $('.del').removeAttr('class');
	});


	$('#opNote').mouseleave(function () {
		$('#note').fadeOut('slow');
	});


  $('.close').click(function () {

  	$('.alert').fadeOut('slow');
  	$('#dark').fadeOut('slow');
    if($('.del'))
      $('.del').removeAttr('class');
  });

  $('.delConf').click(function () {
  	var alertWidth=($(document.body).width()-$('#alert').outerWidth())/2;
  	var alertHeight=($(document).height()-$('#alert').outerHeight())/3;
  	//console.log("Alertwidth:"+$('#alert').outerWidth()+" Alertheight:"+$('#alert').outerHeight());
  	//console.log("width:"+$(document.body).width()+" height:"+$(window).height());
    if($(document).height()>$(window).height())
      $('#dark').css('height',$(document).height());
    else
      $('#dark').css('height',$(window).height());
  	$('#alert').css({'left':alertWidth,'top':alertHeight});
  	
  	$('#dark').fadeIn();
 	$('#alert').fadeIn();

  });
 

  function checkDate(startTime,endTime) {

      startTime=startTime.split(' ');
      endTime=endTime.split(' ');

      var startDate=startTime[0].split('-');
      var endDate=endTime[0].split('-');
      startTime=startTime[1].split(':');
      endTime=endTime[1].split(':');
      
      if(startDate[0]>endDate[0])
      	return false;
      else if(startDate[0]==endDate[0]){
      	if(startDate[1]>endDate[1])
      		return false;
      	else if(startDate[1]==endDate[1]){
      		if(startDate[2]>endDate[2])
      			return false;
      		else if(startDate[2]==endDate[2]){
      			if(startTime[0]>endTime[0])
      				return false;
      			else if(startTime[0]==endTime[0]){
      				if (startTime[1]>endTime[1])
      					 return false;
      				else
      					return true;
      			}
      			else
      				return true;
      		}
      		else
      			return true;
      	}
      	else
      		return true;
      }
      else
      	return true;
}


  
//检测当前日期是否有会议
  $('#startTime').bind('input propertychange change',function () {
      if($('#startTime').val()!=""||$('#startTime').val()!=undefined){
  		  $('#endTime').removeAttr('disabled');
  		  $('#endTime').datetimepicker({minDate:$('#startTime').val(),maxDate:$('#startTime').val(),startDate:$('#startTime').val()});
        $.ajax({
          type:'post',
          url:'/book/check',
          data:{
            startTime:$('#startTime').val(),
            roomNum:$('#roomNum').val()
          },
          success:function (data) {
            
            if(data.length!=0){
            var bookMsg='';
            var title='';
            var end='';
            var room={0:'323会议室',1:'万事圆会议室'};
            
            var id=location.href.split(':')[3];
            var myDate = new Date();
            for(var i=0;i<data.length;i++){
              
              if(id!==undefined){
                if(data[i]['_id']!=location.href.split(':')[3].split('#')[0]){
                  title="<div class='row'><div class='col-sm-3'></div><div class='col-sm-6' style='font-size:14px;padding:5px;'>"+data[0]['date'].replace(myDate.getFullYear()+'-','').replace(/^0/,'').replace('-','月').replace(/月0/,'月')+'日'+"已在"+room[data[0]['roomId']]+"预订的会议：</div><div class='col-sm-3'></div></div><div class='row'><div class='col-sm-3'></div><div class='col-sm-6' style='background:#b7ced9;border-radius:5px;padding-left:0px;'><ul style='padding:0px;margin:0px;padding-left:25px;'>";
                  end="</ul></div><div class='col-sm-3'></div></div>";
                  bookMsg=bookMsg+"<li style='font-size:14px;padding:5px 0px;'>"+data[i]['startTime']+"~"+data[i]['endTime']+"　"+data[i]['confName']+"</li>";
                  }
                  else{
                    bookMsg='';
                    title='';
                    end='';
                    
                  }

                  
              }
              else{
                    title="<div class='row'><div class='col-sm-3'></div><div class='col-sm-6' style='font-size:14px;padding:5px;'>"+data[0]['date'].replace('2018-','').replace(/^0/,'').replace('-','月').replace(/月0/,'月')+'日'+"已在"+room[data[0]['roomId']]+"预订的会议：</div><div class='col-sm-3'></div></div><div class='row'><div class='col-sm-3'></div><div class='col-sm-6' style='background:#b7ced9;border-radius:5px;padding-left:0px;'><ul style='padding:0px;margin:0px;padding-left:25px;'>";
                    end="</ul></div><div class='col-sm-3'></div></div>";
                    bookMsg=bookMsg+"<li style='font-size:14px;padding:5px 0px;'>"+data[i]['startTime']+"~"+data[i]['endTime']+"　"+data[i]['confName']+"</li>";
                  }

            }
            if(bookMsg!=''){
              $('#alreadyBook').html(title+bookMsg+end);
            
              $('#alreadyBook').slideDown('slow');
            }
            else{
              $('#alreadyBook').slideUp('slow');
              $('#alreadyBook').html(title+bookMsg+end);
            }

            
            
            }
            else{
              $('#alreadyBook').slideUp('slow');

            }
            
          },
          error:function () {
            console.log('查询日期失败');
            return;
          }
        });
      }
      if($('#endTime').val()!=="" && $('#startTime').val()!==""){
        if(checkDate($('#startTime').val(),$('#endTime').val())){

        	$('#timeNote').fadeOut('slow');
      	}
      	else{
        	$('#timeNote').text(' -_-|| 禁止穿越！');
          	$('#timeNote').fadeIn('slow');
       
          
      		}
      }
  });
    $('#endTime').blur(function () {
    	if($('#endTime').val()!=="" && $('#startTime').val()!==""){
	  		if(checkDate($('#startTime').val(),$('#endTime').val())){
	  			$('#timeNote').fadeOut('slow');
	  		}else{
	  			$('#timeNote').text(' -_-|| 禁止穿越！');
	 	      	$('#timeNote').fadeIn('slow');
	 	    
	  		}
	  	}
  });
   $('#startTime').blur(function () {
   		if($('#endTime').val()!==""&& $('#startTime').val()!==""){
	  		if(checkDate($('#startTime').val(),$('#endTime').val())){

	  			$('#timeNote').fadeOut('slow');
	  			$('#endTime').datetimepicker({minDate:$('#startTime').val(),startDate:$('#startTime').val()});
	  		}else{
	  			$('#timeNote').text(' -_-|| 禁止穿越！');
	 	      	$('#timeNote').fadeIn('slow');
	 	     
	  		}
	  	}	
 });
   $('#endTime').bind('input propertychange change',function () {
    if($('#endTime').val()!=="" && $('#startTime').val()!==""){
      if(checkDate($('#startTime').val(),$('#endTime').val())){
        $('#timeNote').fadeOut('slow');
      }else{
        $('#timeNote').text(' -_-|| 禁止穿越！');
          $('#timeNote').fadeIn('slow');
          
      }
    }
   });


  $('#getCode').click(function () {
  	var alertWidth=($(document.body).width()-$('#alert').outerWidth())/2;
  	var alertHeight=($(document).height()-$('#alert').outerHeight())/3;
  	//console.log("Alertwidth:"+$('#alert').outerWidth()+" Alertheight:"+$('#alert').outerHeight());
  	//console.log("width:"+$(document.body).width()+" height:"+$(window).height());
  	$('#alert').css({'left':alertWidth,'top':alertHeight});
  	if($(document).height()>$(window).height())
      $('#dark').css('height',$(document).height());
    else
      $('#dark').css('height',$(window).height());
  	$('#dark').fadeIn();
 	$('#alert').fadeIn();
  });

  $('#getCode2').click(function () {
  	var alertWidth=($(document.body).width()-$('#alert2').outerWidth())/2;
  	var alertHeight=($(document).height()-$('#alert2').outerHeight())/3;
  	//console.log("Alertwidth:"+$('#alert').outerWidth()+" Alertheight:"+$('#alert').outerHeight());
  	//console.log("width:"+$(document.body).width()+" height:"+$(window).height());
  	$('#alert2').css({'left':alertWidth,'top':alertHeight});
  	if($(document).height()>$(window).height())
      $('#dark').css('height',$(document).height());
    else
      $('#dark').css('height',$(window).height());
  	$('#dark').fadeIn('slow');
 	$('#alert').fadeOut('slow');
 	$('#alert2').fadeIn('slow');

  });

  $('.close2').click(function () {
  	$('#alert2').fadeOut('slow');
  	$('#alert').fadeIn('slow');
  });

  $('#opCode').focus(function () {
    $(this).css('border-color','#ccc');
  });
  $('#meetingName').focus(function () {
    $(this).css('border-color','#ccc');
  });
  $('#startTime').focus(function () {
    $(this).css('border-color','#ccc');
    
  });
  $('#endTime').focus(function () {
    $(this).css('border-color','#ccc');
  });
  $('#bookEmail').focus(function () {
    $(this).css('border-color','#ccc');
  });

  $('#sendCode').click(function () {
    if ($('#bookEmail').val()==""){
          $('#bookEmail').css('border-color','#f43f3f');
          return false;
      } 
  });
  $('#getCode').focus(function () {
    $(this).css('border-color','#ccc');
  });
  $('#delCon').click(function () {
    if($('#getCode').val()==""){
      $('#getCode').css('border-color','#f43f3f');
    }
  });
  $('.delConf').click(function () {
    $('#delCon').attr('data-id',$(this).attr('href'));
  });




  $('#book').click(function () {
      if ($('#opCode').val()==""){
          $('#opCode').css('border-color','#f43f3f');
          return false;
      } 
      
      if ($('#meetingName').val()==""){
          $('#meetingName').css('border-color','#f43f3f');
          return false;
      } 
      if ($('#startTime').val()==""){
          $('#startTime').css('border-color','#f43f3f');
          return false;
      } 
      if ($('#endTime').val()==""){
          $('#endTime').css('border-color','#f43f3f');
          return false;
      } 
      if ($('#bookName').val()==""){
          $('#bookName').css('border-color','#f43f3f');
          return false;
      } 
  });

  $('#bookEmail').focus(function () {
    $('#sendNote').fadeOut('slow');
  });

});


