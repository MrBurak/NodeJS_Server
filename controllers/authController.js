const userDB = 
{
    users:require('../model/users.json'),
    setUsers: function(data){this.users = data}
}

const bcrytp=require('bcrypt')

const jwt = require('jsonwebtoken');


const fsPromises=require('fs').promises;
const path=require('path');

const {cookieOptionCreate}=require('../config/cookieOptions')




const handleLogin= async (req, res) =>
{
    const {user, pwd}=req.body;
    if(!user || !pwd) return res.status(400).json({'message': "Username and password are required."});

    const foundUser=userDB.users.find(person=> person.username===user);
    if(!foundUser) return res.sendStatus(401);
    const match = await bcrytp.compare(pwd, foundUser.password);
    if(match)
    {
        const roles=Object.values(foundUser.roles);

        const accessToken=jwt.sign(
            {
                "UserInfo":
                {
                    "username":foundUser.username,
                    "roles":roles
                }
                
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        
        const refressToken=jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1M'}
        );
        
        const otherUsers=userDB.users.filter(person => person.username !== foundUser.username);
        const currentUser={ ...foundUser, refressToken};
        userDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile
            (
                path.join(__dirname, '..', 'model', 'users.json'),
                JSON.stringify(userDB.users)
            );
        res.cookie('jwt', refressToken, cookieOptionCreate);

        return res.status(201).json({accessToken});
    }
    return res.status(401).json({'message': "Unauthorized"});
}

module.exports =  {handleLogin} 