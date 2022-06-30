
//after  npm install mongoose
const mongoose =require('mongoose');

//connection between mongoose and mongodb
mongoose.connect('mongodb://localhost/codeial_development');
const db= mongoose.connection;
db.on('error',console.error.bind(console,'Error Connecting to MongoDB'));
db.once('open', function(){
    console.log ("Connected to Database :: MongoDB :")
});
module.exports=db;