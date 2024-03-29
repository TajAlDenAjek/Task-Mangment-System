const path=require('path');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require(path.join(__dirname,'..','errors'));
const User=require(path.join(__dirname,'..','models','user.js'));
const registerController = async (req, res) =>
{
    const user=await User.create({...req.body});
    // const token=user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name:user.name}});
}

const loginController = async (req, res) =>
{
    const { email, password } = req.body;

    if (!email || !password)
    {
        throw new BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ email }).exec();
    if (!user)
    {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
    {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    // compare password
    const token = user.createJWT();
    user.token=token;
    user.password=password;
    await user.save();
    res.status(StatusCodes.OK).json({ user: {id:user._id ,name: user.name } , token });
}

module.exports =
{
    registerController,
    loginController,
}
