const Comment = require ('../models/comment');
const Post = require ('../models/post'); 
const { post } = require('../routes/posts');

module.exports.create = (req,res)=>{
    Post.findById(req.body.post,(err,post)=>{
        req.flash('success','Comment Published !');
        if(post){
            Comment.create( {
                content:req.body.content,
                post: req.body.post,
                user:req.user._id
            }, function(err,comment){

            if(err){
                req.flash('error','You can not comment');
                return res.redirect('back');
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
                    req.flash('success','Comment Deleteded !');
                    return res.redirect('back');
                
                })
            
             } else{
                    return res.redirect('back');
                }

            
        });
    }