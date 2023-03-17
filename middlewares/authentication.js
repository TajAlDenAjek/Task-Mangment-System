const path=require('path');
const User=require(path.join(__dirname,'..','models','user.js'));
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require(path.join(__dirname,'..','errors','unauthenticated'));

const auth = async (req, res, next) =>
{
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer'))
  {
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];
  try
  {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    const temp=await User.findOne({_id:req.user.userId,token:token})
    if(!temp)
      throw new UnauthenticatedError('Authentication invalid');
    next()
  } catch (error)
  {
    throw new UnauthenticatedError('Authentication invalid');
  }
}

module.exports=auth;
