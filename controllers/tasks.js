const path=require('path');
const User=require(path.join(__dirname,'..','models','user.js'));
const Group=require(path.join(__dirname,'..','models','group.js'));
const Task=require(path.join(__dirname,'..','models','task.js'));

const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require(path.join(__dirname,'..','errors'));

const Time=require('date-and-time');

const getDoneTasks=async(req,res)=>
{
    const tasks=await Task.find({userId:req.user.userId,isDone:true}).sort({deadLine: -1}).populate('userId',{password: 0,token:0}).populate('groupId');
    if(!tasks)
        return res.status(StatusCodes.NO_CONTENT);
    res.status(StatusCodes.OK).json(tasks);
}

const getNotDoneTasksHaveTime=async(req,res)=>
{
    const time=Time.addHours(new Date(),Number(process.env.TIMEZONE));
    const tasks=await Task.find({userId:req.user.userId,isDone:false,deadLine:{$gt:time}}).sort({deadLine: 1}).populate('userId',{password: 0,token:0}).populate('groupId');
    if(!tasks)
        return res.status(StatusCodes.NO_CONTENT);
    res.status(StatusCodes.OK).json(tasks);
}
const getNotDoneTasksDontHaveTime=async(req,res)=>
{
    const time=Time.addHours(new Date(),Number(process.env.TIMEZONE));
    const tasks=await Task.find({userId:req.user.userId,isDone:false,deadLine:{$lte:time}}).sort({deadLine: -1}).populate('userId',{password: 0,token:0}).populate('groupId');
    if(!tasks)
        return res.status(StatusCodes.NO_CONTENT);
    res.status(StatusCodes.OK).json(tasks);
}

const createTask=async(req,res)=>
{
    if(!req?.params?.id)
        throw new BadRequestError('id not found');
    const group=await Group.findById(req.params.id);
    if(!group)
        return res.status(StatusCodes.OK).json({'message':`no group matchs the  id : ${req.params.id}`});
    if(!group.users.includes(req.body.userId))
        return res.status(StatusCodes.Ok).json({'message':`no user with  the  id in the group : ${req.body.userId}`});
    const time=Time.addHours(new Date(req.body.deadLine),Number(process.env.TIMEZONE));
    req.body.deadLine=time;
    const task=await Task.create({...req.body,groupId:req.params.id});
    res.status(StatusCodes.OK).json(task);
}

const updateTask=async(req,res)=>
{
    if(!req?.params?.id)
        throw new BadRequestError('id not found');
    let task=await Task.findById(req.params.id).populate('userId',{password: 0,token:0}).populate('groupId');
    if(!task)
        return res.status(StatusCodes.OK).json({'message':`no task matchs the  id : ${req.params.id}`})
    if(String(req.user.userId)!==String(task.userId._id))
        return res.status(StatusCodes.UNAUTHORIZED).json(`you are not allowed to update task not yours`);
    task=await Task.findByIdAndUpdate(req.params.id,{$set:{isDone:req.body.isDone}},{new:true}).populate('userId',{password: 0,token:0}).populate('groupId');
    res.status(StatusCodes.OK).json(task);
}

const getGroupDoneTasks=async(req,res)=>
{
    if(!req?.params?.id)
        throw new BadRequestError('id not found');
    const tasks=await Task.find({isDone:true,groupId:req.params.id}).sort({deadLine: -1}).populate('userId',{password: 0,token:0}).populate('groupId');
    if(!tasks)
        return res.status(StatusCodes.NO_CONTENT);
    res.status(StatusCodes.OK).json(tasks);
}

const getGroupNotDoneTasksHaveTime=async(req,res)=>
{
    if(!req?.params?.id)
        throw new BadRequestError('id not found');
    const time=Time.addHours(new Date(),Number(process.env.TIMEZONE));
    const tasks=await Task.find({groupId:req.params.id,isDone:false,deadLine:{$gt:time}}).sort({deadLine: 1}).populate('userId',{password: 0,token:0}).populate('groupId');
    if(!tasks)
        return res.status(StatusCodes.NO_CONTENT);
    res.status(StatusCodes.OK).json(tasks);
}

const getGroupNotDoneTasksDontHaveTime=async(req,res)=>
{
    if(!req?.params?.id)
        throw new BadRequestError('id not found');
    const time=Time.addHours(new Date(),Number(process.env.TIMEZONE));
    const tasks=await Task.find({groupId:req.params.id,isDone:false,deadLine:{$lte:time}}).sort({deadLine: -1}).populate('userId',{password: 0,token:0}).populate('groupId');
    if(!tasks)
        return res.status(StatusCodes.NO_CONTENT);
    res.status(StatusCodes.OK).json(tasks);
}

module.exports=
{
    getDoneTasks,
    getNotDoneTasksHaveTime,
    getNotDoneTasksDontHaveTime,
    getGroupDoneTasks,
    getGroupNotDoneTasksHaveTime,
    getGroupNotDoneTasksDontHaveTime,
    createTask,
    updateTask
};

