import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

export const forgotPassword = async (req, res) => {

  console.log("Forgot password route hit");
  console.log("Request body:", req.body);

  const email = req.body?.email;

  if(!email){
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000;

  await user.save();

  console.log("Password updated for:", user.email);

 const resetLink = `https://brilliant-basbousa-1f9673.netlify.app/reset/${token}`;

  console.log("Reset Link:", resetLink);   // 👈 added for demo

  await sendEmail(
    email,
    "Password Reset",
    `Click here to reset password: ${resetLink}`
  );

  res.json({ message: "Reset link sent to email" });
};


export const verifyToken = async (req, res) => {

  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: "Invalid Token" });

  res.json({ message: "Token valid" });

};



export const resetPassword = async (req, res) => {

  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: "Token expired" });

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  res.json({ message: "Password Updated" });

};