const mongoose=require('mongoose');
const {logEvent} = require('../middleware/logEvent');

const connectDB =async () =>
{
    try
    {
        await mongoose.connect(process.env.DATABASE_URI, 
        {
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
    }catch(err)
    {

        logEvent(err.message, "connectionLog.txt");
        
    }
}
module.exports = connectDB