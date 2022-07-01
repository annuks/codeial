

module.exports.home = (req,res)=>{
    console.log('Cookies: ', req.cookies)
    
    return res.render('home',{title:'Home'})
};