import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import passportFacebook from "passport-facebook";
import configs from "../configs/index.js";
import BadRequestError from "../errors/badRequest.js";
import prisma from "./prisma.js";

const GoogleStrategy = passportGoogle.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

export const useGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: configs.googleClientId || "",
        clientSecret: configs.googleClientSecret || "",
        callbackURL: configs.googleClientRedirect,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          if (!profile._json.email) {
            throw BadRequestError("User does not have email");
          }

          let user = await prisma.user.findFirst({
            where: {
              email: profile._json.email,
            },
          });

          if (user) {
            done(null, user);
          } else {
            user = await prisma.user.create({
              data: {
                fullname: profile._json.name,
                email: profile._json.email,
                isVerified: true,
              },
            });

            done(null, user);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

export const useFacebookStrategy = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: configs.facebookClientId,
        clientSecret: configs.facebookClientSecret,
        callbackURL: configs.facebookClientRedirect,
        passReqToCallback: true,
        profileFields: ["id", "displayName", "emails"],
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          if (!profile.emails || profile.emails.length === 0) {
            throw BadRequestError("User does not have email");
          }

          const email = profile.emails[0].value;

          console.log(email)

          let user = await prisma.user.findFirst({
            where: {
              email,
            },
          });

          if (user) {
            done(null, user);
          } else {
            user = await prisma.user.create({
              data: {
                fullname: profile.displayName,
                email,
                isVerified: true,
              },
            });

            done(null, error);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
