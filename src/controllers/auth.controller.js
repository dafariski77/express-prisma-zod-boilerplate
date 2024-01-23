import passport from "passport";
import { createRefreshJWT, createToken } from "../lib/jwt.js";
import { createTokenUser } from "../utils/createToken.js";
import { useFacebookStrategy, useGoogleStrategy } from "../lib/passport.js";
import configs from "../configs/index.js";
import BadRequestError from "../errors/badRequest.js";
import { compare, encrypt } from "../lib/bcrypt.js";
import prisma from "../lib/prisma.js";
import generateOtpNumber from "../utils/random.js";
import { otpMail } from "../utils/sendMail.js";

const register = async (req, res, next) => {
  try {
    const { fullname, email, password, passwordConfirmation } = req.body;

    if (password !== passwordConfirmation) {
      throw new BadRequestError("Password tidak cocok!");
    }

    const hashPassword = await encrypt(password);

    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashPassword,
        otp: generateOtpNumber(),
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        otp: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    await otpMail(email, user);

    return res.json({
      success: true,
      message: "Berhasil mendaftar akun!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestError("Kredensial tidak valid!");
    }

    if (!user.isVerified) {
      throw new BadRequestError("Akun belum diverifikasi!");
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new BadRequestError("Password salah!");
    }

    const token = createToken({ payload: createTokenUser(user) });

    const refreshToken = createRefreshJWT({ payload: createTokenUser(user) });

    await prisma.refreshToken.create({
      data: {
        refreshToken,
        userId: user.id,
      },
    });

    return res
      .json({
        success: true,
        message: "Berhasil masuk!",
        data: {
          access_token: token,
          refresh_token: refreshToken,
          user: {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
          },
        },
      })
      .status(200);
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { otp, email } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestError("User tidak ditemukan!");
    }

    if (user.isVerified === true) {
      throw new BadRequestError("Akun sudah diverifikasi");
    }

    if (otp !== user.otp) {
      throw new BadRequestError("OTP tidak valid!");
    }

    const verifiedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        otp: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res
      .json({
        success: true,
        message: "Verifikasi berhasil!",
        data: verifiedUser,
      })
      .status(200);
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
  login,
  verify,
  googleCallback,
  getGoogleUrl,
  getFacebookUrl,
  facebookCallback,
};
