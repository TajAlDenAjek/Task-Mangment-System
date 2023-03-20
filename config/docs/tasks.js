const createTask={
    tags:["Tasks"],
    description:`create task</br >
    you must be authorized </br>
    <h3> Note : send token in bearer && here we need the group id </h3>
    `,
    security: [{
        bearerAuth: []
    }],
    parameters:[
        {
          "name": "id",
          "in": "query",
          "type": "string",
          "required": true
        }
    ],
    requestBody:{
        required:true,
        content:{
            "application/json":{
                schema:{
                    type:"Object",
                    example:{
                        "desc":"eat two potato",
                        "deadLine":"2023-03-20T12:25:00.000",
                        "userId":"64181c3a992085f3817b7c87"
                    }
                }
            }
        },
    },
    responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"Object",
                        example:{ 
                            "desc": "eat two potato",
                            "isDone": false,
                            "deadLine": "2023-03-20T12:25:00.000Z",
                            "userId": "64181c3a992085f3817b7c87",
                            "groupId": "641825b505f1b22ce9d7717c",
                            "_id": "6418266805f1b22ce9d7718d",
                            "__v": 0      
                        }
                    }
                }
            }
        },
    }
}


const getDoneTasks={
    tags:["Tasks"],
    description:`get the done tasks for a user</br >
    you must be authorized </br>
    <h3> Note : send token in bearer </h3>
    `,
    security: [{
        bearerAuth: []
    }],
    responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"Object",
                        example:{
                            arrayOfTasks:[
                                {
                                    "_id": "6418266805f1b22ce9d7718d",
                                    "desc": "eat two potato",
                                    "isDone": true,
                                    "deadLine": "2023-03-20T12:25:00.000Z",
                                    "userId": {
                                    "_id": "64181c3a992085f3817b7c87",
                                    "name": "potato",
                                    "email": "potato1@email.com",
                                    "img": "",
                                    "joinedGroups": [
                                        "641825b505f1b22ce9d7717c"
                                    ],
                                    "__v": 0
                                    },
                                    "groupId": {
                                    "_id": "641825b505f1b22ce9d7717c",
                                    "groupName": "potato group",
                                    "groupManger": "64181b4e95927b395bb12feb",
                                    "users": [
                                        "64181c3a992085f3817b7c87"
                                    ],
                                    "__v": 0
                                    },
                                    "__v": 0
                                }
                            ]       
                        }
                    }
                }
            }
        },
    }
}

const getNotDoneTasksNoTime={
    tags:["Tasks"],
    description:`get the unfinished tasks for a user and the time is over</br >
    you must be authorized </br>
    <h3> Note : send token in bearer </h3>
    `,
    security: [{
        bearerAuth: []
    }],
    responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"Object",
                        example:{  
                            arrayOfTasks:[
                                {
                                    "_id": "6418266805f1b22ce9d7718d",
                                    "desc": "eat two potato",
                                    "isDone": false,
                                    "deadLine": "2023-03-20T12:25:00.000Z",
                                    "userId": {
                                    "_id": "64181c3a992085f3817b7c87",
                                    "name": "potato",
                                    "email": "potato1@email.com",
                                    "img": "",
                                    "joinedGroups": [
                                        "641825b505f1b22ce9d7717c"
                                    ],
                                    "__v": 0
                                    },
                                    "groupId": {
                                    "_id": "641825b505f1b22ce9d7717c",
                                    "groupName": "potato group",
                                    "groupManger": "64181b4e95927b395bb12feb",
                                    "users": [
                                        "64181c3a992085f3817b7c87"
                                    ],
                                    "__v": 0
                                    },
                                    "__v": 0
                                }
                            ]      
                        }
                    }
                }
            }
        },
    }
}
const getNotDoneTasksWithTime={
    tags:["Tasks"],
    description:`get the unfinished tasks for a user and still in the queue </br >
    you must be authorized </br>
    <h3> Note : send token in bearer </h3>
    `,
    security: [{
        bearerAuth: []
    }],
    responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"Object",
                        example:{
                            arrayOfTasks:[
                                {
                                    "_id": "6418266805f1b22ce9d7718d",
                                    "desc": "eat two potato",
                                    "isDone": false,
                                    "deadLine": "2023-03-20T12:25:00.000Z",
                                    "userId": {
                                    "_id": "64181c3a992085f3817b7c87",
                                    "name": "potato",
                                    "email": "potato1@email.com",
                                    "img": "",
                                    "joinedGroups": [
                                        "641825b505f1b22ce9d7717c"
                                    ],
                                    "__v": 0
                                    },
                                    "groupId": {
                                    "_id": "641825b505f1b22ce9d7717c",
                                    "groupName": "potato group",
                                    "groupManger": "64181b4e95927b395bb12feb",
                                    "users": [
                                        "64181c3a992085f3817b7c87"
                                    ],
                                    "__v": 0
                                    },
                                    "__v": 0
                                }
                            ]        
                        }
                    }
                }
            }
        },
    }
}
const updateTask={
    tags:["Tasks"],
    description:`update a task state </br >
    you must be authorized </br>
    <h3> Note : send token in bearer && here we need the task id </h3>
    `,
    security: [{
        bearerAuth: []
    }],
    parameters:[
        {
          "name": "id",
          "in": "query",
          "type": "string",
          "required": true
        }
    ],
    requestBody:{
        required:true,
        content:{
            "application/json":{
                schema:{
                    type:"Object",
                    example:{
                        "isDone":true
                    }
                }
            }
        },
    },
    responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"Object",
                        example:{ 
                            "_id": "6418266805f1b22ce9d7718d",
                            "desc": "eat two potato",
                            "isDone": true,
                            "deadLine": "2023-03-20T12:25:00.000Z",
                            "userId": {
                                "_id": "64181c3a992085f3817b7c87",
                                "name": "potato",
                                "email": "potato1@email.com",
                                "img": "",
                                "joinedGroups": [
                                "641825b505f1b22ce9d7717c"
                                ],
                                "__v": 0
                            },
                            "groupId": {
                                "_id": "641825b505f1b22ce9d7717c",
                                "groupName": "potato group",
                                "groupManger": "64181b4e95927b395bb12feb",
                                "users": [
                                "64181c3a992085f3817b7c87"
                                ],
                                "__v": 0
                            },
                            "__v": 0      
                        }
                    }
                }
            }
        },
    }
}

