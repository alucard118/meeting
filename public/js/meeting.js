$(document).ready(function(){

	$('#opNote').mouseenter(function () {
		$('#note').fadeIn('slow');
	});

	$('#opNote').mouseleave(function () {
		$('#note').fadeOut('slow');
	})


  $('.close').click(function () {

  	$('.alert').fadeOut('slow');
  	$('#dark').fadeOut('slow');
  });

  $('#delConf').click(function () {
  	var alertWidth=($(document.body).width()-$('#alert').outerWidth())/2;
  	var alertHeight=($(window).height()-$('#alert').outerHeight())/3;
  	console.log("Alertwidth:"+$('#alert').outerWidth()+" Alertheight:"+$('#alert').outerHeight());
  	console.log("width:"+$(document.body).width()+" height:"+$(window).height());
  	$('#alert').css({'left':alertWidth,'top':alertHeight});
  	$('#dark').css('height',$(window).height());
  	$('#dark').fadeIn();
 	$('#alert').fadeIn();

  });

  
  

});

