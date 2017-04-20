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
  				
  			},
  			error:function () {
  				
  				return;
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
 