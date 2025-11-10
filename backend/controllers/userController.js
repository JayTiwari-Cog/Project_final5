import User from "../models/User.js";
import UserCreds from "../models/UserCreds.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from 'express-validator';
import { blacklistedTokens } from "../middleware/blacklisting_token.js";
export const registerUser = async (req, res) => {
    // Check express-validator results first
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name,email,phoneNumber,password,confirmPassword} = req.body;
    console.log("Inside registerUser");
    
    try{
        if(password !== confirmPassword){
            return  res.status(400).json({message: "Passwords do not match"});
        }

        if(!name || !email || !phoneNumber || !password){
            console.log(name,email,phoneNumber,password);
            return res.status(400).json({message: "All fields are required"});
        }
         const pattern=/^[a-zA-Z0-9._%+-]+@company\.com$/;
         const managerEmail = pattern.test(email);

         const existingUser= await User.findOne({
            $or: [{email}, {phoneNumber}]
         });

         if(existingUser){
            return res.status(400).json({message: "User with given email or phone number already exists"});
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
        return res.status(500).json({message: "Server error"});
    }

}
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    // Check express-validator results first
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const userDetails= await User.findOne({
            email:email
        });
        const user= await UserCreds.findOne({
            email:email
        });
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isPasswordValid= bcrypt.compareSync(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token= jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
       
 return res.status(200).json({
  token: token,
  userId: userDetails._id,
  role: userDetails.role  // Use userDetails.role instead of user.role (user is UserCreds, userDetails is User)
  });

    }
    catch(error){
        return res.status(500).json({message: "Server error"});
    }
}

export const verify = (req, res) => {
    console.log("Inside verify");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, message: 'Token is valid', userId: decoded.userId });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token controller me', error: error.message });
    }
}

export const logoutUser = async (req, res) => {

 
 const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    blacklistedTokens.add(token);
  }

  res.json({ message: 'Logged out successfully' });
};