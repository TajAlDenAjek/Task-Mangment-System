const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema
({
    name:
    {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
    },
    email:
    {
        type: String,
        required: [true, 'Please provide email'],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
        ],
        unique: true,
    },
    password:
    {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    token:
    {
      type:String,
      default:'',
    },
    img:
    {
      type:String,
      default:'',
    },
    joinedGroups:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group',
      }
    ],
    
});

UserSchema.pre('save', async function() 
{
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function()
{
  const token=jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
  return token;
};

UserSchema.methods.comparePassword = async function(canditatePassword)
{
  const isCorrect = await bcrypt.compare(canditatePassword, this.password);
  return isCorrect;
};

module.exports = mongoose.model('User', UserSchema);
