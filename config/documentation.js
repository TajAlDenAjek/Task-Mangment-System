const { group } = require('console');
const path=require('path');
const reg_login_logout=require(path.join(__dirname,'docs','reg_login_logout'));
const users=require(path.join(__dirname,'docs','users'));
const groups=require(path.join(__dirname,'docs','groups'));
const tasks=require(path.join(__dirname,'docs','tasks.js'));
const swaggerDocument=
{
    openapi:"3.0.0",
    info:{
        title:"Task Mangment System Api",
        version:"0.8",
        description:"Documentation of the api .."
    },
    servers:[
        {
            url:String(process.env.SERVER_SIDE_URL),
            description:"local dev server"
        }
    ],
    paths:{
        "/api/auth/register":{
            post:reg_login_logout.register
        },
        "/api/auth/login":{
            post:reg_login_logout.login
        },
        "/api/logout/":{
            get:reg_login_logout.logout
        },
        "/api/users/all":{
            get:users.getAll
        },
        "/api/users/{id}":{
            get:users.getOneById,
            patch:users.updateInfo,
            delete:users.deleteById
        },
        "/api/groups/create":{
            post:groups.createGroup
        },
        "/api/groups/myGroups":{
            get:groups.getOwnedGroups
        },
        "/api/groups/joinedGroups":{
            get:groups.getJoinedGroups
        },
        "/api/groups/{id}":{
            patch:groups.updateGroupInfo,
            delete:groups.deleteGroup
        },
        "/api/tasks/mytasks/done":{
            get:tasks.getDoneTasks
        },
        "/api/tasks/mytasks/notDone/haveTime":{
            get:tasks.getNotDoneTasksWithTime
        },
        "/api/tasks/mytasks/notDone/dontHaveTime":{
            get:tasks.getNotDoneTasksNoTime
        },
        "/api/tasks/mytasks/updateStatus/{id}":{
            patch:tasks.updateTask
        },
        "/api/tasks/group/{id}/createTask":{
            post:tasks.createTask
        },
        "/api/tasks/group/{id}/done":{
            get:tasks.groupDoneTasks
        },
        "/api/tasks/group/{id}/notDone/haveTime":{
            get:tasks.gropuNotDoneTasksWithTime
        },
        "/group/{id}/notDone/dontHaveTime":{
            get:tasks.groupNotDoneTasksNoTime
        }
    }
}


module.exports=swaggerDocument;