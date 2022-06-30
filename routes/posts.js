const express=require('express');
const router=express.Router();
const postsController=require('../controller/postsController');
router.get('/postsc',postsController.postsc);



module.exports=router;