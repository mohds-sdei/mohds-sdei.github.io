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

var index = function(req,res,next,callback) {
    
    

    post.find(function(err,data) {
       if (err) {
         console.log(err);
       }
        
    callback(err,data);   
   });
    
};

exports.index = index;



/*
    function : upload
    desc : uploading stories and writing stories in file
    return : string done
*/

var upload = function(req,res,next) {

    var msg = "Unable to upload the post.";
    
    
    if (req.body.headline && req.body.description) {
        var collectedData = {
            'headline' : req.body.headline,
            'description' : req.body.description,
            'photo' : req.files.file.name,
            'story_by' : req.user.name || 'Admin'
        };
        var storyData = new post(collectedData);
        storyData.save(function(err, data){
            if (err) {
                console.error(err);
                //res.render('upload', { 'message': err });
                res.json({'status' : 'false', 'msg' : err});
            }else{
                console.log('Saved');
                msg = "Successfully uploaded the post.";
                res.json({'status' : 'true', 'msg' : msg});
                //res.render('upload', { 'message': msg ,'email' : req.session.email});
            }
        });
    }
    
    
    
};
exports.upload = upload;



