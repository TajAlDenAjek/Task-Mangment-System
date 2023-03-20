const register={
    tags:["register login && logout"],
    description:`create a user </br >
    you need to pass in request body </br>
    <ul>
        <li><b>name 3-50 chars</br></b></li>
        <li><b>valid email</br></b></li>
        <li><b>and password with with minimum lenght of 6 chars</b></b></li>
    </ul>
    <h3> Note : users are distinct by email </h3>
    `,
    requestBody:{  
        required:true,
        content:{
            "application/json":{
                schema:{
                    type:"Object",
                    example:{
                        name:"potato",
                        email:"potato@email.com",
                        password:"potatoPassword"
                    }
                }
            }
        },
    },
    responses:{
        201:{
            description:"created",
            content:{
                "application/json":{
                    schema:{
                        type:"Object",
                        example:{
                            "user":{
                                "name": "potato"
                            }
                        }
                    }
                }
            }
        },
        400:{
            description:"bad request",
            content:{
                "application/json":{
                    schema:{
                        type:"Object",
                        example:{
                                "msg": "Duplicate value entered for email field, please choose another value"
                            }
                    }
                }
            }
        }
    }
}


const login={
    tags:["register login && logout"],
    description:`login route for a registered email</br >
    you need to pass in request body </br>
    <ul>
        <li><b>valid email</br></b></li>
        <li><b>and password with with minimum lenght of 6 chars</b></b></li>
    </ul>
    <h3> Note : Keep your token safe you need to use it </h3>
    `,
    requestBody:{
        required:true,
        content:{
            "application/json":{
                schema:{
                    type:"Object",
                    example:{
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
                            "user": {
                                "id": "641800efa9ba5345be919a16",
                                "name": "potato"
                              },
                              "token": "the token string"
                        }
                    }
                }
            }
        },
        401:{
            description:"Unauthorized",
            content:{
                "application/json":{
                    schema:{
                        type:"Object",
                        example:{
                            "msg": "Invalid Credentials"
                        }
                    }
                }
            }
        }
    }
}

const logout={
    tags:["register login && logout"],
    description:`logout route for the current logged in email</br >
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
                            "msg": "logout sucessfully !"
                        }
                    }
                }
            }
        },
    }
}


const reg_login_logout=
{
    register,
    login,
    logout,
}


module.exports=reg_login_logout;