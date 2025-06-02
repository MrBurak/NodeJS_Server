const allowedOrigins=require("../config/allowedOrigins")

const credentials = (req, res, next) =>
{
    const origin=req.headers.origin;
    if(allowedOrigins.includes(origin))
    {
        res.header('access-control-allow-origin', true);
    }
    next();
}

module.exports = credentials;