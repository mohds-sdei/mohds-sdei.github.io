var express = require('express');
var fs = require('fs');
var util = require('util');
var user = require('../models/Users.js');
var post = require('../models/Post.js');
/*
    function : index
    desc : used for listing stories on homepage
    return : stories in JSON form
*/

var countUsers = function (req,res,next) {
    user.count({is_deleted : 1},function(err, data) {
        if (err) {
         console.log(err);
        }
        console.log('users count: ' +data);
        res.json({status : true, data : data});
        
    });
}
exports.countUsers = countUsers;


var countStories = function (req,res,next) {
    post.count(/*{is_deleted : 1},*/function(err, data) {
        if (err) {
         console.log(err);
        }
        console.log('stories count: ' +data);
        res.json({status : true, data : data});
        
    });
}
exports.countStories = countStories;



var fetchUsers = function (req,res,next) {
    user.find({is_deleted : 0},function(err, data) {
        if (err) {
         console.log(err);
       }
        console.log('users : ' +data);
        res.json({status : true, data : data});
    });
};
exports.fetchUsers = fetchUsers;


var fetchUserById = function (req,res,next) {
    user.findById(req.params.id,function(err, data) {
        if (err) {
         console.log(err);
       }
        console.log('users : ' +data);
        res.json({status : true, data : data});
    });
};
exports.fetchUserById = fetchUserById;


var saveOrUpdateUser = function (req,res,next) {
    
    if (req.body.op == 'delete') {
        delete req.body.op;
        req.body.is_deleted = 1;
    }
    
    var query = req.body._id;
    delete req.body._id;
    if (query) {
        
        user.findByIdAndUpdate(query, { $set: req.body },{upsert:true, new: true}, function(err, doc){
            if (err) { console.error(err); return res.json({'status' : false, 'msg' : 'Unable to save the data.'});}
            
            return res.json({'status' : true, 'msg' : 'Successfully saved the data.'});
        });
    } else {
      req.body.is_deleted = 0;
        var userData = new user(req.body);
        userData.save(function(err, data){
            if (err) {
                console.error(err);
                //res.render('upload', { 'message': err });
                res.json({'status' : false, 'msg' : 'Unable to save the data.'});
            }else{
               
                res.json({'status' : true, 'msg' : 'Successfully saved the data update.'});
            }
        });
        
        
    }
    
    
    
};
exports.saveOrUpdateUser = saveOrUpdateUser;



var fetchStories = function (req,res,next) {
    post.find({is_deleted : 0},function(err, data) {
        if (err) {
         console.log(err);
       }
        //console.log('users : ' +data);
        res.json({status : true, data : data});
    }).populate('user_id');
};
exports.fetchStories = fetchStories;

var fetchStoryById = function (req,res,next) {
    post.findById(req.params.id,function(err, data) {
        if (err) {
         console.log(err);
       }
        //console.log('users : ' +data);
        res.json({status : true, data : data});
    });
};
exports.fetchStoryById = fetchStoryById;


var saveOrUpdateStory = function (req,res,next) {
    
    //console.log();
    
    var fileData = JSON.stringify(req.files);
    
    if (fileData != '{}') {
        req.body.photo = req.files.file.name; 
    }
    
    if (req.body.op == 'delete') {
        delete req.body.op;
        req.body.is_deleted = 1;
    }
    console.log('Before query');
    var query = req.body._id;
    delete req.body._id;
    if (query) {
        console.log('In side query loop');
        post.findByIdAndUpdate(query, { $set: req.body },{upsert:true, new: true}, function(err, doc){
            if (err) { console.error(err); return res.json({'status' : false, 'msg' : 'Unable to save the data.'});}
            
            return res.json({'status' : true, 'msg' : 'Successfully saved the data.'});
        });
    } else {
      req.body.is_deleted = 0;
        var storyData = new post(req.body);
        storyData.save(function(err, data){
            if (err) {
                console.error(err);
                //res.render('upload', { 'message': err });
                res.json({'status' : false, 'msg' : 'Unable to save the data.'});
            }else{
               
                res.json({'status' : true, 'msg' : 'Successfully saved the data update.'});
            }
        });   
    }
};
exports.saveOrUpdateStory = saveOrUpdateStory;





