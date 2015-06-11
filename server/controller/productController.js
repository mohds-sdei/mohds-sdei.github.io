var express = require('express');
var fs = require('fs');
var util = require('util');
var user = require('../models/Users.js');
var post = require('../models/Post.js');
var category = require('../models/Category.js');
var product = require('../models/Product.js');

var fetchCategories = function (req,res,next) {
    category.find(function (err, data) {
        if (err) {
            console.error(err);
            res.json({'status' : false, 'msg' : 'Unable to save the data.','data' : null});
        }else{
            res.json({'status' : true, 'msg' : 'Successfully fetched the data.','data' : data});
        }
    }); 
};
exports.fetchCategories = fetchCategories;



var fetchSubCategory = function (req,res,next) {
    
    category.findById(req.params.id,function (err, data) {
        if (err) {
            console.error(err);
            res.json({'status' : false, 'msg' : 'Unable to save the data.','data' : null});
        }else{
            res.json({'status' : true, 'msg' : 'Successfully fetched the data.','data' : data});
        }
    }); 
};
exports.fetchSubCategory = fetchSubCategory;



var addCategory = function (req,res,next) {
    var catData = new category(req.body);
    if (!req.body) {
        res.json({'status' : false, 'msg' : 'Data missing.'});
    } else {
        catData.save(function(err, data){
               if (err) {
                   console.error(err);
                   res.json({'status' : false, 'msg' : 'Unable to save the data.'});
               }else{
                  
                   res.json({'status' : true, 'msg' : 'Successfully saved the data.'});
               }
        });
    }
};
exports.addCategory = addCategory;


var addSubCategory = function (req,res,next) {
    //var catData = new category(req.body);
    if (!req.body) {
        res.json({'status' : false, 'msg' : 'Data missing.'});
    } else {
        var category_id = req.body.category_id;
        delete req.body.category_id;;
        category.findByIdAndUpdate(
            category_id,
            {$push: {subCategory: req.body}},
            {safe: true},
            function(err, data) {
                if (err) {
                   console.error(err);
                   res.json({'status' : false, 'msg' : 'Unable to save the data.'});
               }else{
                  
                   res.json({'status' : true, 'msg' : 'Successfully saved the data.'});
               }
            }
        );
    }
};
exports.addSubCategory = addSubCategory;



var addProduct = function (req,res,next) {
    
    //console.log(req.body);return false;
    
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
        product.findByIdAndUpdate(query, { $set: req.body },{upsert:true, new: true}, function(err, doc){
            if (err) { console.error(err); return res.json({'status' : false, 'msg' : 'Unable to save the data.'});}
            
            return res.json({'status' : true, 'msg' : 'Successfully saved the data.'});
        });
    } else {
        var productData = new product(req.body);
        productData.save(function(err, data){
            if (err) {
                console.error(err);
                res.json({'status' : false, 'msg' : 'Unable to save the data.'});
            }else{
                res.json({'status' : true, 'msg' : 'Successfully saved the data update.'});
            }
        });   
    }
};
exports.addProduct = addProduct;

var fetchProducts = function (req,res,next) {
    product.find(function (err, data) {
        if (err) {
            console.error(err);
            res.json({'status' : false, 'msg' : 'Unable to fetch the data.','data' : null});
        }else{
            res.json({'status' : true, 'msg' : 'Successfully fetched the data.','data' : data});
        }
    }).populate([{path:'category_id', select:'name'}]);
    
};
exports.fetchProducts = fetchProducts;


var fetchProduct = function (req,res,next) {
    product.findById(req.params.id,function (err, data) {
        if (err) {
            console.error(err);
            res.json({'status' : false, 'msg' : 'Unable to fetch the data.','data' : null});
        }else{
            res.json({'status' : true, 'msg' : 'Successfully fetched the data.','data' : data});
        }
    }).populate([{path:'category_id', select:'name'}]);
    
};
exports.fetchProduct = fetchProduct;



var fetchIndividualSubCategory = function (req,res,next) {
    
    category.findOne({'subCategory._id' : req.params.id},function (err, data) {
        if (err) {
            console.error(err);
            res.json({'status' : false, 'msg' : 'Unable to save the data.','data' : null});
        }else{
            res.json({'status' : true, 'msg' : 'Successfully fetched the individual sub category data.','data' : data});
        }
    }); 
};
exports.fetchIndividualSubCategory = fetchIndividualSubCategory;


