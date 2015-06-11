var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');
var bcrypt = require('bcryptjs');
var expressValidator = require('express-validator');
var session = require('cookie-session');
var flash = require('connect-flash');
var cors = require('cors');


var passport = require('./config/auth');
//var LocalStrategy = require('passport-local').Strategy;

var db = require('./config/db');

var routes = require('./server/routes/index');
var users = require('./server/routes/users');


var admin = require('./server/routes/admins');




var app = express();




app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.');
      var root    = namespace.shift();
      var formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


 // File upload using multer
app.use(multer({ dest: './public/images/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...');
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path);
  done=true;
}
}));



// view engine setup
//app.set('views', path.join(__dirname, './public/myapp/www'));

app.set('views', path.join(__dirname, './public/views'));

//app.set('view engine', 'jade');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(cors());



app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public/ecomapp/www')));

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
      keys : ['sekret','supersekret']
  }));



app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//app.use('/', routes);
//app.use('/users', users);
//
app.use('/admin', admin);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
