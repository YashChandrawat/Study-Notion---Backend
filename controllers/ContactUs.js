const { consultDoctorEmail } = require("../mail/templates/consultDoctorEmail");
const { contactUsEmail } = require("../mail/templates/contactFormRes");
const {
  appointmentNotificationEmail,
} = require("../mail/templates/doctorMailTemp");
const mailSender = require("../utils/mailSender");
const mailSendToStudent = require("../utils/mailSenderDoctor");

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } =
    req.body;
  console.log("Email : ", email);
  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );
    console.log("Email Res ", emailRes);
    return res.json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.log("Error", error);
    console.log("Error message :", error.message);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};

exports.contactDoctor = async (req, res) => {
  const {
    email,
    firstname,
    lastname,
    message,
    phoneNo,
    appointmentDate,
    receiver,
  } = req.body;
  console.log("Email : ", email);
  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      consultDoctorEmail(
        email,
        firstname,
        lastname,
        message,
        phoneNo,
        appointmentDate,
        receiver.email
      )
    );
    console.log("Email Res ", emailRes);
    if (emailRes) {
      // const firstName = receiver?.firstName;
      // const lastName = receiver?.lastName;
      // const patientName = emailRes.firstname + emailRes.lastname;
      // const patientEmail = emailRes.email;
      // const appointmentDate = emailRes.appointmentDate;
      // const phoneNum = emailRes.phoneNo;
      // const message = emailRes.message;

      const emailResDoctor = await mailSender(
        receiver.email,
        "Your Data send successfully",
        appointmentNotificationEmail(
          receiver.firstName,
          receiver.lastName,
          firstname + lastname,
          email,
          appointmentDate,
          message
        )
      );
      console.log("Email Res Doctor:", emailResDoctor);
    } else {
      return res.json({
        success: false,
        message: "Currently Doctor is not Available",
      });
    }

    return res.json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.log("Error", error);
    console.log("Error message :", error.message);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};
