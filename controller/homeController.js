
const Post = require('../models/post');
module.exports.home = (req,res)=>{
    // console.log('Cookies: ', req.cookies)
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'

        }
     }   )
    .exec(function(err,posts){ 

        if(err){
            console.log('Error in Showing Author',err)
            return
        }
        return res.render('home',{
            title:'Codeial | Home',
            posts:posts,
        });
});
    }
    