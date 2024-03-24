const mongoose = require("mongoose");
const validator = require("validator");
const otpGenerator = require("otp-generator");
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plase provide name"],
    minlen: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: [true,'Email Already Exist'],
    required: [true, "Plase provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordResetToken: { type: String },
  passwordResetTokenExpirationDate: { type: Date },
  otp: { type: String },
  otpExpires: { type: Date },
},{timestamp:true});

UserSchema.pre('save',async function (){
  if(!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(18);
  this.password = await bcrypt.hash(this.password,salt)
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

UserSchema.methods.createPasswordResetToken = function () {
  // generate random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // encrypt the token
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // sets the time the reset password token expire (10 mins)
  this.passwordResetTokenExpirationDate = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

UserSchema.methods.generateOTP = function () {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
  });
  this.otp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000;

  return otp;
};

module.exports = mongoose.model("User", UserSchema);
