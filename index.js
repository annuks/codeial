require("dotenv").config();
const express = require("express"); //step1
const cookieParser = require("cookie-parser");
const app = express(); //step1
const ejs = require("ejs");
const path = require("path");
const PORT = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");
//importing database from mongoose
const db = require("./config/mongoose");

//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const MongoStore = require('connect-mongo');

//for scss/sass
const saasMiddleware = require ('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(saasMiddleware({
  src:'./assets/scss',
  dest:'./assets/css',
  debug:true,
  outputStyle:'extended',
  prefix:'/css'
}))
app.use(express.urlencoded());
app.use(cookieParser());





//using static files like css, images
app.use(express.static("./assets"));

//using partials and layouts
app.use(expressLayouts);
// extract styles and scripts from sub pages in to layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// adding ejs to my views step 5
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// mongo store is used to store session cookie in database
app.use(
    session({
      name: "codeial",
      //to do change the secret before deployment in production mode
      secret: "blahsomething",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 1000,
      },
      store: MongoStore.create(
        {
          mongoUrl : 'mongodb://localhost/codeial_development',
          autoRemove: "disabled",
        },
        function (err) {
          console.log(err || "coneection with mongo-db setup ok");
        }
      ),
    })
  );



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);  

// step 3    use express router
app.use("/", require("./routes"));
app.use("*", (req, res) => {
  res.send("Page Not Found");
});

// listening on port
app.listen(PORT, (err) => {
  //step1
  if (err) {
    console.log("Error in running server", err);
    return;
  }
  console.log("Server is Listening on Port:--", PORT);
});
