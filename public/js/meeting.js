$(document).ready(function(){

	$('#opNote').mouseenter(function () {
		$('#note').fadeIn('slow');
	});

	$('#dark').click(function () {
		$('.alert').fadeOut('slow');
		$(this).fadeOut('slow');
	});


	$('#opNote').mouseleave(function () {
		$('#note').fadeOut('slow');
	});


  $('.close').click(function () {

  	$('.alert').fadeOut('slow');
  	$('#dark').fadeOut('slow');
  });

  $('.delConf').click(function () {
  	var alertWidth=($(document.body).width()-$('#alert').outerWidth())/2;
  	var alertHeight=($(window).height()-$('#alert').outerHeight())/3;
  	//console.log("Alertwidth:"+$('#alert').outerWidth()+" Alertheight:"+$('#alert').outerHeight());
  	//console.log("width:"+$(document.body).width()+" height:"+$(window).height());
  	$('#alert').css({'left':alertWidth,'top':alertHeight});
  	$('#dark').css('height',$(window).height());
  	$('#dark').fadeIn();
 	$('#alert').fadeIn();

  });
  // function checkToday(startTime) {
  //   startTime=startTime.split(' ');
  //   var startDate=startTime[0].split('-');
  //   startTime=startTime[1].split(':');
  //   var date=new Date();
  //   console.log(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getHours()+"-"+date.getMinutes());
  //   if(startDate[0]>=date.getFullYear()){
  //   	if(Math.abs(startDate[1])>=(date.getMonth()+1)){
  //   		if(Math.abs(startDate[2])>=date.getDate()){
  //   			if(startTime[0]>=date.getHours()){
  //   				if(startTime[1]>=date.getMinutes())
  //   					return true;
  //   				else
  //   					return false;
  //   			}
  //   			else
  //   				return false;

  //   		}
  //   		else
  //   			return false;
  //   	}
  //   	else
  //   		return false;
  //   }
  //   else
  //   	return false;
    
  	
  // }

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

 //  $("#endTime").blur(function () {
 //  	if(checkToday($('#startTime').val())){
 //  		if(checkDate($('#startTime').val(),$('#endTime').val()))
 //      		$('#timeNote').fadeOut('slow');
 //      else{
 //      	$('#timeNote').text('禁止穿越！');
 //      	$('#timeNote').fadeIn('slow');
 //      }
 //  	}

 //  	else{
 //  		$('#timeNote').text('忘掉过去！');
 //      	$('#timeNote').fadeIn('slow');
 //  	}
     
 //  });

 //  $("#startTime").blur(function () {
 //  	if(checkToday($('#startTime').val())){
	//       if(checkDate($('#startTime').val(),$('#endTime').val()))
	//       		$('#timeNote').fadeOut('slow');
	//       else{
	//       	$('#timeNote').text('禁止穿越！');
	//       	$('#timeNote').fadeIn('slow');
	//       }
 //  	}
 //  	else{
 //  		$('#timeNote').text('忘掉过去！');
 //      	$('#timeNote').fadeIn('slow');
      
	// }

 //  });

  $('#startTime').bind('input propertychange change',function () {
      if($('#startTime').val()!==""){
  		  $('#endTime').removeAttr('disabled');
  		  $('#endTime').datetimepicker({minDate:$('#startTime').val(),startDate:$('#startTime').val()});
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
  	var alertHeight=($(window).height()-$('#alert').outerHeight())/3;
  	//console.log("Alertwidth:"+$('#alert').outerWidth()+" Alertheight:"+$('#alert').outerHeight());
  	//console.log("width:"+$(document.body).width()+" height:"+$(window).height());
  	$('#alert').css({'left':alertWidth,'top':alertHeight});
  	$('#dark').css('height',$(window).height());
  	$('#dark').fadeIn();
 	$('#alert').fadeIn();
  });

  $('#getCode2').click(function () {
  	var alertWidth=($(document.body).width()-$('#alert2').outerWidth())/2;
  	var alertHeight=($(window).height()-$('#alert2').outerHeight())/3;
  	//console.log("Alertwidth:"+$('#alert').outerWidth()+" Alertheight:"+$('#alert').outerHeight());
  	//console.log("width:"+$(document.body).width()+" height:"+$(window).height());
  	$('#alert2').css({'left':alertWidth,'top':alertHeight});
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


