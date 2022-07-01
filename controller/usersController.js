const User = require("../models/user");
// writing actions in controllers
//rendering user orofile page
module.exports.profile = (req, res) => {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, (err,user) => {
      if(err){
        console.log(err)
      }
      //console.log("User",user)
      if (user) {
        return res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      }
      return res.redirect("/users/sign-in");
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};
//rendering signup page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial | SignUp",
  });
};

//rendering signin page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codeial | SignIn",
  });
};

//get the sign up data
module.exports.create = function (req, res) {
  //checking whether both password matches or not
  if (req.body.password != req.body.confirm_password) {
    //if not return to sign up page
    return res.redirect("back");
  }
  //checking whether user alredy exists
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in sign up");
      return;
    }
    // if user does not alredy exist, create the use bu sign up details
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in finding user in sign up");
          return;
        }
        //user signed up and refer to login page
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  //Authentication steps
  //find the user
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("Error in finding user in signing in");
      return;
    }
    //handle user found
    if (user) {
      //handle password do'nt match
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      //handle session creation
      res.cookie("user_id", user._id);
      return res.redirect("/users/profile");
    } else {
      //handle user not found
      return res.redirect("back");
    }
  });
};
