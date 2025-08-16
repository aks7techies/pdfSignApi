const EmailModal = require('../model/emailSendModal');
const nodemailer = require('nodemailer');
const {getToken} = require('../middleware/auth');

const handleEmailSend = async(req, res) =>{
   
    try {
        const token  = await getToken(req.body.token);
        if(!token.status){
            return res.status(401).json({ msg: "Unauthorized" });
        }else{
          var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "798c0e7d89b3a1",
              pass: "2a78afb4e7720d"
            }
          });

              let mailOptions = {
                from: 'no-reply@pdfsigner.com', // Sender email address
                to: req.body.emailTo, // Recipient email address
                subject: req.body.subject, // Subject line
                text: '', // Plain text body
                html: req.body.content // HTML body
            };
        
            try {
                // Send email
                let info = await transport.sendMail(mailOptions);
                
                 if(info.response){
                    const result = await EmailModal.create({
                    clientId:req.body.clientId,
                    draftId: req.body.draftId,
                    emailTo: req.body.emailTo,
                    subject:req.body.subject,
                    body: req.body.content
        
                   })
                   if(result){
                      return res.status(201).json({status: true, msg:"Send Email Successfull", data: result});
                   }
                 }
            } catch (error) {
                console.error('Error sending email:', error);
                return false; // Error occurred while sending email
            }
            

           const result = await EmailModal.create({
            clientId:req.body.clientId,
            draftId: req.body.draftId,
            emailTo: req.body.emailTo,
            subject:req.body.subject,
            body: req.body.content

           })
           if(result){
              return res.status(201).json({status: true, msg:"Send Email Successfull", data: result});
           }else{
            console.log("email Not Send Successfull");
           }
        }
    } catch (error) {
        console.log("Error:", error);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }

}

module.exports ={handleEmailSend};