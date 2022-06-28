const express = require('express');
const router = express.Router();




// step 3
router.get('/',(req,res)=>{
    res.send("Codeial")
})

router.get('/user',(req,res)=>{
    res.send("Annu")
})






module.exports = router;