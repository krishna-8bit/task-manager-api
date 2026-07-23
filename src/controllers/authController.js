import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function register(req,res){
    try{
        const {name, email, password}=req.body;
        const existingUser =await User.findOne({email}); 
        if(existingUser){
            return res.status(409).json({
                message : "This email already registered"
            })
        }
        const user=new User({
            name,
            email,
            password
        });

        await user.save();

        res.status(201).json({
            message : "User registered successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message : "Something went wrong",
            error : error.message
        });
    }
}

export async function login(req,res){
    try{
        const {email, password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message : "Incorrect email or password"
            });
        }
        
        const ismatch=await bcrypt.compare(password,user.password);

        if(!ismatch){
            return res.status(401).json({
                message : "Incorrect email or password"
            });
        }
        const token=jwt.sign(
            {
                id : user._id,
                email : user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "1h"
            }
        )

        return res.status(200).json({
            message : "Login successful",
            token
        });
        
    }
    catch(error){
        res.status(500).json({
            message : "Something went wrong",
            error : error.message
        });
    }
}