const groupDoneTasks={
    tags:["Tasks"],
    description:`get the finished tasks for a group </br >
    you must be authorized </br>
    <h3> Note : send token in bearer , need group id</h3>
    `,
    security: [{
        bearerAuth: []
    }],
    parameters:[
        {
          "name": "id",
          "in": "query",
          "type": "string",
          "required": true
        }
    ],
    responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"Object",
                        example:{
                            arrayOfTasks:[
                                {
                                    "_id": "6418266805f1b22ce9d7718d",
                                    "desc": "eat two potato",
                                    "isDone": true,
                                    "deadLine": "2023-03-20T12:25:00.000Z",
                                    "userId": {
                                    "_id": "64181c3a992085f3817b7c87",
                                    "name": "potato",
                                    "email": "potato1@email.com",
                                    "img": "",
                                    "joinedGroups": [
                                        "641825b505f1b22ce9d7717c"
                                    ],
                                    "__v": 0
                                    },
                                    "groupId": {
                                    "_id": "641825b505f1b22ce9d7717c",
                                    "groupName": "potato group",
                                    "groupManger": "64181b4e95927b395bb12feb",
                                    "users": [
                                        "64181c3a992085f3817b7c87"
                                    ],
                                    "__v": 0
                                    },
                                    "__v": 0
                                }
                            ]     
                        }
                    }
                }
            }
        },
    }
}
const groupNotDoneTasksNoTime={
    tags:["Tasks"],
    description:`get the unfinished tasks for a group and the time is over </br >
    you must be authorized </br>
    <h3> Note : send token in bearer ,need group id< </h3>
    `,
    security: [{
        bearerAuth: []
    }],
    parameters:[
        {
          "name": "id",
          "in": "query",
          "type": "string",
          "required": true
        }
    ],
    responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"Object",
                        example:{   
                            arrayOfTasks:[
                                {
                                    "_id": "6418266805f1b22ce9d7718d",
                                    "desc": "eat two potato",
                                    "isDone": false,
                                    "deadLine": "2023-03-20T12:25:00.000Z",
                                    "userId": {
                                    "_id": "64181c3a992085f3817b7c87",
                                    "name": "potato",
                                    "email": "potato1@email.com",
                                    "img": "",
                                    "joinedGroups": [
                                        "641825b505f1b22ce9d7717c"
                                    ],
                                    "__v": 0
                                    },
                                    "groupId": {
                                    "_id": "641825b505f1b22ce9d7717c",
                                    "groupName": "potato group",
                                    "groupManger": "64181b4e95927b395bb12feb",
                                    "users": [
                                        "64181c3a992085f3817b7c87"
                                    ],
                                    "__v": 0
                                    },
                                    "__v": 0
                                }
                            ]    
                        }
                    }
                }
            }
        },
    }
}
const gropuNotDoneTasksWithTime={
    tags:["Tasks"],
    description:`get the unfinished tasks for a group  and still in the queue </br >
    you must be authorized </br>
    <h3> Note : send token in bearer,need group id< </h3>
    `,
    security: [{
        bearerAuth: []
    }],
    parameters:[
        {
          "name": "id",
          "in": "query",
          "type": "string",
          "required": true
        }
    ],
    responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"Object",
                        example:{  
                            arrayOfTasks:[
                                {
                                    "_id": "6418266805f1b22ce9d7718d",
                                    "desc": "eat two potato",
                                    "isDone": false,
                                    "deadLine": "2023-03-20T12:25:00.000Z",
                                    "userId": {
                                    "_id": "64181c3a992085f3817b7c87",
                                    "name": "potato",
                                    "email": "potato1@email.com",
                                    "img": "",
                                    "joinedGroups": [
                                        "641825b505f1b22ce9d7717c"
                                    ],
                                    "__v": 0
                                    },
                                    "groupId": {
                                    "_id": "641825b505f1b22ce9d7717c",
                                    "groupName": "potato group",
                                    "groupManger": "64181b4e95927b395bb12feb",
                                    "users": [
                                        "64181c3a992085f3817b7c87"
                                    ],
                                    "__v": 0
                                    },
                                    "__v": 0
                                }
                            ]     
                        }
                    }
                }
            }
        },
    }
}

const tasks={
    createTask,
    getDoneTasks,
    getNotDoneTasksNoTime,
    getNotDoneTasksWithTime,
    updateTask,
    groupDoneTasks,
    groupNotDoneTasksNoTime,
    gropuNotDoneTasksWithTime,
}


module.exports=tasks;