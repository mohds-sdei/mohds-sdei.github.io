var mongoose = require('mongoose');

bcrypt = require('bcryptjs');

var schema = new mongoose.Schema({
    id : {type: Number},
    name: {type: String,  required: true},
    uname: {type: String,  required: true},
    password: {type: String,  required: true},
    age : {type: Number,  required: true},
    qualification : {type: String,  required: true},
    is_deleted : {type: Number},
    created : {type: Date, default : Date.now}
    });




//schema.methods.hash = function(password) {
//    var salt = bcrypt.genSaltSync(10);
//  return bcrypt.hashSync(password, salt);  
//};
//
//schema.methods.comparePassword = function(candidatePassword, cb) {
//    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//        if (err) return cb(err);
//        cb(null, isMatch);
//    });
//};


schema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        console.log(111);
        return next();
    }

    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err)
            return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', schema);