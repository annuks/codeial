const express= require('express');//step1
const port=8000;//step1
const app= express();  //step1



// step 3
app.use('/',require('./routes'))

app.use('*',(req,res)=>{
    res.send('Page Not Found')
})

// listening on port
app.listen(port,(err)=>{//step1
    if(err){
        console.log('Error in running server',err);
        return;
    }
    console.log("Server is running on port",port);
});
