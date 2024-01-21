import UnauthenticatedError from "../errors/unauthenticated.js";
import { isTokenValid } from "../lib/jwt.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role.name)) {
      throw new UnauthenticatedError("Permission denied");
    }

    next();
  };
};

export const authenticateUser = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Authentication invalid!");
    }

    const payload = isTokenValid({ token });

    req.user = {
      id: payload.id,
      fullname: payload.fullname,
      email: payload.email,
      otp: payload.otp,
      isVerified: payload.isVerified,
    };

    next();
  } catch (error) {
    next(error);
  }
};
