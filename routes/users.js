const express=require('express');
const router=express.Router();
const passport = require('passport');
const usersController=require('../controller/usersController');



router.get('/profile',passport.checkAuthentication,usersController.profile);




router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);  


router.post('/create',usersController.create);  

//use passport as a middleware to authnticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
    ),usersController.createSession);

    router.get('/sign-out',usersController.destroySessions);
module.exports=router;