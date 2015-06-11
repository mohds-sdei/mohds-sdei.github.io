var express = require('express');
var fs = require('fs');
var util = require('util');
var user = require('../models/Users.js');




/*
    function : login
    desc : login for uploading the posts 
    return : string done
*/
 var login = function(req, res, next) {
    console.log('inside login');
    var flag = false;
    var email = req.body.email;
    var passwd = req.body.password;
    user.findOne({uname:req.body.email},function(err,data) {
        if (err) {
          console.log(err);
        }
        console.log(data);
        if (!data) {
           flag = false;
        } else {
            
            data.comparePassword(req.body.password, function(err, isMatch){
                    if (err) {
                        console.log(err);
                    }else{
                        console.log(data);
                        console.log('----'+isMatch);
                        if (isMatch) {
                            flag = true;
                        }else{
                            flag = false;
                        }
                        if (flag) {
                            req.session.email = email;
                            req.session.password = passwd;
                            console.log('session Email : ' + req.session.email + ' Password : ' +req.session.password);
                            res.redirect('/upload');
                        } else {
                          res.render('login', { message: 'Invalid email and password.' });
                        }
                    }
                });
            
        }
        
    });
    
    
   
    console.log('outside find');
   
    
    
 };
 exports.login = login;




/*
    function : signup
    desc : Registration for users
    return : string done
*/
 var signup = function(req, res, next) {
    console.log('inside signup');
    var msg = "Registration failed !";
    
    if (req.body) {
        //var password = 'shais';//user.hash(req.body.password);
        //console.log('unside signup'+password);
        var collectedData = {
            name:req.body.name,
            uname:req.body.uname,
            password: req.body.password,
            age:req.body.age,
            qualification:req.body.qualification
        };
        var userData = new user(collectedData);
        //if(userData.save()) {
        //    msg = "Registration Successful.";
        //    req.body = null;
        //}
        
        userData.save(function(err, data){
            if (err) {
                console.error(err);
                res.render('signup', { 'message': err });
            }else{
                console.log('Saved');
                msg = "Registration Successful.";
                res.render('signup', { 'message': msg });
            }
        });
        
        
    }
    
     
    
    
 };
 exports.signup = signup;