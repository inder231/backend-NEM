const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/UserModel");
const loginRouter = express.Router();


loginRouter.post("/",[
    check("email","Please provide valid email").isEmail(),
    check("password","Please provide password atleast 8 characters long").isLength({min:8})
],async (req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send({
                msg:errors.array()[0].msg
            })
        }
        const {email,password} = req.body;
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).send({success:false,message:"User not found, Please Signup."})
        }
        const hashedPass = user.password;
        bcrypt.compare(password,hashedPass,(err,result)=>{
            console.log(err,result);
            if(err||result===false){
                return res.status(404).send({success:false,message:"Wrong Password!"})
            }
            const token = jwt.sign({email},process.env.SECRET_KEY,{expiresIn:3600});
            return res.status(200).send({success:true,token:token})
        })
    } catch (error) {
        return res.status(500).send({success:false,message:"Something went wrong"+error})
    }
})
module.exports = {loginRouter}
