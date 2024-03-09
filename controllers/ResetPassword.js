const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// This will create token and link is sent to the user then with that link UI will get open and user can change pswd
exports.resetPasswordToken = async (req, res) => {
  try {
    // Get email from req.body
    const email = req.body.email;

    // Check if the user is present of this email or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Your email is not registered with us",
      });
    }

    // Generate token
    const token = crypto.randomUUID();

    // update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    // create url
    const url = `http://localhost:5173/update-password/${token}`;

    // send mail
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link :${url}`
    );

    // return res
    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully, Please check your email and change password",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Cannot able to send the reset password link to the email",
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  // Fetch the data
  const { password, confirmPassword, token } = req.body;

  // Validation
  if (password !== confirmPassword) {
    return res.status(401).json({
      success: false,
      message: "Password not matching",
    });
  }

  // get userDetails from db using token
  const userDetails = await User.findOne({ token: token });

  // if no entry -> invalid token
  if (!userDetails) {
    return res.status(401).json({
      success: false,
      message: "Token is invalid",
    });
  }

  // token time check
  if (userDetails.resetPasswordExpires < Date.now()) {
    return res.status(401).json({
      success: false,
      message: "Token is expired, Please regenerate your token",
    });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // update password
  await User.findOneAndUpdate(
    {
      token: token,
    },
    {
      password: hashedPassword,
    },
    { new: true }
  );
  //  Return res
  return res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
};
