const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express(); 

const PORT = process.env.PORT || 1234;



//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    auth: {
    user: 'minumanjaly95@gmail.com ',
    pass: 'learninfinity#2017'
    },
    tls: {
        rejectUnauthorized: false
    }
});

    
// Base index route
app.get('/',(req, res) => {
    res.render('email', {
        title: 'Send Emails with NodeJS and Express'
    });
});

    
        
app.post('/sendmail',(req, res) => {
    
    let to_email = req.body.to_email;
    let mail_subject = req.body.mail_subject;
    let message = req.body.message;
    let attach = req.body.attach;


    let messageOptions = {
        from: 'Learn Infinity <learninfinity2017@gmail.com>',
        to: to_email,
        subject: mail_subject,
        // text: message
        html: message
    };

    if(attach){
        messageOptions = {...messageOptions, attachments: [{
                filename: 'Promotion.jpg',
                path: './Promotion.jpg'
            }]
        };
    }


    transporter.sendMail(messageOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.redirect('/');
    });
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });

// // Server Listening
// app.listen(3000, () => {
//     console.log('Server is running at port 3000');
// });

// var express=require('express');
// var app= express();
// var path=require('path')
// var bodyParser = require('body-parser')// importing body parser middleware to parse form content from HTML
// var nodemailer = require('nodemailer');//importing node mailer

// const PORT = process.env.PORT || 1234;

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname,'public')))// serving our contact form on '/' route
// // route which captures form details and sends it to your personal mail
// app.post('/sendemail',(req,res,next)=>{
// console.log(req.body)
// /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
// here we are using gmail as our service
// In Auth object , we specify our email and password
// */
// var transporter = nodemailer.createTransport({
// service: 'gmail',
// auth: {
// user: 'yourmail@gmail.com',//replace with your email
// pass: 'yourpassword'//replace with your password
// }
// });
// /*
// In mailOptions we specify from and to address, subject and HTML content.
// In our case , we use our personal email as from and to address,
// Subject is Contact name and
// html is our form details which we parsed using bodyParser.
// */
// var mailOptions = {
// from: 'yourmail@gmail.com',//replace with your email
// to: 'yourmail@gmail.com',//replace with your email
// subject: `Contact name: ${req.body.name}`,
// html:`<h1>Contact details</h1>
// <h2> name:${req.body.name} </h2><br>
// <h2> email:${req.body.email} </h2><br>
// <h2> phonenumber:${req.body.phonenumber} </h2><br>
// <h2> message:${req.body.message} </h2><br>`
// };
// /*
//  Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
// call back as parameter
// */
// transporter.sendMail(mailOptions, function(error, info){
// if (error) {
// console.log(error);
// res.send('error') // if error occurs send error as response to client
// }
// else {
// console.log('Email sent: ' + info.response);
// res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
// }
// });
// })
// // app.listen(1234);

// Express server listening...
