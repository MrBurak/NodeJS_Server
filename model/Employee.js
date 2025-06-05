const mongoose=require('mongoose');
const Shema=mongoose.Schema;

const employeeSchema=new Shema(
    {
        firstName:
        {
            type: String, 
            required: true
        },
        lastName:
        {
            type: String, 
            required: true
        }
    }
)

module.exports=mongoose.model('Employee', employeeSchema);
