const User=require("../models/User.js");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
require('dotenv').config();

//register user 
exports.register=async (req,res)=>{
    try {
        //get user input
        const {first_name,last_name,email,password,picture}=req.body;

        //validate user input
        if(!(email && password)){
            return res.status(400).json({message:"credentials are required"});
        }

        //check if user already exists
        const oldUser=await User.findOne({email})

        if(oldUser){
            return res.status(409).json({message:"user already exists"});
        }

        //encrypt password
        const encryptedPassword=await bcrypt.hash(password,10);

        //create user
        const user=await User.create({
            first_name,
            last_name,
            email:email.toLowerCase(),
            password:encryptedPassword,
            picture:picture
        })

        //create token
        const token=jwt.sign(
            {user_id:user._id,email},
            process.env.TOKEN_KEY,
            {expiresIn:"2h"}
        )
        console.log(user);
        // return new user and token
        res.status(201).json({message:"User registered successfully",user,token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error registering user",error:error.message});
    }
}

//login user
exports.login=async (req,res)=>{
    console.log(req.body);
    try {
        const {email,password}=req.body;

        //validate user input
        if(!(email && password)){
            return res.status(400).json({message:"credentials are required"});
        }
        
        // validate if user exists in our database
        const user=await User.findOne({email})

        if(user &&(await bcrypt.compare(password,user.password))){
            //create token
            const token=jwt.sign(
                {user_id:user._id,email},
                process.env.TOKEN_KEY,
                {expiresIn:"2h"}
            )
            //save user token
            user.token=token;

            //return user and token
            return res.status(200).json({message:"User logged in successfully",user,token});
        }   else {
            return res.status(400).json({message:"Invalid credentials"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error login user",error:error.message})
    }
}