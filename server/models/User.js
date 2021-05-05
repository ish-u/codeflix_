const mongoose = require('mongoose');

const reqStr = {
    type:String,
    required : true
};

const User = mongoose.Schema({
    Name:reqStr,
    Email:reqStr,
    Username:reqStr,
    Age:reqStr,
    Role:String,
    Password:reqStr
})

module.exports = mongoose.model('user', User);
