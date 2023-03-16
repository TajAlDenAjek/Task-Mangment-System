const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema
({
    text:{
        type:String,
        default:'',
    },
    sentBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    time:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('Message',messageSchema);
