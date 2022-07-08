
const passport = require ('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User  = require('../models/user');

//using passport to use a new startegy for login through google
    passport.use(new googleStrategy({
    clientID:'1090675758797-uket850m9mlu5n0hfhuv6eb3f6dic34q.apps.googleusercontent.com',
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",

},

    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            //find the user
            if(err){
                console.log("Error in Google Strategy Passport",err);
                return;
            }
            console.log(profile);
            if(user){
                //if user foun set this user as request.user
                return done(null,user);
            }
            else{
                //if user is not found , create a user and set it as request.user(sign in)
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),

                }, function(err,user){
                    if(err){
                        console.log("Error In authorisation with Google.com",err);
                        return;
                    }
                    return done(null,user);

                })
            }
        })
    }
));
module.exports=passport;