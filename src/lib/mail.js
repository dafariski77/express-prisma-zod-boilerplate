import nodemailer from "nodemailer";
import config from "../configs/index.js";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: config.smtpUsername,
    pass: config.smtpPassword,
  },
});

export default transporter;
