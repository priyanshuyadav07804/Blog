const User = require("../model/User.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require('../utils/sendEmail.js')


const register = async (req, res) => {
  const { email, name, password } = req.body.data;

  // Check we have all input feilds
  if (!email || !password || !username) {
    return res.status(422).json({ message: "Missing input field's value." });
  }

  try {
    // Check if the email is in use
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res.status(409).json({
        message: "Email is already in use.",
      });
    }

    // Step 1 - Create verificationToken and save the user
    const verificationToken = crypto.randomBytes(40).toString("hex");

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
    });

    // Step 2 - Email the user a unique verification link
    const subject = "Tridium Email Confirmation";
    const verifyEmail = `http://localhost:5173/user/verify-email?token=${verificationToken}&email=${email}`;
    const message = `<p>Please confirm your email by clicking on the following link : 
    <a href="${verifyEmail}">Verify Email</a> </p>`;

    await sendEmail({
      name: user.name,
      email: user.email,
      subject,
      message,
    });
    res.status(201).json({
      message: "Success! Please check your email to verify account",
    });
  } catch (err) {
    return res.status(503).json({ message: "Service unavailable" });
  }
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  // Check we have an token or email
  if (!verificationToken || !email) {
    return res.status(401).json({ message: "Missing Token/Email" });
  }

  try {
    // step 1 : Check if email and verificatioToken exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "This email not exists" });
    }
    if (user.verificationToken !== verificationToken) {
      return res.staus(401).json({ message: "This Token is not valid" });
    }

    // Step 2 : Check if user already verified
    if (user.isVerified) {
      return res.status(409).json({ message: "Account Already Varified" });
    }

    // Step 3 - Update user verification status to true
    user.isVerified = true;
    user.verified = Date.now();
    user.verificationToken = "";

    await user.save();
    res.status(200).json({ message: "Email Verified" });
  } catch (err) {
    return res.status(503).json({ message: "Service Unavailable" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body.data;

  // Check we have an email and oassword
  if (!email || !password) {
    return res.status(422).json({
      message: "Missing email/password.",
    });
  }
  try {
    // Step 1 - Verify a user with the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email does not exists",
      });
    }

    // step 2 - Ensure Password is correct or not
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "wrong credentials!" });
      return;
    }

    // Step 3 - Ensure the account has been verified
    if (!user.verified) {
      return res.status(403).json({
        message: "Please verify your email",
      });
    }

    const verificationToken = jwt.sign(
      { id: user._id },
      process.env.USER_VERIFICATION_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "User logged in",
      verificationToken,
    });
  } catch (err) {
    return res.status(503).json({ err, message: "Service unavailable" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body.data;

  // Check we have email
  if (!email) {
    return res.status(422).json({
      message: "Missing email.",
    });
  }

  // find the user, if present in the database
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json({ message: "This Email Not Exist, Enter Correct Email" });
  }

  try {
    // Generate the reset token
    const resetToken = user.createPasswordResetToken();
    // Generate OTP
    const OTP = user.generateOTP();
    // console.log(OTP)
    await user.save();

    const subject = "Tridium Reset Password";
    const resetURL = `http://localhost:5173/user/reset-password?token=${resetToken}&email=${email}`;
    const message = `<p>Please reset password by clicking on the following link : 
  <a href="${resetURL}">Verify Email</a> </p>\n Please enter OTP to reset password :
  <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${OTP}</h1>`;

    await sendEmail({
      name: user.name,
      email: user.email,
      subject,
      message,
    });

    res.status(200).json({
      message: "Please check your email for reset password link",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpirationDate = undefined;
    await user.save();
    res.status(503)({ error, message: "service unavailable" });
  }
};

const resetPassword = async (req, res) => {
  const { token, email, otp, password } = req.body.data;

  if (!token || !email) {
    return res.status(422).json({ message: "Missing Token/Email" });
  }
  if (!otp || !password) {
    return res.status(422).json({ message: "Missing OTP/Password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email does not exists",
      });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // validate user based on the token and otp
    const currentDate = new Date();

    if (
      user.passwordResetToken !== hashedToken ||
      user.passwordResetTokenExpirationDate <= currentDate ||
      user.otp !== otp ||
      otpExpires <= currentDate
    ){
      return res
      .status(410)
      .json({ message: "Token/OTP is invalid or has expired" });
    }

    // Check if Last password is same as Current One
    if (await bcrypt.compare(password,user.password)) {
      return res
        .status(400)
        .json({ message: "This Password is same as last password" });
    }

    //reset password
    user.password = password

    //Remove passwordResetToken
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(205).json({
      message:"Password reset successfully"
    });
  } catch (error) {
    res.status(500).json({error,message:"Service unavilable"});
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByIdAndDelete(id);
    console.log(data);
    res.status(200).json("deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  deleteUser
};

