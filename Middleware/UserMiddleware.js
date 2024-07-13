const UserModel = require("../Models/UserSchema");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { tokenVerify } = require("./JwtVerify");
require('dotenv').config()
const axios = require("axios")

exports.createUser = async (req, res) => {
    const { Username, Email, PhoneNumber, Password } = req.body;

    try {
        const exestinguser = await UserModel.findOne({ Email: Email });
        if (exestinguser) {
            return res.status(501).json({ message: "user has already register" })
        }

        const newpassword = await bcrypt.hash(Password, 10);
        const response = await UserModel.create({
            Username: Username,
            Email: Email,
            PhoneNumber: PhoneNumber,
            Password: newpassword
        });
        res.status(201).json({ message: "user create sucess", response });
    } catch (error) {
        res.status(501).json({ error: error.message })
    }
}

exports.LoginUser = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const response = await UserModel.findOne({ Email: Email })
        if (response) {
            const pass = response.Password;
            const chack = await bcrypt.compare(Password, pass);
            console.log(chack)
            if (chack == true) {
                const token = jwt.sign({ response }, process.env.PRIVATE_KEY, { expiresIn: '5hr' })

                return res.cookie('authtoken', token, { httpOnly: true, secure: true }).status(200).json({ message: "bhai shaab welcome", token })
            }
            return res.status(501).json({ message: "password mismatch" })
        }
        return res.status(501).json({ message: "user not found" })
    } catch (error) {
        res.status(501).json({ message: "bhai shaab system khrb hai" })
    }
}


exports.Getuser = async (req, res) => {
    const { aman } = req.query;
    // const Token = req.headers.authtoken;
    try {
        //i am using verifytoken to verify the toke you this

        const response = await UserModel.findOne({ _id: aman });



        res.status(404).json({ message: response })
    } catch (error) {
        res.status(501).json({ message: "error occured" })
    }
}


exports.CreateOrder = async(req,res)=>{
    const {client_txn_id , amount ,p_info , customer_name ,customer_email ,customer_mobile , redirect_url } =  req.body;
    try {
        const apiendpoint = "https://api.ekqr.in/api/create_order"
        const apikey = process.env.PAYMENTAPI
        const postData = {
            key : apikey,
            client_txn_id : client_txn_id,
            amount : amount,
            p_info: p_info ,
            customer_name: customer_name,
            customer_email : customer_email,
            customer_mobile: customer_mobile,
            redirect_url:redirect_url
        }
        const response = await axios.post(apiendpoint , postData);
        res.status(200).json(response.data)
    } catch (error) {
        res.status(501).json({error: error.message})   
    }
}