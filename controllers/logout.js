const path=require('path');
const User=require(path.join(__dirname,'..','models','user.js'));
const { StatusCodes } = require('http-status-codes');


const logout=async(req,res)=>
{
    if(!req.user.userId)
        return res.status(StatusCodes.UNAUTHORIZED).json({"msg":"Invalid Credentials"});
    const user=await User.findByIdAndUpdate(req.user.userId,{$set:{token:''}});
    req.user.userId='';
    res.status(StatusCodes.OK).json({'msg':"logout sucessfully !"});
}

module.exports={logout};