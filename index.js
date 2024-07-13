const express = require("express");
const UserRotes = require("./Routes/UserRotes");
const app = express();
const bodyparser = require("body-parser");
require("./Connection/conn")
const cookieParser = require('cookie-parser')
const corsa =  require("cors")
require('dotenv').config();



app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieParser())

// parse application/json
app.use(bodyparser.json())
app.use(corsa())



app.use(UserRotes)

app.listen(process.env.PORT, ()=>{
    console.log(`my server is running on port no ${process.env.PORT}`)
} )