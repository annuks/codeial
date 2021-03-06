const express = require('express');
const router = express.Router();
// getting home controller
const homeController = require('../controller/homeController');

console.log('Router Loaded')
// step 4
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

//api 
router.use('/api', require ('./api'));

// for any further routes,access from here
//router.use('/routername',require('./routerfile));

router.get('/user',(req,res)=>{
    res.send("Hi from /User route")
})






module.exports = router;