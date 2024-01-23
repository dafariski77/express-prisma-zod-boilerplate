import passport from "passport";
import { createToken } from "../lib/jwt.js";
import { createTokenUser } from "../utils/createToken.js";
import { useFacebookStrategy, useGoogleStrategy } from "../lib/passport.js";
import configs from "../configs/index.js";

const register = (req, res, next) => {
  try {
    return res.send("hello");
  } catch (error) {
    next(error);
  }
};

const getGoogleUrl = (req, res, next) => {
  try {
    useGoogleStrategy();

    // Access the Google OAuth strategy
    const googleStrategy = passport._strategy("google");

    const authUrl = googleStrategy._oauth2.getAuthorizeUrl({
      response_type: "code",
      scope: "profile email",
      redirect_uri: configs.googleClientRedirect,
    });

    return res.status(200).json({
      success: true,
      message: "Success get url login",
      data: {
        authUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

const googleCallback = (req, res, next) => {
  try {
    console.log(req.user);
    const token = createToken({ payload: createTokenUser(req.user) });

    return res.status(200).json({
      success: true,
      message: "Success login",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getFacebookUrl = (req, res, next) => {
  try {
    useFacebookStrategy();

    const facebookStrategy = passport._strategy("facebook");

    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${
      facebookStrategy._oauth2._clientId
    }&redirect_uri=${encodeURIComponent(
      configs.facebookClientRedirect
    )}&scope=email&response_type=code&auth_type=rerequest`;

    return res.status(200).json({
      success: true,
      message: "Success get Facebook login URL",
      data: {
        authUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

const facebookCallback = (req, res, next) => {
  try {
    console.log(req.user);

    const token = createToken({ payload: createTokenUser(req.user) });

    return res.status(200).json({
      success: true,
      message: "Success login",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  googleCallback,
  getGoogleUrl,
  getFacebookUrl,
  facebookCallback,
};
