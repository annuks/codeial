{
//method to submit form  data using ajax and jquery for  new post   

    let createPost=function(){
        let newPostForm=$('#new-post-form');    

        newPostForm.submit (function(e){
            e.preventDefault();

            $.ajax({

                type:'post',
                url:'/posts/create',
                data: newPostForm.serialize(),  
                success:function(data){
                    let newPost= newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    console.log(data);
                },error: function(error){
                    console.log(error.responseText);   
                }
            })
        });
    }

    //method to create a post in DOM

    let newPostDom = function(post){
            return $(`<li id="post- ${post._id}"
            <p>
            
                <small>
                <a  class="delete-post-button" href="/posts/destroy/${post._id}"> <b> X </b> </a>
            </small>
            
           <br>
           ${post.content}
        <small>
        ${post.user.name}
         </small>
        
        
         </p>
        
          <!--   -->
        
         <div class="post-comments">
            
                <form action="/comments/create" id="comments-post-form" method="POST">
               <p> <input type="text" name="content" id="comments" placeholder="Type to Comment Here" required="true">
               <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Post Comment" />
                </form>
        
         
         <div class ="post-comments-list">
            <ul id=" post-comments- ${post._id}">
               </ul>
            </div>
         </div>
        </li>`)
    }


    // Method to delete a post using DOM

    let deletePost= function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post._id}`).remove();
                },error: function(error){
                    console.log(error.responseText);   

                }
            })

        })
    }





    createPost();
}