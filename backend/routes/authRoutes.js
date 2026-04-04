import express from 'express';
import { signUp,logIn,logOut,changePassword,refreshAcessToken,getCurrentUser }  from '../controllers/authController.js';

const router=express.Router();

router.post('/register',signUp);
router.post('/login',logIn);
router.post('/logout',logOut);
router.post('/change-password',changePassword);
router.get('/me',getCurrentUser);
router.post('/refresh-token',refreshAcessToken);
export default router;