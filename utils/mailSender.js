const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: "StudyNotion || CodeHelp - by Babbar",
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully. Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error; // Re-throw the error for the caller to handle if needed
  }
};

module.exports = mailSender;
