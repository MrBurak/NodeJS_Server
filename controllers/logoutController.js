const User = require('../model/User');

const {cookieOptions}=require('../config/cookieOptions')


const handleLogout= async (req, res) =>
{
        // Onclient, also delete the accessToken
    const cookies=req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    
    const refreshToken=cookies.jwt;

    const foundUser=await User.findOne({ refreshToken}).exec();
    if(!foundUser){
        res.clearCookie("jwt", cookieOptions)
        return res.sendStatus(204);
    } 

    foundUser.refreshToken='';
    await foundUser.save();
    res.clearCookie("jwt", cookieOptions)
    return res.sendStatus(204);
   
    
}

module.exports =  {handleLogout} 