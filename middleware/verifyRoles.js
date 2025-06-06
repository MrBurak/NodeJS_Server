const verifyRoles= (...alowedRoles) =>
    {
        return (req, res, next) => 
            {
                console.log(req);

                if(!req?.roles) return res.sendStatus(401);
                const rolesArray=[...alowedRoles];
                const result=req.roles.map(role=> rolesArray.includes(role)).find(val => val===true);
                if(!result) return res.sendStatus(401);
                next();
            }
    }

    module.exports = verifyRoles;