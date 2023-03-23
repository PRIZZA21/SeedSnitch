const nodemailer = require("../config/NodeMailer");


exports.accept_mailer = (data) => {
    let htmlString = nodemailer.renderTemplate({data:data},'/Accept_Mail_View.ejs')
    nodemailer.transporter.sendMail(
        {
            from   : process.env.GOOGLE_SENDER_EMAIL,
            to     : data.founder.email,
            subject: "Congratulations for your application!",
            html   : htmlString
        },
        (err,info)=>{
            if(err){ console.log('Error occured during mail sending', err); return;}
        }
    )
}

exports.reject_mailer = (data) => {
    let htmlString = nodemailer.renderTemplate({data:data},'/Reject_Mail_View.ejs')
    nodemailer.transporter.sendMail(
        {
            from   : process.env.GOOGLE_SENDER_EMAIL,
            to     : data.founder.email,
            subject: "Sorry your application has been rejected!",
            html   : htmlString
        },
        (err,info)=>{
            if(err){ console.log('Error occured during mail sending', err); return;}
        }
    )
}

