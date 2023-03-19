const path=require('path');
const User=require(path.join(__dirname,'..','models','user.js'));
const { StatusCodes } = require('http-status-codes');


const logout=async(req,res)=>
{
    const user=await User.findByIdAndUpdate(req.user.userId,{$set:{token:''}});
    res.status(StatusCodes.OK).json({'msg':"logout sucessfully !"});
}

module.exports={logout};