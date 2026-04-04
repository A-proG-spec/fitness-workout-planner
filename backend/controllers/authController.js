import User from '../models/User';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import{
    ACCESS_TOKEN_EXPIRE_DATE,
    ACCESS_TOKEN_PRIVATE_KEY,
    REFRESH_TOKEN_EXPIRE_DATE,
    REFRESH_TOKEN_PRIVATE_KEY,
    REFRESH_TOKEN_PUBLIC_KEY,
} from '../config/env';

export const signUp=async(req,res,next)=>{
    try{
     const {name,
            email,
            password,
            gender,
            dateOfBirth,
            height,
            fitnessGoal}=req.body
        if(!name||!email||!password||!gender||!dateOfBirth||!height||!fitnessGoal){
            const error=new Error("All informations are required");
            error.statuscode=400;
            throw error;
        }

        const emailExist=await User.findOne({email});
        if(emailExist){
            const error= new Error("Email already exists");
            error.statusCode=409;
            throw error;
        }
        if(password.length < 8){
            const error=new Error("Not strong password");
            error.statusCode=409;
            throw error;
        }
        const hashed_password=await bcrypt.hash(password,10);

        const newUser= await User.create({
            name,
            email,
            password:hashed_password,
            gender,
            dateOfBirth,
            height,
            fitnessGoal
        });
        const access_token= jwt.sign(
            {user_id:newUser._id},
            ACCESS_TOKEN_PRIVATE_KEY,
            {
                algorithm:'RS256',
                expiresIn:ACCESS_TOKEN_EXPIRE_DATE,
            },
        );
        const refresh_token=jwt.sign(
            {user_id:newUser._id},
            REFRESH_TOKEN_PRIVATE_KEY,
            {
                algorithm:'RS256',
                expiresIn:REFRESH_TOKEN_EXPIRE_DATE,
            }
        );
        res.cookie("access_token",access_token,{
            maxAge:60000 * 15,
            sameSite:'lax',
            httpOnly:true,
            secure:false,
        });
        res.cookie("refresh_token",refresh_token,{
            maxAge:60000 * 60 *24 *7,
            sameSite:'lax',
            httpOnly:true,
            secure:false,
        });
        const hashed_refresh_token=crypto
                  .createHash("sha256")
                  .update(refresh_token)
                  .digest("hex");
        let expireAt=new Date();
        expireAt.setDate(expireAt.getDate()+ 7);
        await refresh_token.create({
            user_id:newUser._id,
            refresh_token:hashed_refresh_token,
            expireAt,
        });
        const newUserObj=newUser.toObject();
        delete newUserObj.password;
        res.status(201).json({
            success:true,
            message:"Sign Up Successfully",
            data:{
                user:newUserObj,
                access_token,
                refresh_token
            }
        });
    }catch(err){
        next(err);
    }
}


export const logIn=async(req,res,next)=>{
    try{
         const {email,password}=req.body;
         if(!email||!password){
            const error=new Error("Insert required information please");
            error.statusCode=400;
            throw error;
         }
         const user=await User.findOne({email});


         if(!user){
            const error=new Error("User didn't exist");
            error.statusCode=400; 
             throw error
         }

         if(!user.isActive){
             return res.status(401).json({
                success:false,
                
             })
         }
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            const error=new Error("Invalid Credintials");
            error.statusCode=401;
            throw error;
        }
        const access_token=jwt.sign(
            {user_id:user._id},
            ACCESS_TOKEN_PRIVATE_KEY,
            {
                algorithm:'RS256',
                expiresIn:ACCESS_TOKEN_EXPIRE_DATE,
            },    
        );
        const refresh_token=jwt.sign(
            {user_id:user._id},
            REFRESH_TOKEN_PRIVATE_KEY,
            {algorithm:'RS256',
                expiresIn:REFRESH_TOKEN_EXPIRE_DATE,
            }
        );
        res.cookie("access_token",access_token,{
            maxAge:60000 * 15,
            sameSite:'lax',
            httpOnly:true,
            secure:false,
        });
        res.cookie("refresh_token",refresh_token,{
            maxAge:60000 * 60*24*7,
            sameSite:'lax',
            httpOnly:true,
            secure:false,
         });
         let expireAt=new Date();
         expireAt.setDate(expireAt.getDate()+7);

         const hashed_refresh_token=crypto
                  .createHash("sha256")
                  .update(refresh_token)
                  .digest("hex");
        await refresh_token.create({
            user_id:user._id,
            refresh_token:hashed_refresh_token,
            expireAt
        })

        const userloged=user.toObject();
        delete userloged.password;
        res.status(200).json({
            success:true,
            message:"Logged in successfully",
        data:{
            user:userloged,
            refresh_token,
            access_token
         }
            
        })
        
    }catch(err){
        next(err)
    }
};

const logOut=async(req,res,next)=>{
    try{
       const user=await user.findOne({email});

if(!user){
    return res.status(400).json({
        error:"User dosen't exist"
    })
}
    res.status(200).
    clearCookie("access_token")
    .clearCookie("refresh_token")
    .json({   
         success:true,
         message:"Logged out successfully"
    })


    }catch(err){
        next(err);
    }
}

