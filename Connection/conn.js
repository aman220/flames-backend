const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.DB_STRING).then(()=>{
    console.log("my db is connect")
}).catch((error)=>{
    console.log("problem in connect" ,error)
})