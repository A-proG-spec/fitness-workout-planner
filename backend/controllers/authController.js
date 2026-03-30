import User from '../models/User';
import bcrypt from 'bcrypt';
import crypto from ' crypto';
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
        if(!name||!email||!password||!gender||dateOfBirth||!height||!fitnessGoal){
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
         const emailExist=await User.findOne({email});
         if(!emailExist){
            const error=new Error("User didn't exist");
            error.statusCode=400; 
             throw error
            }
    }catch(err){
        next(err)
    }
}

