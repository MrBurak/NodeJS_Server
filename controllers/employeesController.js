const data=
{
    employees:require('../model/employees.json'),
    setEmployees:function(data){this.employees=data}
}


const list = (req, res)=>
{
    res.status(200).json(data.employees);
}

const insert= (req, res)=>{

    const newEmployee= 
    {
        id:data.employees[data.employees.length - 1].id + 1 || 1,
        firstname:req.body.firstname,
        lastname: req.body.lastname
    }

    if(!newEmployee.firstname || !newEmployee.lastname)
    {
        return res.status(400).json({ "message": 'First and Last names are required',});  
    }
    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const update = (req, res)=>
{
    const employeeId=parseInt(req.body.id);
    const employeeFirstName=req.body.firstname;
    const employeeLastName=req.body.lastname;
    
    const employee=data.employees.find(emp => emp.id === employeeId);
    if(!employee) return res.status(400).json({ "message": `Employee ID ${employeeId} not found`,});  
    
    if(employeeFirstName) employee.firstname=employeeFirstName;
    if(employeeLastName)  employee.lastname=employeeLastName;

    const filteredArray=data.employees.filter(emp => emp.id !== employeeId);
    const unsortedArray=[...filteredArray, employee]
    res.status(201).json(unsortedArray);

}

const remove = (req, res)=>
{
    const employeeId=parseInt(req.body.id);
    const employee=data.employees.find(emp => emp.id === employeeId);
    if(!employee) return res.status(400).json({ "message": `Employee ID ${employeeId} not found`,});  
    const filteredArray=data.employees.filter(emp => emp.id !== employeeId);
    res.status(201).json(filteredArray);
}

const get = (req, res)=>
    {
        const employeeId=parseInt(req.params.id);
        const employee=data.employees.find(emp => emp.id=== employeeId);
        if(!employee) return res.status(400).json({ "message": `Employee ID ${employeeId} not found`,});
        res.status(200).json(employee);
    }

module.exports = { list, insert, update, remove, get};