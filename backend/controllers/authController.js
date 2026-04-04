import User from '../models/User.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import{
    ACCESS_TOKEN_EXPIRE_DATE,
    ACCESS_TOKEN_PRIVATE_KEY,
    REFRESH_TOKEN_EXPIRE_DATE,
    REFRESH_TOKEN_PRIVATE_KEY,
    REFRESH_TOKEN_PUBLIC_KEY,
} from '../config/env.js';

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

export const logOut=async(req,res,next)=>{
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

export const refreshAcessToken=async(req,res,next)=>{
    try{
        const refresh_token=req.cookies.refresh_token;

     if(!refresh_token){
        const error =new Error("Refresh token not  provided");
        error.statusCode=401;
        throw error;
     }

     const hashed_token=crypto
             .createHash("sha256")
             .update(refresh_token)
             .digest("hex");

    const storedToken=await refresh_token.findOne({
        refresh_token:hashed_token,
        revoked:false,
        expireAt:{$gt:new Date()}
    });
    if(!storedToken){
        const error =new Error("Invalid refresh token");
        error.statusCode=401;
        throw error;
    }

    const decode=jwt.verify(refresh_token,REFRESH_TOKEN_PUBLIC_KEY);

    const new_access_token=jwt.sign(
        {user_id:decode.user_id},
        ACCESS_TOKEN_PRIVATE_KEY,
        {
            algorithm:'RS256',
            expiresIn:ACCESS_TOKEN_EXPIRE_DATE,
        }
    )
    res.cookie("access_token",new_access_token,{
        maxAge:60000 * 15,
        sameSite:'lax',
        httpOnly:true,
        secure:false,
    });
    res.status(200).json({
        success:true,
        access_token:new_access_token
    })
    }catch(err){
        next(err);
    }
}


export const changePassword=async(req,res,next)=>{
    try{
         const {currentPassword,newPassword}=req.body;
         const userId=req.user._id;
         if(!currentPassword||!newPassword){
            const error=new Error("Insert required information");
            error.statusCode=400;
            throw error;
         }
         const user=await User.findById(userId);
         if(!user){
            const error=new Error("User not found");
            error.statusCode=404;
            throw error;
         }

         const isMatch=await bcrypt.compare(currentPassword,user.password);
           if(!isMatch){
               const error=new Error("Current password is incorrect");
               error.statusCode=401;
               throw error;
           }
           if(newPassword.length<8){
            const error =new Error("password must be at least 8 characters");
            error.statusCode=400;
            throw error;
           }

           const isSamePassword=await bcrypt.compare(newPassword,user.password);
           if(!isSamePassword){
                const error=new Error("New Password must be different from current password");
                error.statusCode=400;
                throw error;
           }

      user.password=await bcrypt.hash(newPassword,10);   
      await user.save();
      
      await refresh_token.updateMany(
        {user_id:userId},
        {revoked:true}
      ) ;
      res.status(200).json({
        success:true,
        message:"Password changed successfully.Please login again with your new password",
       
      })  
    }catch(err){
        next(err);
    }
}

export const forgetPassword=async(req,res,next)=>{
    try{
        const {email}=req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"If your email exists,you will recieve a reset password link"
            });
        }
        const resetToken=crypto.randomBytes(32).toString("hex");
        const hashedResetToken=crypto
                  .createHash("sha256")
                  .update(resetToken)
                  .digest("hex");
                
        // Save to database (expires in 1 hour)
        user.reset_password_token = hashedResetToken;
        user.reset_password_expires = Date.now() + 3600000;
        await user.save();

        // Send email (implement with nodemailer)
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        await sendResetEmail(user.email, resetUrl);

        res.status(200).json({
            success: true,
            message: "Password reset email sent"
        });

    } catch (err) {
        next(err);
    }
};

// Reset password
export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            reset_password_token: hashedToken,
            reset_password_expires: { $gt: Date.now() }
        });

        if (!user) {
            const error = new Error("Invalid or expired reset token");
            error.statusCode = 400;
            throw error;
        }

        // Update password
        user.password = await bcrypt.hash(newPassword, 10);
        user.reset_password_token = undefined;
        user.reset_password_expires = undefined;
        await user.save();

        // Revoke all refresh tokens
        await RefreshToken.updateMany(
            { user_id: user._id },
            { revoked: true }
        );

        res.status(200).json({
            success: true,
            message: "Password reset successful. Please login."
        });

    }catch(err){
        next(err);
    }
}



export const getCurrentUser = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: { user }
        });

    } catch (err) {
        next(err);
    }
};