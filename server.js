const express=require('express');
const path=require("path");
const cors=require('cors');
const app=express();
const PORT =process.env.PORT || 3500;
const {logger}=require("./middleware/logEvent");
const {errorHandler}=require('./middleware/errorHandler');


app.use(logger);

app.use(cors(require('./config/corsOptions')));

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));


app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));



app.all('/{*any}', (req, res, next) => 
    {
        res.status(404);
        if(req.accepts('html'))
        {
            res.sendFile(path.join(__dirname,'views','404.html'));
        }
        else if(req.accepts('html'))
        {
            res.json({error:'404 not found'});
        }
        else
        {
            res.type('txtx').send('404 not found');
        }
    })




app.use(errorHandler)

 
app.listen(PORT, () => console.log(`Server running on  port ${PORT}`));



