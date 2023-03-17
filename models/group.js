const mongoose=require('mongoose');

const groupSchema=new mongoose.Schema
({
    groupName:{
        type:String,
        required:[true,'please provide a name to the group']
    },
    groupManger:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'please provide the id of the group manger']
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
    ]
});

module.exports=mongoose.model('Group',groupSchema);