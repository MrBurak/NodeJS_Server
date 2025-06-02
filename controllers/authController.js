const userDB = 
{
    users:require('../model/users.json'),
    setUsers: function(data){this.users = data}
}
const fsPromises=require('fs').promises;
const path=require('path');
const bcrytp=require('bcrypt')

const handleLogin= async (req, res) =>
{
    const {user, pwd}=req.body;
    if(!user || !pwd) return res.status(400).json({'message': "Username and password are required."});

    const foundUser=userDB.users.find(person=> person.username===user);
    if(!foundUser) return res.status(401).json({'message': "Unauthorized"});
    const match = await bcrytp.compare(pwd, foundUser.password);
    if(match) return res.status(201).json({'Message':`Logged in`});
    return res.status(401).json({'message': "Unauthorized"});
}

module.exports =  {handleLogin} 