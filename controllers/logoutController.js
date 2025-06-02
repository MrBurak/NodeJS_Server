const userDB = 
{
    users:require('../model/users.json'),
    setUsers: function(data){this.users = data}
}

const fsPromises=require('fs').promises;
const path=require('path');


const handleLogout= async (req, res) =>
{
        // Onclient, also delete the accessToken
    const cookies=req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    
    const refreshToken=cookies.jwt;

    const foundUser=userDB.users.find(person=> person.refressToken===refreshToken);
    if(!foundUser){
        res.clearCookie("jwt", { httpOnly:true, sameSite:'None', secure:true})
        return res.sendStatus(204);
    } 

    const otherUsers=userDB.users.filter(person => person.username !== foundUser.username);
    const currentUser={"username": foundUser.username, "password": foundUser.password};
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile
    (
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(userDB.users)
    );
    res.clearCookie("jwt", {httpOnly:true, sameSite:'None', secure:true})
        return res.sendStatus(204);
   
    
}

module.exports =  {handleLogout} 