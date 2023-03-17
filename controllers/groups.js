const path=require('path');
const User=require(path.join(__dirname,'..','models','user.js'));
const Group=require(path.join(__dirname,'..','models','group.js'));
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require(path.join(__dirname,'..','errors'));

const createGroup=async(req,res)=>
{
    const group=await Group.create({...req.body,groupManger:req.user.userId});
    res.status(StatusCodes.CREATED).json(group);
}

const getOwnedGroups=async(req,res)=>
{
    const groups=await Group.find({groupManger:req.user.userId});
    if(!groups)
        res.status(StatusCodes.NO_CONTENT);
    res.status(StatusCodes.OK).json(groups);
}
const getJoinedGroups=async(req,res)=>
{
    const groups=await User.find({_id:req.user.userId}).select('joinedGroups');
    if(!groups)
        res.status(StatusCodes.NO_CONTENT);
    res.status(StatusCodes.OK).json(groups);
}

const deleteGroup=async(req,res)=>
{
    if(!req?.params?.id)
        throw new BadRequestError('id not found');
    let group=await Group.findById(req.params.id);
    if(!group)
        return res.status(StatusCodes.OK).json({'message':`no group matchs the  id : ${req.params.id}`});
    if(String(group.groupManger)!==String(req.user.userId))
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"You can not delete a group that is not yours"});
    // delete the users from the group
    await User.updateMany({ _id:{$in:group.users }},{$pull:{joinedGroups:group._id}});
    // delete tasks from users in the future
    // ************************************
    await Group.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({msg:"group has been deleted"});
}

const updateGroup=async(req,res)=>
{
    if(!req?.params?.id)
        throw new BadRequestError('id not found');
    let group=await Group.findById(req.params.id);
    if(!group)
        return res.status(StatusCodes.OK).json({'message':`no group matchs the  id : ${req.params.id}`});
    if(String(group.groupManger)!==String(req.user.userId))
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"You can not update a group that is not yours"});
    req.body.users = req.body.users.filter(item => item !== String(req.user.userId));
    group=await Group.findByIdAndUpdate(req.params.id, {$addToSet:{users:{$each:req.body.users}}},{new:true});
    await User.updateMany({ _id:{$in: group.users }},{$addToSet:{joinedGroups:group._id}});
    return res.status(StatusCodes.OK).json(group);
}


module.exports={createGroup,getOwnedGroups,getJoinedGroups,deleteGroup,updateGroup};