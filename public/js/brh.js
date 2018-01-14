$(document).ready(function () {
	var left=($(window).width()-$('.modal_center').outerWidth())/2;
	var top=($(window).height()-$('.modal_center').outerHeight())/3;
	$('.modal_center').css({'left':left,'top':top});

	$(window).resize(function () {
		var left=($(window).width()-$('.modal_center').outerWidth())/2;
		var top=($(window).height()-$('.modal_center').outerHeight())/3;
		$('.modal_center').css({'left':left,'top':top});
	});

	$('.delStaff').click(function () {
		$(this).parent().attr('class','del');
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

	$('#dellStaffCancel').click(function(){
    	$('#dark').fadeOut('slow');
    	$('#alert').fadeOut('slow');
    	if($('.del'))
    		$('.del').removeAttr('class');
  	});

	$('.delStaff').mouseover(function(){
		$(this).parent().parent().addClass('highlight');
	});
	$('.delStaff').mouseleave(function(){
		$(this).parent().parent().removeClass('highlight');
	});

	$('.saveStaff').click(function () {
		if($('.newMail').val()!=""&&$('.newName').val()!=""&&$('.newDepartment').val()!=""){
			$.ajax({
				type:'post',
				url:'/admin/staff',
				data:{newMail:$('.newMail').val(),newName:$('.newName').val(),newDepartment:$('.newDepartment').val()},
				success:function (data) {
					if(data=='-1')
						alert('已存在该邮箱');
					if(data=='1')
						alert('新增成功');
				},
				error:function () {
					console.log("新增员工失败");
				}
			});
		}
		else{
			if($('.newMail').val()=="") $('.newMail').css('border-color','#ff0000');
			if($('.newName').val()=="") $('.newName').css('border-color','#ff0000');
			if($('.newDepartment').val()=="") $('.newDepartment').css('border-color','#ff0000');
		}
	});

	$('.staff_table>input').blur(function () {
		console.log($(this).val());
	});

	$('.newStaff').focus(function () {
    $(this).css('border-color','rgb(97, 172, 231, 0.6)');
  });
	$('.newStaff').blur(function () {
    $(this).css('border-color','#ccc');
  });
});
function nextStaff() {
	//console.log($('.staff_table').length/4);
	var num=parseInt($('.staff_table:first').text());
	if(($('.staff_table').length/4)==16){
		$.ajax({
		type:'post',
		url:'/admin/staff',
		data:{page:Math.floor($('.staff_table:first').text()/16)+1},
		success:function (data) {
			//console.log(data);
			if(data.length!=0){
				var html="<tr><td style='padding:6px 12px'><b>序号</b></td><td style='padding:6px 12px'><b>邮箱</b></td><td style='padding:6px 12px'><b>姓名</b></td><td style='padding:6px 12px'><b>部门</b></td><td style='padding:6px 12px'></td></tr>";
			for(var i=0;i<data.length;i++){
			   html=html+"<tr><td class='staff_table' style='padding:6px 12px'>"+(num+16+i)+"</td><td class='staff_table'><input class='form-control' type=text value="+data[i]['mail']+"></td><td class='staff_table'><input class='form-control' style='width:100px;' type=text value="+data[i]['name']+"></td><td class='staff_table'><input class='form-control' style='width:100px;' type=text value="+data[i]['department']+"></td><td style='padding:6px 12px'><a class='delStaff' href='./staff/del/"+data[i]['mail']+"' onclick='return false'>删除</a></td></tr>";
			}
			}
			else{
				html="<tr><td><a href='javascript:location.reload()'>第一页</a></td></tr>";
			}
			$('.staffTable').html(html);
			$('.delStaff').mouseover(function(){
				$(this).parent().parent().addClass('highlight');
			});
			$('.delStaff').mouseleave(function(){
				$(this).parent().parent().removeClass('highlight');
			});
			$('.delStaff').click(function () {
		$(this).parent().attr('class','del');
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
		},
		error:function () {
			console.log('分页失败');
		}
	});
	}
	else{
		return false;
	}
	

}
function prevStaff() {
	var num=parseInt($('.staff_table:first').text());
	if(($('.staff_table:first').text()!=1)){
		$.ajax({
		type:'post',
		url:'/admin/staff',
		data:{page:Math.floor($('.staff_table:first').text()/16)-1},
		success:function (data) {
			//console.log(data);
			var html="<tr><td style='padding:6px 12px'><b>序号</b></td><td style='padding:6px 12px'><b>邮箱</b></td><td style='padding:6px 12px'><b>姓名</b></td><td style='padding:6px 12px'><b>部门</b></td><td style='padding:6px 12px'></td></tr>";
			for(var i=0;i<data.length;i++){
			   html=html+"<tr><td class='staff_table' style='padding:6px 12px'>"+(num-16+i)+"</td><td class='staff_table'><input class='form-control' type=text value="+data[i]['mail']+"></td><td class='staff_table'><input class='form-control' style='width:100px;' type=text value="+data[i]['name']+"></td><td class='staff_table'><input class='form-control' style='width:100px;' type=text value="+data[i]['department']+"></td><td style='padding:6px 12px'><a class='delStaff' href='./staff/del/"+data[i]['mail']+"' onclick='return false'>删除</a></td></tr>";
			}
			$('.staffTable').html(html);
			$('.delStaff').mouseover(function(){
				$(this).parent().parent().addClass('highlight');
			});
			$('.delStaff').mouseleave(function(){
				$(this).parent().parent().removeClass('highlight');
			});
			$('.delStaff').click(function () {
		$(this).parent().attr('class','del');
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
		},
		error:function () {
			console.log('分页失败');
		}
	});
	}
	else{
		return false;
	}
}
function confirmDelStaff() {
	//console.log($('.del').parent().children("td:nth-child(2)").children().val());
	var mail=$('.del').parent().children("td:nth-child(2)").children().val();
	$.ajax({
		type:'post',
		url:'/admin/staff/del',
		data:{'mail':mail},
		success:function (data) {
			if(data==1){
				alert('删除成功。');
				document.location.reload();
			}
		},
		error:function(){
			console.log('删除失败');
		}
	});
}