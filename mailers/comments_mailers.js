
const nodemailer =require('../config/nodemailer');
// another way of exporting a method or module
exports.newComment = (comment)=>{
    console.log('Inside New Commet mailer',comment) ;
    nodemailer.transporter.sendMail({
        from:'codeial@codeial.com',
        to:comment.user.email,
        subject:'A new Comment Posted',
        html: '<h3> Yup !  your comment is now published</h3>'

    },
        (err,info)=>{
            if (err){
                console.log("Error in sending e-mails",err);
                return;
            }
            console.log("Mail Delivered Succesfully",info);
            return;
        }
    );
} 