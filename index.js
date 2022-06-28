const express= require('express');//step1
const port=8000;//step1
const app= express();  //step1





// listening on port
app.listen(port,(err)=>{//step1
    if(err){
        console.log('Error in running server',err);
        return;
    }
    console.log("Server is running on port",port);
});
