

module.exports.home = (req,res)=>{
    return res.render('home',{                  //step 5 sending ejs
        title : "Codeial"
    })
}