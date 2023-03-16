const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema
(
    {
        desc:{
            type:String,
            required:[true,'please add description for the task']
        },
        isDone:{
            type:Boolean,
            default:false
        },
        deadLine:{
            type:Date,
            required:[true,'please add deadline to the task']
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        groupId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Group'
        }
    }
);

module.export=mongoose.model('Task',taskSchema);
