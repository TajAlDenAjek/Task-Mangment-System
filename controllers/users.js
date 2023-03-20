const path=require('path');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require(path.join(__dirname,'..','errors'));
const User=require(path.join(__dirname,'..','models','user.js'));
const bcrypt=require('bcryptjs');
const Task=require(path.join(__dirname,'..','models','task.js'));

const getAllUsers=async(req,res)=>
{
    const users=await User.find().select(['-password','-token']);
    res.status(StatusCodes.OK).json(users);
}

const getAUser=async(req,res)=>
{
    if(!req?.params?.id)
        throw new BadRequestError('id not found');
    const user=await User.findOne({_id:req.params.id}).select(['-password','-token']);
    if(!user)
        return res.status(StatusCodes.OK).json({'message':`no user matchs the  id : ${req.params.id}`});
    res.status(StatusCodes.OK).json(user);
}
const updateUser=async(req,res)=>
{
    const authHeader = req.headers.authorization;
    const curToken = authHeader.split(' ')[1];
    if(!req?.params?.id)
        throw new BadRequestError('id not found');
    const user=await User.findOne({_id:req.params.id}).select(['token']);
    if(!user)
        return res.status(StatusCodes.OK).json({'message':`no user matchs the  id : ${req.params.id}`});
    // the user himself only can edit his/her info
    if(user.token===curToken)
    {
        if(req.body.password)
        {
            // updating the password and hash it for more security 
            const salt=await bcrypt.genSalt(10);
            const hashedPass=await bcrypt.hash(req.body.password,salt);
            req.body.password=hashedPass;
        }
        // finding the old user in the data base to update the posts with the new name
        let oldUser=await User.findById(req.params.id);
        oldUser=oldUser.name;
        // update the new name 
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true}).select(['-password']);
        //responding
        res.status(StatusCodes.OK).json(updatedUser);
    }
    else
    {
        res.status(StatusCodes.UNAUTHORIZED).json({msg:'you can update only your account'});
    }
}
const deleteUser=async(req,res)=>
{
    const authHeader = req.headers.authorization;
    const curToken = authHeader.split(' ')[1];
    if(!req?.params?.id)
        throw new BadRequestError('id not found');
    const user=await User.findOne({_id:req.params.id});
    if(!user)
        return res.status(StatusCodes.OK).json({'message':`no user matchs the  id : ${req.params.id}`});
    // the user himself only can edit his/her info
    if(user.token===curToken)
    {
        // delete user 
        await User.findByIdAndDelete(req.params.id);
        await Task.deleteMany({ userId:req.params.id});
        res.status(StatusCodes.OK).json({msg:"account has been deleted"})
    }
    else
    {
        res.status(StatusCodes.UNAUTHORIZED).json({msg:'you can delete only your account'});
    }
}




module.exports={getAllUsers,getAUser,updateUser,deleteUser};