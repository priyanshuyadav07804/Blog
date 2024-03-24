const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async ({ name, email,subject,message }) => {

  transporter.sendMail({
    from: '"Blog Tridium" <blogTridium@gmail.com>', // sender address
    to:email,
    subject,
    html:`<h4> Hello, ${name}</h4>
    ${message}
    `,
  });
};

module.exports = sendEmail;
