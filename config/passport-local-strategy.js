const { application } = require('express');
const { serializeUser } = require('passport');
const passport = require('passport');
const LocalStrategy = require ('passport-local');
const User= require('../models/user');
//authentication using passport js  
passport.use(new LocalStrategy({
    usernameField:'email',

},
function(email,password,done){
//finding user to establish identity
User.findOne({email:email},function(err,user){
    if(err){
        console.log("Error");
        return done(err);
    }
    //if user not found or password is incorrect
    if(!user ||user.password !=password){
        console.log('Invalid User Nmae / Password');
        return done(null,false);
    }
        return done(null,user);
    
});

}

));


//serialising the user to decide which key  is to be  kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


//deserialisng the user from the key in the ccokies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Invalid User Name / Password');    
            return done(err);

        }
        return done(null,user);
    });
})


module.exports=passport;