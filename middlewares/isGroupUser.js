const path=require('path');
const User=require(path.join(__dirname,'..','models','user.js'));
const Group=require(path.join(__dirname,'..','models','group.js'));
const { UnauthenticatedError } = require(path.join(__dirname,'..','errors','unauthenticated'));
const {StatusCodes}=require('http-status-codes');


const isAGroupUser=async(req,res,next)=>
{
    const group=await Group.findById(req.params.id);
    if(String(group.groupManger)!==String(req.user.userId)&&!group.users.includes(String(req.user.userId)))
        return res.status(StatusCodes.UNAUTHORIZED).json(`you are not allowed to show tasks in a group you are not in`);
    next();
}

module.exports=isAGroupUser;