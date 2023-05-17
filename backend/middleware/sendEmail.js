const nodeMailer  = require("nodemailer")


exports.sendEmail = async(options)=>{

//     const transport = nodeMailer.createTransport({
//       // host:process.env.SMTP_HOST,
//       // port:process.env.SMTP_PORT,
//  host:"sandbox.smtp.mailtrap.io",
//  port:465 ,
//       auth:{
//         // user:process.env.SMTP_USER,social
//         user:"social",
//         pass:process.env.SMTP_MAILTRAP_API_KEY


//         // pass:process.env.SMTP_PASSWORD

//       },
//       // secure: false,
//       // debug: false,
//       // logger: true ,
//       // service:process.env.SMTP_SERVICE
//     })
  const mailOptions = {
    // from :process.env.SMTP_USER,
    from :"sajerermunna",

    to :options.email,
    subject:options.subject,
    text:options.message


  }

  var transport = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6bccf6a4509946",
      pass: "9207b4695bc13f"
    }
  });


  await transport.verify(function(error, success) {
    if (error) {
          console.log(error);
    } else {
          console.log('Server is ready to take our messages nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
    }
  });
  

await transport.sendMail(mailOptions, function(err, info) {
  if (err) {
    console.log('Error: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    console.log(err)
  } else {
    console.log('Success: ')
    console.log(info);
  }
})



  // try {
  // let respossnse = await transport.sendMail(mailOptions)
  // console.log(respossnse);

    
  // } catch (error) {
  //   console.log(error);

  // }


}