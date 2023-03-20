const getAll={
    tags:["Users"],
    description:`get users</br >
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
                            ExampleArrayOfUsers:[{
                                
                                "img": "",
                                "_id": "641814ce8be4456e84465efa",
                                "name": "potato",
                                "email": "potato@email.com",
                                "joinedGroups": [],
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

const getOneById={
    tags:["Users"],
    description:`get one user by id</br >
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
                            "img": "",
                            "_id": "641814ce8be4456e84465efa",
                            "name": "potato",
                            "email": "potato@email.com",
                            "joinedGroups": [],
                            "__v": 0
                        }
                    }
                }
            }
        },
    }
}

const updateInfo={
    tags:["Users"],
    description:`update the user info</br >
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
                        name:"tomato",
                        img:"potato.png",
                        email:"potato@email.com",
                        password:"potatoPassword"
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
                            "_id": "641814ce8be4456e84465efa",
                            "name": "tomato",
                            "email": "potato@email.com",
                            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE4MTRjZThiZTQ0NTZlODQ0NjVlZmEiLCJuYW1lIjoicG90YXRvIiwiaWF0IjoxNjc5Mjk5Nzk1LCJleHAiOjE2NzkzMDMzOTV9.jByBvgrU7GmuhZBsY4OLtMzJzDtvy4VYYXiiHlKJLnE",
                            "joinedGroups": [],
                            "__v": 0,
                            "img": "potato.png"
                        }
                    }
                }
            }
        },
    }
}

const deleteById={
    tags:["Users"],
    description:`delete the user</br >
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
                            "msg": "account has been deleted"
                        }
                    }
                }
            }
        },
    }
}







const users={
    getAll,
    getOneById,
    updateInfo,
    deleteById
}


module.exports=users;