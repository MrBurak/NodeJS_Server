const allowedOrigins=require("./allowedOrigins")

const corsOptions=
{
    origin : (origin, callback)=>
    {
        //origin found or no origin==undefined
        if(allowedOrigins.indexOf(origin) !== -1 || !origin)
        {
            callback(null, true);
            console.log(`CORS Sucess | Origin : ${origin}`)
            
        }
        else
        {
            callback(new Error('Not allowed by CORS'), false);
            console.log(`CORS Failed | Origin : ${origin}`)
        }
        
    },
    optionsSuccessStatus:200
}

module.exports = {corsOptions} ; 