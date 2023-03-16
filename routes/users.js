const path=require('path');
const express=require('express');
const router=express.Router();

const {getAllUsers,getAUser,updateUser,deleteUser}=require(path.join(__dirname,'..','controllers','users.js'));

router.get('/all',getAllUsers);
router.get('/:id',getAUser);
router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);

module.exports=router;