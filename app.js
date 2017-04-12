var express=require('express');
var app=express();
var path=require('path');

var indexRouter=require('./routes/index');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use('/',indexRouter);

app.listen(3000,function () {
	console.log('app is running on port 3000');
})