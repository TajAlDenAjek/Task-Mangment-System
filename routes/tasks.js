const path=require('path');
const express=require('express');
const router=express.Router();

const {
    getDoneTasks,
    getNotDoneTasksHaveTime,
    getNotDoneTasksDontHaveTime,
    getGroupDoneTasks,
    getGroupNotDoneTasksHaveTime,
    getGroupNotDoneTasksDontHaveTime,
    createTask,
    updateTask
}=require(path.join(__dirname,'..','controllers','tasks.js'));


const isAGroupManger=require(path.join(__dirname,'..','middlewares','isGroupManger'));
const isAGroupUser=require(path.join(__dirname,'..','middlewares','isGroupUser'));


router.get('/mytasks/done',getDoneTasks);
router.get('/mytasks/notDone/haveTime',getNotDoneTasksHaveTime);
router.get('/mytasks/notDone/dontHaveTime',getNotDoneTasksDontHaveTime);
router.patch('/mytasks/updateStatus/:id',updateTask);

router.post('/group/:id/createTask',isAGroupManger,createTask);


router.get('/group/:id/done',isAGroupUser,getGroupDoneTasks);
router.get('/group/:id/notDone/haveTime',isAGroupUser,getGroupNotDoneTasksHaveTime);
router.get('/group/:id/notDone/dontHaveTime',isAGroupUser,getGroupNotDoneTasksDontHaveTime);





module.exports=router;