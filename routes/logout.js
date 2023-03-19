const path=require('path');
const express=require('express');
const router=express.Router();
const {logout}=require(path.join(__dirname,'..','controllers','logout.js'));

router.get('/',logout);


module.exports = router;
