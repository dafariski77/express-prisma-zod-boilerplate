import fs from "fs/promises";
import mustache from "mustache";
import transporter from "../lib/mail.js";

export const otpMail = async (email, data) => {
  try {
    let template = await fs.readFile("src/views/email/otp.html", "utf-8");

    let message = {
      from: "admin@gmail.com",
      to: email,
      subject: "Your OTP",
      html: mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (error) {
    console.log(error);
  }
};
