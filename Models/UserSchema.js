const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    Username :{
        type:String,
        required:true,
        trim:true,
    },
    Email:{
        type:String,
        required:true,
        trim:true,
    },
    PhoneNumber :{
        type:Number,
        required:true,
    },
    Password:{
        type:String,
        required:true,
        trime:true,
    }
})

const UserModel = mongoose.model("User" , UserSchema);

module.exports = UserModel;