const path=require('path');
const express=require('express');
const router=express.Router();

const {createGroup,getOwnedGroups,getJoinedGroups,deleteGroup,updateGroup}=require(path.join(__dirname,'..','controllers','groups.js'));

router.post('/create',createGroup);
router.get('/myGroups',getOwnedGroups)
router.get('/joinedGroups',getJoinedGroups);
router.delete('/:id',deleteGroup);
router.patch('/:id',updateGroup);

module.exports=router;
