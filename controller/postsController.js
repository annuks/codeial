const Post = require ('../models/post');
module.exports.create=(req,res)=>{
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function (err,post){
        if(err){
            console.log('err in creating post');
            return;
        }
        return res.redirect('back');
    });
    }