const express = require("express");
const { createUser, LoginUser, Getuser, CreateOrder } = require("../Middleware/UserMiddleware");
const UserRotes = express.Router();

UserRotes.post('/signup', createUser ) // middeware dfunction
UserRotes.post('/signin' , LoginUser)
UserRotes.get('/getuser' , Getuser)
UserRotes.post('/paymentcreate' , CreateOrder)

module.exports = UserRotes;