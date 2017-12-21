var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'sessionbrh',
    cookie: { maxAge: 60000*15 },
    resave: false,
    saveUninitialized:false,
    store:new MongoStore({url:'mongodb://ccfmeeting:ccfmeeting@localhost:27017/CCFmeeting',
	touchAfter: 24 * 3600
	})
}));
app.use(function(req, res, next){
req.session._garbage = Date();
req.session.touch();
next();
});

var indexRouter=require('./routes/index');
var bookRouter=require('./routes/book');
var updateRouter=require('./routes/update');
var checkMem=require('./routes/checkMember');
var loginRouter=require('./routes/login');
var adminRouter=require('./routes/admin');
var nopreveligeRouter=require('./routes/noprevelige')

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(express.static(path.join(__dirname,'public')));

app.use('/',indexRouter);
app.use('/book',bookRouter);
app.use('/update',updateRouter);
app.use('/checkMember',checkMem);
app.use('/login',loginRouter);
app.use('/admin',adminRouter);





app.listen(3000,function () {
	console.log('app is running on port 3000');
})