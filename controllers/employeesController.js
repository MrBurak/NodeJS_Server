const Employee = require('../model/Employee');


const list = async (req, res)=>
{
    const employees= await Employee.find();
    if(!employees || employees.length < 1) return res.status(204).json({"message":"No employees"});
    res.status(200).json(employees);
}

const insert= async (req, res)=>{

    if(!req?.body?.firstname || !req?.body?.lastname)
        {
            return res.status(400).json({ "message": 'First and Last names are required.'});  
        }


    try
    {
        const body=req.body;
        const result= await Employee.create({firstName: body.firstname, lastName: body.lastName});
        return res.status(200).json({ result});  
    }
    catch(err)
    {
        console.log(err);
    }
}

const update = async (req, res)=>
{
    if(!req?.body?.id)
    {
        return res.status(400).json({ "message": 'ID parameter is required.'});  
    }
    const employeeId=req.body.id;
    const employee=await Employee.findOne({_id: employeeId}).exec();

    if(!employee) return res.status(204).json({ "message": `No employee matches ID ${employeeId}.`});  
    
    if(!req?.body?.firstName) employee.firstname=req.body.firstName;
    if(!req?.body?.lastName)  employee.lastname=req.body.lastName

    const result= await employee.save();

    res.status(201).json(result);

}

const remove = async (req, res)=> 
{
    if(!req?.body?.id)
        {
            return res.status(400).json({ "message": 'ID parameter is required.'});  
        }
        const employeeId=req.body.id;
        const employee=await Employee.findOne({_id: employeeId}).exec();
    
        if(!employee) return res.status(204).json({ "message": `No employee matches ID ${employeeId}.`});  
        const result= await employee.deleteOne({_id: employeeId});
        res.status(201).json(result);
}

const get = async (req, res)=> 
    {
        if(!req?.params?.id)
            {
                return res.status(400).json({ "message": 'ID parameter is required.'});  
            }
            const employeeId=req.body.id;
            const employee=await Employee.findOne({_id: employeeId}).exec();
            res.status(201).json(result);
    }

module.exports = { list, insert, update, remove, get};