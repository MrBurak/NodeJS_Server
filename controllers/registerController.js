const User = require('../model/User');
const bcrytp=require('bcrypt');


const handleNewUser= async (req, res) =>
{
    const {user, pwd}=req.body;
    if(!user || !pwd) return res.status(400).json({'message': "Username and password are required."});

    const duplicate=await User.findOne({ username:user}).exec();
    if(duplicate) return res.sendStatus(409);

    try
    {
        const hashedPwd = await bcrytp.hash(pwd, 10);
        await User.create
        (
            {
                'username':user, 
                'password': hashedPwd
            }
        );
        res.status(201).json({'Message':`new user ${user} created`})
        
    }
    catch(err)
    {
        res.status(500).json({'message': err.message});
    }
        
}

module.exports =  {handleNewUser} 