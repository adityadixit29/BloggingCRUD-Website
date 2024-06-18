import {User} from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";




export const login = async (req,res,next)=>{
   try {
    const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password");
    
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(404).json({
            success:false,
            message: "Invalid email or password"
        });
    }

    sendCookie(user,res,`Welcome Back :), ${user.name}`,200);
   } catch (error) {
    next(error)
   }
};

export const register = async (req,res,next)=>{
   try {
    const {name,email,password} = req.body;

    let user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler("User already exist",400));
    }
    const hashedpassword = await bcrypt.hash(password,10);

    user = await User.create({name,email,password:hashedpassword});
    
    sendCookie(user,res,"Registered Successfully", 201);
   } catch (error) {
    next(error)
   }
};

export const getMyProfile = async (req,res)=>{

    res.status(201).json({
        success:true,
        user:req.user,
    })

};

export const logout = async (req,res)=>{
   
    res.cookie("token","null",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
       }).json({
        message:"Logged out successfully"
       })
};