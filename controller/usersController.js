const User = require('../models/user');
const fs = require ('fs');
const path= require('path');
// writing actions in controllers

//rendering user profile page
module.exports.profile = (req, res) => {
  User.findById(req.params.id, function (err, user) {
    return res.render("user_Profile", {
      title: "Profile",
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
      if (req.user.id == req.params.id) {
        try{

          let user = await User.findById(req.params.id);
          User.uploadedAvatar(req,res, function(err){
              if(err){
                console.log('  ##### Multer Error ######',err)
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){
                  //this is saving the path of the uploaded file in to the avatar field in the user
                 
                 if(user.avatar){
                  fs.unlinkSync(path.join(__dirname,'..',user.avatar));

                 }
                  user.avatar= User.avatarPath+ '/'+ req.file.filename;
                  
                }
                user.save();
                return  res.redirect('back');
            
              }
          });

        } catch (err){
          req.flash('error',err);
          return res.redirect('back');

        }

      }
      else{
            req.flash('error','Uauthorised')
            return res.status(401).send("UnAuthorised Access");
          

      }
 };

//rendering signup page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Codeial | SignUp",
  });
};

//rendering signin page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | SignIn",
  });
};

//get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in sign up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in finding user in sign up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySessions = function (req, res) {
  req.logout((err) => {
    req.flash("success", "You have been Logged Out");
    return res.redirect("/");
  });
};
