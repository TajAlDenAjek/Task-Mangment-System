
const createGroup={
    tags:["Groups"],
    description:`create group</br >
    you must be authorized </br>
    <h3> Note : send token in bearer </h3>
    `,
    security: [{
        bearerAuth: []
    }],
    requestBody:{
        required:true,
        content:{
            "application/json":{
                schema:{
                    type:"Object",
                    example:{
                        "groupName": "potato Group",
                        "users":[]
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
                            "groupName": "potato group",
                            "groupManger": "64181b4e95927b395bb12feb",
                            "users": [],
                            "_id": "64181b7395927b395bb12ff0",
                            "__v": 0         
                        }
                    }
                }
            }
        },
    }
}

const getOwnedGroups={
    tags:["Groups"],
    description:`get owned groups </br >
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
                            ExampleArrayOfGroups:[{
                                "_id": "64181b7395927b395bb12ff0",
                                "groupName": "potato group",
                                "groupManger": "64181b4e95927b395bb12feb",
                                "users": [],
                                "__v": 0
                              },
                            ]
                        }
                    }
                }
            }
        },
    }
}

const updateGroupInfo={
    tags:["Groups"],
    description:`update group</br >
    you must be authorized </br>
    <h3> Note : send token in bearer </h3>
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
                        "groupName": "tomato group",
                        "users": [
                            "64181b4e95927b395bb12feb",
                            "64181c3a992085f3817b7c87"
                        ]
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
                            "_id": "64181b7395927b395bb12ff0",
                            "groupName": "potato group",
                            "groupManger": "64181b4e95927b395bb12feb",
                            "users": [
                              "64181c3a992085f3817b7c87"
                            ],
                            "__v": 0
                        }
                    }
                }
            }
        },
    }
}

const getJoinedGroups={
    tags:["Groups"],
    description:`get joined groups</br >
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
                            ExampleArrayOfGroups:[{
                                "_id": "64181c3a992085f3817b7c87",
                                "joinedGroups": [
                                  {
                                    "_id": "64181b7395927b395bb12ff0",
                                    "groupName": "potato group",
                                    "groupManger": "64181b4e95927b395bb12feb",
                                    "users": [
                                      "64181c3a992085f3817b7c87"
                                    ],
                                    "__v": 0
                                  }
                                ]
                              },
                            ]
                        }
                    }
                }
            }
        },
    }
}

const deleteGroup={
    tags:["Groups"],
    description:`delete group</br >
    you must be authorized </br>
    <h3> Note : send token in bearer </h3>
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
                            "msg": "group has been deleted"
                        }
                    }
                }
            }
        },
    }
}

const groups={
    createGroup,
    getOwnedGroups,
    updateGroupInfo,
    getJoinedGroups,
    deleteGroup
}

module.exports=groups;