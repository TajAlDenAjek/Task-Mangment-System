const path=require('path');
const express=require('express');
const router=express.Router();
const {registerController,loginController}=require(path.join(__dirname,'..','controllers','auth.js'));

router.post('register',registerController);
router.post('login',loginController);