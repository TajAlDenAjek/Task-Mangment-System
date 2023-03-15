require('dotenv').config();
require('express-async-errors');
const path=require('path');
const express=require('express');
const app=express();
const connectDB=require(path.join(__dirname,'config','datatBaseConnections'));
const mongoose=require('mongoose');
const errorHandlerMiddleware = require(path.join(__dirname,'middlewares','error-handler'));
const {logger}=require(path.join(__dirname,'middlewares','logEvents'));
const notFound=require(path.join(__dirname,'middlewares','notFound.js'));
const PORT=process.env.PORT||3500;

const authRouter=require(path.join(__dirname,'routes','auth.js'));
const authentication=require(path.join(__dirname,'middlewares','authentication'));
connectDB();



app.use(express.json()); 
app.use(logger);


app.use('/api/auth',authRouter);
// app.use('/api/users',authentication,usersRouter);


app.use(notFound);
app.use(errorHandlerMiddleware);

mongoose.connection.once('open',()=>
{
    console.log('Connnected to the dataBase')
    app.listen(PORT,()=>console.log(`Server is running on port ${PORT} ... `));
});
