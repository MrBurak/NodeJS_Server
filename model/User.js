const mongoose=require('mongoose');
const Shema=mongoose.Schema;

const userSchema=new Shema(
    {
        username:
        {
            type : String, 
            required : true
        },
        roles:
        {
            User :
            {
                type : Number,
                default : 1003
            },
            Editor : Number,
            Admin : Number
        },
        password:
        {
            type : String, 
            required : true
        },
        refreshToken : String
    }
)

module.exports=mongoose.model('User', userSchema);
