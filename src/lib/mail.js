import nodemailer from "nodemailer";
import configs from "../configs/index.js";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: configs.smtpUsername,
    pass: configs.smtpPassword,
  },
});

export default transporter;
