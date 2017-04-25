var express=require('express');
var app=express();
var path=require('path');

var bodyParser=require('body-parser');


app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

var indexRouter=require('./routes/index');
var bookRouter=require('./routes/book');



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(express.static(path.join(__dirname,'public')));

app.use('/',indexRouter);
app.use('/book',bookRouter);




app.listen(3000,function () {
	console.log('app is running on port 3000');
})