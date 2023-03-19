require('dotenv').config();
require('express-async-errors');
const path=require('path');
const express=require('express');
const app=express();
const connectDB=require(path.join(__dirname,'config','datatBaseConnections'));
const corsOptions=require(path.join(__dirname,'config','corsOptions'));
const mongoose=require('mongoose');
const errorHandlerMiddleware = require(path.join(__dirname,'middlewares','error-handler'));
const {logger}=require(path.join(__dirname,'middlewares','logEvents'));
const credentials=require(path.join(__dirname,'middlewares','credentials.js'));
const notFound=require(path.join(__dirname,'middlewares','notFound.js'));
const PORT=process.env.PORT||3500;

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


// Swagger
// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs');

const authRouter=require(path.join(__dirname,'routes','auth.js'));
const authentication=require(path.join(__dirname,'middlewares','authentication'));
const usersRouter=require(path.join(__dirname,'routes','users'));
const gropusRouter=require(path.join(__dirname,'routes','groups.js'));
const tasksRouter=require(path.join(__dirname,'routes','tasks.js'));
const logoutRouter=require(path.join(__dirname,'routes','logout.js'));


app.set('trust proxy', 1);
app.use(
    rateLimiter(
    {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);
app.use(express.json()); 
app.use(helmet());
app.use(cors(corsOptions));
app.use(xss());
    
connectDB();

app.use(logger);
app.use(credentials);


// app.get('/', (req, res) =>
// {
//     res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
// });
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/auth',authRouter);
app.use('/api/logout',authentication,logoutRouter);
app.use('/api/users',authentication,usersRouter);
app.use('/api/groups',authentication,gropusRouter);
app.use('/api/tasks',authentication,tasksRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

mongoose.connection.once('open',()=>
{
    console.log('Connnected to the dataBase')
    app.listen(PORT,()=>console.log(`Server is running on port ${PORT} ... `));
});
