const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema
(
    {
        desc:{
            type:String,
            required:true
        },
        isDone:{
            type:Boolean,
            default:false
        },
        
    }
);

module.export=mongoose.model('Task',taskSchema);
