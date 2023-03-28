var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db/mongodb')


const cors = require('cors');

const corsOptions ={
    origin:"*",   
     credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    allowedHeaders: ['Content-Type','Authorization', 'Accept', 'x-access-token'],
   

    
}


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, x-access-token , Content-Type, Accept");
  next();
});
app.use(cors(corsOptions));


var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
let testRouter = require('./routes/test')
const adminRouter =require('./routes/admin')


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test',testRouter);
app.use('/admin',adminRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
// routers


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
