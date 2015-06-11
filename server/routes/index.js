var express = require('express');
var router = express.Router();
var passport = require('../../config/auth');


// Load the bcrypt module
var bcrypt = require('bcryptjs');

var user = require('../models/Users.js');

// importing indexController
var story = require('../controller/indexController.js');
var userController = require('../controller/usersController.js');




var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({'status' : 'false', 'msg' : 'Invalid Session'});
}





router.use(function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});


var checkSession = function(req,res,next) {
  if (!req.session.passport.user['uname'] && !req.session.passport.user['password']) {
    res.redirect('/');
  }else {
    console.log('still session');
    next();
  }
}

/* GET home page with stories listed on it also performing search operation. */

router.get('/',function(req,res,next) {
  
  var sess_email = '';
   //console.log('SHAIS DATA' +JSON.stringify(req.query));
  story.index(req,res,next,function (err,data) {
    
   
    
    if (err) {
      console.log(err);
    }
 
    var results = [];
    if (req.isAuthenticated()) {
      sess_email = req.session.passport.user['uname'];  
    }
    

    
    //Performing search on data collected from db only if user is logged in
    if (!sess_email) {
      req.query.search = '';
    } 
    if (req.query.search) {
      var searchVal = req.query.search;  
      searchVal = (searchVal.trim());  
      if ( searchVal !== null && searchVal !== '') {
        for (var i=0 ; i < data.length ; i++)
        {
          var headline = data[i].headline.match(new RegExp(searchVal, "i"));
          var desc = data[i].description.match(new RegExp(searchVal, "i"));
          
          if (headline !== null && headline.index >= 0) {
            results.push(data[i]);
          }
        }
        data = results;
      }
    }
    
       //console.log('shais :'+data+ ' email : '+sess_email);
      // res.json({'data' : data});
    res.render('layout',{'data' : data,'email' : sess_email});
      
    });
  
});



router.all('/fetchStories',function(req,res,next) {
  console.log('GET PARAM : ' +req.query.search);
  var sess_email = '';
  
  story.index(req,res,next,function (err,data) {
    
    if (err) {
      console.log(err);
    }
 
    var results = [];
    if (req.isAuthenticated()) {
      sess_email = req.session.passport.user['uname'];  
    }
    

    
    //Performing search on data collected from db only if user is logged in
    if (!sess_email) {
      req.query.search = '';
    } 
    if (req.query.search) {
      var searchVal = req.query.search;  
      searchVal = (searchVal.trim());  
      if ( searchVal !== null && searchVal !== '') {
        for (var i=0 ; i < data.length ; i++)
        {
          var headline = data[i].headline.match(new RegExp(searchVal, "i"));
          var desc = data[i].description.match(new RegExp(searchVal, "i"));
          
          if (headline !== null && headline.index >= 0) {
            results.push(data[i]);
          }
        }
        data = results;
      }
    }
    
    
       //console.log('shais :'+data+ ' email : '+sess_email);
      // res.json({'data' : data});
    res.json({'data' : data,'email' : sess_email});
      
    });
  
});


/* Upload page for uploading stories. */

router.route('/upload')
  .get(isAuthenticated,function(req,res,next) {
    var sess_email = '';
     //rendering session variable on index page
      if (req.session.passport.user['uname'] != '') {
        sess_email = req.session.passport.user['uname'];
      } else {
        sess_email = '';
      }
    res.render('upload',{'email' : sess_email});
    
  })
  .post(isAuthenticated,function(req,res,next) {
    //var errors = story.upload(req,res,next);
    console.log(req);
    story.upload(req,res,next);
    //if (errors) {
    //  res.redirect('/upload');  
    //} else {
    //  res.redirect('/');  
    //}
    //res.redirect('/');  
  });

/* Login page for uploading stories. */

router.route('/login')
.get(function(req, res, next) {

  console.log('inside '+req.session.user);
  
  if (req.session.email && req.session.password) {
    res.redirect('/upload');
  }
  res.render('login',{'mesage' : 'Welcome'});
})
//.post(passport.authenticate('login', function (err, user, info){
//      if (err) {
//        return next(err); 
//      }
//      if (user === false) {
//        res.status(401).json(info.message);  
//      } else {
//        res.status(200).json('shais' +info.message); 
//      }
//  }));

.post(passport.authenticate('login'),function(req,res,next){
  if (req.session.passport.user['uname']) {
     res.json({ status : true ,Username : req.session.passport.user['name']});
  } else {
     res.json({ status: false });
  }
 
  });
  
/* Logout call for destroying session. */  
router.get('/logout',function (req, res, next) {
 req.logout();
  res.redirect('/');
  
});
  
  
/* Signup page for users. */

router.route('/signup')
.get(function(req, res, next) {
  
    console.log('inside '+req.session.user);
  
  if (req.session.email && req.session.password) {
    res.redirect('/upload');
  }
  console.log('Flas error : '+req.flash('message'));
  res.render('signup',{'message': req.flash('message')});
})
.post (passport.authenticate('signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash : true 
  }));
  

router.get('/checkSession',function(req,res,next) {
    if (req.isAuthenticated()) {
      res.json({'status' : 'true', 'msg' : 'Valid Session'});
    } else {
      res.json({'status' : 'false', 'msg' : 'Invalid Session'});
    }
});
  
  
  
module.exports = router;
