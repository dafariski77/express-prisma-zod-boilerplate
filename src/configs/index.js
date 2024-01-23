import dotenv from "dotenv";
dotenv.config();

export default {
  jwtSecret: process.env.JWT_SECRET,
  jwtExp: process.env.JWT_EXP,
  jwtRefreshExp: process.env.JWT_REFRESH_EXP,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
  facebookClientId: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleClientRedirect: process.env.GOOGLE_CLIENT_REDIRECT,
};
