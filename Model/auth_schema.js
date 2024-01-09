//Schema of DB

const mongoose = require('mongoose');

const user = new  mongoose.Schema({
    name:{
        type: String, 
        require: true
    },

    email:{
        type: String, 
        require: true
    },
    password:{
        type: String, 
        require: true
    },
    token:{
        type: String,
    }

    
});


const User = mongoose.model('User', user);

module.exports = User;