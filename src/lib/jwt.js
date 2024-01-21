import jwt from "jsonwebtoken";
import config from "../configs/index.js";

export const createToken = ({ payload }) => {
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExp,
  });

  return token;
};

export const createRefreshJWT = ({ payload }) => {
  const token = jwt.sign(payload, config.jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExp,
  });

  return token;
};

export const isTokenValid = ({ token }) => jwt.verify(token, config.jwtSecret);

export const isRefreshTokenValid = ({ token }) =>
  jwt.verify(token, config.jwtRefreshSecret);
