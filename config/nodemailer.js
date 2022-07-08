const nodemailer = require("nodemailer");
const ejs = require ('ejs');
const path =require('path');
const { Console } = require("console");



let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:'587',
    secure:false,
    auth:{
        user:'aksultimate001',
        pass:'Annuks@123'
    },

});
        let renderTemplate  = ( data,relativePath)=>{
            let mailHTML;
            ejs.renderFile(
                path.join(__dirname, '../views/mailers',relativePath),
                data,
                function(err,template){
                    if(err){
                        Console.log("Error in rendering TEmplate");
                        return;
                    }
                    mailHTML=template;
                }
            )
            return mailHTML;
        }
        module.exports={
            transporter:transporter,
            renderTemplate:renderTemplate,
        }