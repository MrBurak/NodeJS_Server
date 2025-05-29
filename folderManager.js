const fs= require('fs');
const path=require('path');




const checkFolder = async (name) => 
{
    const folderName=path.join(__dirname, name);

    if(!fs.existsSync(folderName))
    {
        fs.mkdir(folderName, (err) => 
        {
            if(err) throw err;
            console.log(`Directory created ${folderName}`);
        })
        
        
    }
}



module.exports={ checkFolder};


