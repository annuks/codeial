const Comment = require ('../models/comment');
const Post = require ('../models/post'); 
const { post } = require('../routes/posts');

module.exports.create = (req,res)=>{
    Post.findById(req.body.post,(err,post)=>{
        if(post){
            Comment.create( {
                content:req.body.content,
                post: req.body.post,
                user:req.user._id
            }, function(err,comment){

            if(err){
                console.log("Error in Commenting",err);
                return;
            }
            post.comments.push(comment);
            post.save();

            res.redirect('/');
            });
        } 

    });
}

    module.exports.destroy = (req,res)=>{
        Comment.findById(req.params.id,(err,comment)=>{
                 if(comment.user==req.user.id)
                 {
                let postID=comment.post;
                comment.remove();
                Post.findByIdAndUpdate(postID,{ $pull:{comments:req.params.id}},(err,post)=>{
                    return res.redirect('back');
                
                })
            
             } else{
                    return res.redirect('back');
                }

            
        });
    }