import express from "express";
import passport from "passport";
import { authController } from "../controllers/index.js";
import { useFacebookStrategy, useGoogleStrategy } from "../lib/passport.js";
import authValidation from "../validations/auth.validation.js";
import validate from "../middlewares/validate.js";
// import validate from '../middlewares/validate.js'

const router = express.Router();

// router.post('/register', validate(authValidation.register), authController.register);

useGoogleStrategy();
useFacebookStrategy();

// google auth
router.get("/google", authController.getGoogleUrl);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  authController.googleCallback
);

// facebook auth
router.get("/facebook", authController.getFacebookUrl);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: false,
  }),
  authController.facebookCallback
);

// basic auth
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post("/login", validate(authValidation.login), authController.login);
router.post("/verify", validate(authValidation.verify), authController.verify);

export default router;
