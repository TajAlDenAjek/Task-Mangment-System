require('dotenv').config();
const path=require('path');
const express=require('express');
const app=express();
const connectDB=require(path.join(__dirname,'config','datatBaseConnections'));
const mongoose=require('mongoose');
const PORT=process.env.PORT||3500;

connectDB();


mongoose.connection.once('open',()=>
{
    console.log('Connnected to the dataBase')
    app.listen(PORT,()=>console.log(`Server is running on port ${PORT} ... `));
});
