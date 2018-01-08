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
});