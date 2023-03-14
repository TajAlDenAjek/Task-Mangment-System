const path=require('path');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require(path.join(__dirname,'..','errors'));

const registerController = async (req, res) =>
{

}

const loginController = async (req, res) =>
{
  
}

module.exports =
{
    registerController,
    loginController,
}
