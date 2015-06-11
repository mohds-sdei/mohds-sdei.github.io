var mongoose = require('mongoose');

bcrypt = require('bcryptjs');


var SubCategorySchema = new mongoose.Schema({
    name: {type: String,  required: true},
    detail: {type: String},
    is_deleted : {type: Number,default : 0},
    created : {type: Date, default : Date.now}
    });


var CategorySchema = new mongoose.Schema({
    name: {type: String,  required: true},
    detail: {type: String},
    subCategory : [SubCategorySchema],
    is_deleted : {type: Number,default : 0},
    created : {type: Date, default : Date.now}
    });

exports.subCategory = mongoose.model('Category.subCategory', SubCategorySchema);
module.exports = mongoose.model('Category', CategorySchema);