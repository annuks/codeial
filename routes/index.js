const express = require('express');
const router = express.Router();

// getting home controller
const homeController = require('../controller/homeController');



// step 4
router.get('/',homeController.home)

router.get('/user',(req,res)=>{
    res.send("Annu")
})






module.exports = router;