const {logEvent}=require(`./logEvent`)

const errorHandler = (err,req, res, next) =>
{
    logEvent(`${err.message}\n`,'errLog.txt');
    
    res.status(500).send(err.message);
    
}

module.exports={errorHandler}