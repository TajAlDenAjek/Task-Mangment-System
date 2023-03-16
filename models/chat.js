const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema
({
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message'
        }
    ],
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    }
});

module.exports=mongoose.model('Chat',chatSchema);
