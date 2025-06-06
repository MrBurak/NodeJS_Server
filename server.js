require('dotenv').config();
const express=require('express');
const path=require("path");
const credentials=require("./middleware/credentials");
const cors=require('cors');
const app=express();
const PORT =process.env.PORT || 3500;
const {logger}=require("./middleware/logEvent");
const {errorHandler}=require('./middleware/errorHandler');
const verifyJWT=require('./middleware/verifyJWT')
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const connectDB =require("./config/dbConn");




connectDB();


app.use(logger);

app.use(credentials)

app.use(cors(require('./config/corsOptions')));

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));


app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/auth', require('./routes/auth'));

app.use(verifyJWT);
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

 mongoose.connection.once('open', () =>{
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on  port ${PORT}`));
 })




