const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.tokenVerify= (Token)=>{
    return jwt.verify(Token , process.env.PRIVATE_KEY)
}