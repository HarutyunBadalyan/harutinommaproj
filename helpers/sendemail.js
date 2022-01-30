const nodemailer = require('nodemailer');
const Config = require("../devconfig")

const gmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 80,
    auth: {
        user: Config.EMAIL,
        pass: Config.PASSWORD,
    }
});
const sendEmail = async (toWhomSend, messageSubject, messageText, messageHtml) => {
    try {
        const info = await gmailTransporter.sendMail({
            from: 'Admin', 
            to: toWhomSend,
            subject: messageSubject,
            text: messageText, 
            html: messageHtml,
          });
          console.log(info)

    } catch(err) {
        console.log(err);
        return err;
    }
}

module.exports = sendEmail;