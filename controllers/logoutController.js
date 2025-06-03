const userDB = 
{
    users:require('../model/users.json'),
    setUsers: function(data){this.users = data}
}

const fsPromises=require('fs').promises;
const path=require('path');

const {cookieOptions}=require('../config/cookieOptions')


const handleLogout= async (req, res) =>
{
        // Onclient, also delete the accessToken
    const cookies=req.cookies;
    console.log(cookies);
    if(!cookies?.jwt) return res.sendStatus(204);
    
    const refreshToken=cookies.jwt;

    const foundUser=userDB.users.find(person=> person.refressToken===refreshToken);
    if(!foundUser){
        res.clearCookie("jwt", cookieOptions)
        return res.sendStatus(204);
    } 

    const otherUsers=userDB.users.filter(person => person.username !== foundUser.username);
    const currentUser={"username": foundUser.username, "password": foundUser.password, "roles":foundUser.roles};
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile
    (
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(userDB.users)
    );
    res.clearCookie("jwt", cookieOptions)
        return res.sendStatus(204);
   
    
}

module.exports =  {handleLogout} 