const { json } = require('express');
const jwt = require('jsonwebtoken');


const verifyJWT =(req,res, next) => 
{
    const authHeader=req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).json({'err': err});
            req.user=decoded.username;
            next();
        }

    )

    //Delete refresh system
    

}

module.exports = verifyJWT