$(document).on("pagecreate",function(event){
  $('.close').on('tap',function () {

  	$('.alert').fadeOut('show');
  	$('#dark').fadeOut('show');
  });

  $('#delConf').on('tap',function () {
  	var alertWidth=($(document.body).width()-$('#alert').outerWidth())/2;
  	var alertHeight=($(document.body).height()-$('#alert').outerHeight())/2;
  	console.log("Alertwidth:"+$('#alert').outerWidth()+" Alertheight:"+$('#alert').outerHeight());
  	console.log("width:"+$(document.body).width()+" height:"+$(document.body).height());
  	$('#alert').css({'left':alertWidth,'top':alertHeight});
  	$('#dark').fadeIn();
 	$('#alert').fadeIn();

  });
  

});

