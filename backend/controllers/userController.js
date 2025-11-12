import User from "../models/User.js";
import UserCreds from "../models/UserCreds.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from 'express-validator';
import Blacklist from "../models/BlackList.js";
import BlackList from "../models/BlackList.js";

export const registerUser = async (req, res, next) => {
    // Check express-validator results first
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name,email,phoneNumber,password,confirmPassword} = req.body;
    console.log("Inside registerUser");
    
    try{
        if(password !== confirmPassword){
            const error = new Error("Passwords do not match");
            error.statusCode = 400;
            return next(error);
        }

        if(!name || !email || !phoneNumber || !password){
            console.log(name,email,phoneNumber,password);
            const error = new Error("All fields are required");
            error.statusCode = 400;
            return next(error);
        }
         const pattern=/^[a-zA-Z0-9._%+-]+@company\.com$/;
         const managerEmail = pattern.test(email);

         const existingUser= await User.findOne({
            $or: [{email}, {phoneNumber}]
         });

         if(existingUser){
            const error = new Error("User with given email or phone number already exists");
            error.statusCode = 400;
            return next(error);
         }

         const user= await User.create({
            name,
            email,
            phoneNumber,
            role: managerEmail ? 'manager' : 'user'
         });
        const userCreds= await UserCreds.create({
            email,
            password:bcrypt.hashSync(password,10)
         });
        
         return res.status(201).json({message: "User registered successfully", userId: user._id});
    }
    catch(error){
        error.statusCode = 500;
        next(error);
    }

}
export const loginUser = async (req, res, next) => {
    const {email, password} = req.body;
    // Check express-validator results first
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        if(!email || !password){
            const error = new Error("All fields are required");
            error.statusCode = 400;
            return next(error);
        }
        const userDetails= await User.findOne({
            email:email
        });
        const user= await UserCreds.findOne({
            email:email
        });
        if(!user){
            const error = new Error("Invalid email or password");
            error.statusCode = 400;
            return next(error);
        }
        const isPasswordValid= bcrypt.compareSync(password,user.password);
        if(!isPasswordValid){
            const error = new Error("Invalid email or password");
            error.statusCode = 400;
            return next(error);
        }
        const token= jwt.sign({userId:user._id,role:userDetails.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
       
 return res.status(200).json({
  token: token,
  userId: userDetails._id,
  role: userDetails.role  // Use userDetails.role instead of user.role (user is UserCreds, userDetails is User)
  });

    }
    catch(error){
        error.statusCode = 500;
        next(error);
    }
}

// 

 

export const logout = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        const error = new Error("No token provided");
        error.statusCode = 401;
        return next(error);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const blackListedToken = await BlackList.create({
            token: token,
        })
        return res.status(200).json({ message: 'Logged out successfully' });


}catch (error) {   
    error.statusCode = 500;
    next(error);
    }
}
