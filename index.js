require('dotenv').config()
const express= require('express');//step1
// const port=8000;//step1
const app= express();  //step1
const ejs = require('ejs');
const path = require('path');
const PORT = process.env.PORT || 8000;
const expressLayouts = require ('express-ejs-layouts');

//importing database from mongoose
const db= require('./config/mongoose');

//using static files like css, images
app.use(express.static('./assets'));

//using partials and layouts
app.use(expressLayouts);
// extract styles and scripts from sub pages in to layouts
app.set('layout extractStyles',true );
app.set('layout extractScripts',true );

// adding ejs to my views step 5
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// step 3
app.use('/',require('./routes'))
app.use('*',(req,res)=>{
    res.send('Page Not Found')
})

// listening on port
app.listen(PORT,(err)=>{//step1
    if(err){
        console.log('Error in running server',err);
        return;
    }
    console.log("Server is Listening on Port:--",PORT);
});
