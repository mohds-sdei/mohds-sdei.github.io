var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

var user = require('../server/models/Users.js');


passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
  done(null, user);
});

var isValidPassword = function(user, password){
  return bcrypt.compareSync(password, user.password);
}

var createHash = function(password){
 return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use('login',new LocalStrategy(
  function(username, password, done) {
     console.log('Indise passport demo');
    process.nextTick(function () {
      
      user.findOne({'uname':username},
      function(err, data) {
        console.log('Indise passport use');
        if (err) { return done(err); }
        if (!data) { return done(null, false); }
        console.log('Is valid password : '+isValidPassword(data, password));
        if (!isValidPassword(data, password)){ return done(null, false); }
            //if (data.password != password) { return done(null, false); }
            return done(null, data);
      });
    });
  }
));


passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      user.findOne({'uname':username},function(err, data) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (data) {
          console.log('User already exists');
          return done(null, false,
             req.flash('message','User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new user();
          // set the user's local credentials
          newUser.name = req.body.name;
          newUser.password = req.body.password;
          newUser.uname = req.body.username;
          newUser.age = req.body.age;
          newUser.qualification = req.body.qualification;
          
         
          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err); 
              throw err; 
            }
            console.log('User Registration succesful');   
            return done(null, newUser);
          });
        }
      });
    };
     
    // Delay the execution of findOrCreateUser and execute
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  })
);


passport.use('adminLogin',new LocalStrategy(
  function(username, password, done) {
     //console.log('Indise passport demo');
    process.nextTick(function () {
      
      user.findOne({'uname':username,'role' : 'admin'},
      function(err, data) {
       //console.log('Indise passport use');
        if (err) { return done(err); }
        if (!data) { return done(null, false); }
        console.log('Is valid password : '+isValidPassword(data, password));
        if (!isValidPassword(data, password)){ return done(null, false); }
            //if (data.password != password) { return done(null, false); }
            return done(null, data);
      });
    });
  }
));



module.exports = passport;