const {format}=require('date-fns')
const {v4 : uuid, v4}=require('uuid')

const fs=require('fs')
const fsPromises=require('fs').promises
const path=require('path')
const folderManager = require("../folderManager")


const logEvent = async (message, logName) =>
    {
        const folderName="logs";
        const file=path.join(__dirname, '../', folderName, logName);
        const dateTime=`${format(new Date, 'yyyyMMdd\tHH:mm:ss')}`;
        const logItem=`${dateTime}\t${uuid()}\t${message}`;
        try
        {
            await folderManager.checkFolder(folderName);
            await fsPromises.appendFile(file, logItem);
        }
        catch(err)
        {
            console.error(err);
        }


    }

    const logger = (req, res, next)=>{

        logEvent(`${req.method}\t${req.headers.origin}\t${req.url}\n`,'reqLog.txt');
        
        next();
    }

    module.exports={logEvent, logger};

