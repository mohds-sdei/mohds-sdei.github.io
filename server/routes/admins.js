var express = require('express');
var router = express.Router();
var passport = require('../../config/auth');


// Load the bcrypt module
var bcrypt = require('bcryptjs');

var user = require('../models/Users.js');

// importing indexController
var story = require('../controller/indexController.js');
var userController = require('../controller/usersController.js');
var adminController = require('../controller/adminsController.js');
var productController = require('../controller/productController.js');


var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({'status' : 'false', 'msg' : 'Invalid Session'});
}


// router.all(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
//  });


router.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
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
  console.log('admin dashboard');
  res.render('admin/layout',{ title: 'Express', view : 'index.html'});
  
});

router.get('/countUsers',function(req,res,next) {
        adminController.countUsers(req,res,next);
    });

router.get('/countStories',function(req,res,next) {
        adminController.countStories(req,res,next);
    });


router.get('/manageUsers',function(req,res,next) {
        adminController.fetchUsers(req,res,next);
    });

router.post('/manageUsers',function(req,res,next) {
        adminController.saveOrUpdateUser(req,res,next);
        
    });

router.route('/manageUsers/:id')
    .get(function(req,res,next) {
        if (req.params.id) {
            adminController.fetchUserById(req,res,next);
        } else {
            adminController.fetchUsers(req,res,next);    
        }
    })
    .post(function(req,res,next) {
        adminController.saveOrUpdateUser(req,res,next);
    });
    
// Manage stories

router.get('/manageStories',function(req,res,next) {
        adminController.fetchStories(req,res,next);
    });

router.post('/manageStories',function(req,res,next) {
      //console.log(req);
     // story.upload(req,res,next);
   adminController.saveOrUpdateStory(req,res,next);
        
    });

router.route('/manageStories/:id')
    .get(function(req,res,next) {
        if (req.params.id) {
            adminController.fetchStoryById(req,res,next);
        } else {
            adminController.fetchStories(req,res,next);    
        }
    })
    .post(function(req,res,next) {
      console.log('update 2');
        adminController.saveOrUpdateStory(req,res,next);
    });

/* Login page for uploading stories. */

router.route('/login')
.get(function(req, res, next) {

  
  res.render('login',{'mesage' : 'Welcome'});
})
.post(passport.authenticate('adminLogin'),function(req,res,next){
  if (req.session.passport.user['uname']) {
    console.log(req.session.passport);
     res.json({ status : true ,Username : req.session.passport.user['name'], data : req.session.passport.user});
  } else {
     res.json({ status: false });
  }
 
  });
  
/* Logout call for destroying session. */  
router.get('/logout',function (req, res, next) {
 req.logout();
  res.json({ status: true });
  //res.redirect('/');
  
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


router.route('/addCategory')
  .get(function (req,res,next) {
    productController.fetchCategories(req,res,next);
    //res.json({status : 'true', data : "Inside get"});
  })
  .post(function(req,res,next) {
    productController.addCategory(req,res,next);
    
  });
  
  router.route('/addSubCategory')
  .get(function (req,res,next) {
    //productController.fetchCategories(req,res,next);
    res.json({status : 'true', data : "Inside get"});
  })
  .post(function(req,res,next) {
    productController.addSubCategory(req,res,next);
    
  });
router.get('/addSubCategory/:id',function (req,res,next) {
  productController.fetchSubCategory(req,res,next);
});


router.route('/addProduct')
  .get(function (req,res,next) {
    productController.fetchProducts(req,res,next);
    //res.json({status : 'true', data : "Inside get product"});
  })
  .post(function(req,res,next) {
    console.log('add prod 1');
    productController.addProduct(req,res,next);
    
  });
  
  router.route('/addProduct/:id')
  .get(function (req,res,next) {
    productController.fetchProduct(req,res,next);
    //res.json({status : 'true', data : "Inside get product"});
  })
  .post(function(req,res,next) {
    console.log('add prod 2');
    productController.addProduct(req,res,next);
    
  });
  

router.get('/fetchSub/:id', function (req,res,next) {
  console.log(req.params.id);
  productController.fetchIndividualSubCategory(req,res,next);
  
});

  
  
  
module.exports = router;
