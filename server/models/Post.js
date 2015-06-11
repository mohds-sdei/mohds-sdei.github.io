var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    id : {type: Number},
    user_id : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    headline: {type: String,  required: true},
    description: {type: String,  required: true},
    photo: {type: String,  required: true},
    story_by : {type: String,  required: true},
    is_deleted : {type: Number},
    created : {type: Date, default : Date.now}
    });
module.exports = mongoose.model('Post', schema);
