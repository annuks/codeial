const { application } = require("express");
const { serializeUser } = require("passport");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
//authentication using passport js
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //finding user to establish identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", err);
          return done(err);
        }
        //if user not found or password is incorrect
        if (!user || user.password != password) {
          req.flash("error", "Invalid UserName/Password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

//serialising the user to decide which key  is to be  kept in cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialisng the user from the key in the ccokies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Invalid User Name / Password");
      return done(err);
    }
    return done(null, user);
  });
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in,  passed it to the next function (controller,s action)
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains current signed in user from the session cookie
    // and we are the just sending to the local for the views
    res.locals.user = req.user;
  }
  next();
};
module.exports = passport;
