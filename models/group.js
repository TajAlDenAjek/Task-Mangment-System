const mongoose=require('mongoose');

const groupdSchema=new mongoose.Schema
({
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