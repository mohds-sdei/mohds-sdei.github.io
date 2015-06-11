var mongoose = require('mongoose');

bcrypt = require('bcryptjs');


var ProductSchema = new mongoose.Schema({
    name: {type: String,  required: true},
    detail: {type: String},
    photo: {type: String},
    category_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategory_id : { type: mongoose.Schema.Types.ObjectId, ref: 'subCategory' },
    is_deleted : {type: Number,default : 0},
    created : {type: Date, default : Date.now}
    });

module.exports = mongoose.model('Product', ProductSchema);