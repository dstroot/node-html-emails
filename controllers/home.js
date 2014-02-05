/**
 * Module Dependencies
 */
var path            = require('path');
var emailTemplates  = require('swig-email-templates');
var nodemailer      = require("nodemailer");

// var smtpTransport = nodemailer.createTransport("SMTP",{
//    service: "Gmail",
//    auth: {
//        user: "dan.stroot@gmail.com",
//        pass: "111222333"
//    }
// });

module.exports.controller = function(app) {

/**
 * Home page route
 */
  app.get('/', function(req, res) {
    res.render('home', {
      title: 'Home'
    });
  });

  app.post('/', function(req, res) {

    var options = {
      root: path.join(__dirname, "templates"),
      // any other swig options allowed here
    };

    emailTemplates(options, function(err, render) {
      var context = {
        title: "Welcome",
        username: "Dan"
      };
      render('welcome.html', context, function(err, html) {
        console.log("HTML: " + html);

        //send email
        var message = {
           from:    "My Name <me@example.com>",    // sender address
           to:      "Your Name <you@example.com>", // comma separated list of receivers
           subject: "Hello ✔",                     // Subject line
           text:    "Hello world ✔",               // plaintext body
           html:    html                           // HTML body
        };

        // smtpTransport.sendMail(message, function(error, response){
        //    if(error){
        //        console.log(error);
        //    }else{
        //        console.log("Message sent: " + response.message);
        //    }
        // });

      });
    });

    // Render the home page
    res.render('home', {
      title: 'Home'
    });

  });

}